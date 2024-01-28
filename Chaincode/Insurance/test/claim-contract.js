/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ClaimContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('ClaimContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ClaimContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"claim 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"claim 1002 value"}'));
    });

    describe('#claimExists', () => {

        it('should return true for a claim', async () => {
            await contract.claimExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a claim that does not exist', async () => {
            await contract.claimExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createClaim', () => {

        it('should create a claim', async () => {
            await contract.createClaim(ctx, '1003', 'claim 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"claim 1003 value"}'));
        });

        it('should throw an error for a claim that already exists', async () => {
            await contract.createClaim(ctx, '1001', 'myvalue').should.be.rejectedWith(/The claim 1001 already exists/);
        });

    });

    describe('#readClaim', () => {

        it('should return a claim', async () => {
            await contract.readClaim(ctx, '1001').should.eventually.deep.equal({ value: 'claim 1001 value' });
        });

        it('should throw an error for a claim that does not exist', async () => {
            await contract.readClaim(ctx, '1003').should.be.rejectedWith(/The claim 1003 does not exist/);
        });

    });

    describe('#updateClaim', () => {

        it('should update a claim', async () => {
            await contract.updateClaim(ctx, '1001', 'claim 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"claim 1001 new value"}'));
        });

        it('should throw an error for a claim that does not exist', async () => {
            await contract.updateClaim(ctx, '1003', 'claim 1003 new value').should.be.rejectedWith(/The claim 1003 does not exist/);
        });

    });

    describe('#deleteClaim', () => {

        it('should delete a claim', async () => {
            await contract.deleteClaim(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a claim that does not exist', async () => {
            await contract.deleteClaim(ctx, '1003').should.be.rejectedWith(/The claim 1003 does not exist/);
        });

    });

});
