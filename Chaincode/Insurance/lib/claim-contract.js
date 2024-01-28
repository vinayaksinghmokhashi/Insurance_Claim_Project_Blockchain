/*
 * SPDX-License-Identifier: Apache-2.0
 */

// 'use strict';



/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ClaimContract extends Contract {

    async claimExists(ctx, claimId) {
        const buffer = await ctx.stub.getState(claimId);
        return (!!buffer && buffer.length > 0);
    }

    async checkClaimExistence(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (exists) {
            throw new Error(`The claim ${claimId} already exists`);
        }
    }

    async queryAllClaims(ctx) {
        const startKey = '';
        const endKey = '';
    
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
    
        const allClaims = [];
    
        // Iterate over the result set
        while (true) {
            const result = await iterator.next();
    
            if (result.value) {
                const key = result.value.key;
                const claim = {
                    claimId: key,
                    ...JSON.parse(result.value.value.toString('utf8'))
                };
                allClaims.push(claim);
            }
    
            if (result.done) {
                await iterator.close();
                return allClaims;
            }
        }
    }
    
    
    

    async rejectVerification(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
    
        const asset = await this.readClaim(ctx, claimId);
    
        if (asset.status !== 'VerificationRequested') {
            throw new Error(`Claim ${claimId} is not in verification requested status`);
        }
    
        asset.status = 'VerificationFailed'; // Change the status to 'VerificationFailed'
        await this.updateClaimStatus(ctx, claimId, asset.status);
    }


    async rejectClaim(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
    
        const asset = await this.readClaim(ctx, claimId);
    
        if (asset.status !== 'VerificationFailed') {
            throw new Error(`Claim ${claimId} is not in verification failed status`);
        }
    
        // Your additional logic for handling rejected claims goes here
    
        // Optionally, you can update the claim status to 'Rejected' or any other status
        asset.status = 'Rejected';
        await this.updateClaimStatus(ctx, claimId, asset.status);
    }
    

    async createClaim(ctx, claimId, value) {
        await this.checkClaimExistence(ctx, claimId);
        const asset = { value, status: 'Pending' }; // Assuming 'Pending' status initially
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(claimId, buffer);
    }

    async approveClaim(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }

        const asset = await this.readClaim(ctx, claimId);

        if (asset.status !== 'Verified') {
            throw new Error(`Claim ${claimId} is not in verified status`);
        }

        asset.status = 'Approved';
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(claimId, buffer);
    }


    async requestVerification(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
        const asset = await this.readClaim(ctx, claimId);
        // if (asset.status !== 'Pending') {
        //     throw new Error(`Claim ${claimId} is not in pending status`);
        // }
        asset.status = 'VerificationRequested';
        await this.updateClaimStatus(ctx, claimId, asset.status);
    }


    async verifyClaim(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
        const asset = await this.readClaim(ctx, claimId);
        if (asset.status !== 'VerificationRequested') {
            throw new Error(`Claim ${claimId} is not in verification requested status`);
        }
        // Perform verification logic, e.g., contacting the Enterprise for verification
        // Assuming verification is successful for simplicity
        asset.status = 'Verified';
        await this.updateClaimStatus(ctx, claimId, asset.status);
    }


    async readClaim(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
        const buffer = await ctx.stub.getState(claimId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateClaimStatus(ctx, claimId, newStatus) {
        const asset = await this.readClaim(ctx, claimId);
        asset.status = newStatus;
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(claimId, buffer);
    }

    async updateClaim(ctx, claimId, newValue) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
        const asset = { value: newValue, status: 'Pending' }; // Assuming 'Pending' status initially
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(claimId, buffer);
    }

    async deleteClaim(ctx, claimId) {
        const exists = await this.claimExists(ctx, claimId);
        if (!exists) {
            throw new Error(`The claim ${claimId} does not exist`);
        }
        await ctx.stub.deleteState(claimId);
    }
}

module.exports = ClaimContract;


