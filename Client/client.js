const {profile} =require('./profile')
const {Wallets,Gateway} =require('fabric-network')
const path=require('path')
const fs=require('fs')




class ClientApplication {
    async generateAndSubmitTxn(role, identityLabel, channelName, chaincodeName, contractName, txnType, transientData, txnName, ...args) {
        let gateway = new Gateway();
        try {
            this.Profile = profile[role];
            const ccpPath = path.resolve(this.Profile["CP"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(this.Profile["Wallet"]);

            console.log("Connecting to the gateway...");
            await gateway.connect(ccp, { wallet, identity: identityLabel, discovery: { enabled: true, asLocalhost: true } });
            console.log("Connected to the gateway.");

            let channel = await gateway.getNetwork(channelName);
            console.log(`Got network for channel: ${channelName}`);

            let contract = await channel.getContract(chaincodeName, contractName);
            console.log(`Got contract: ${contractName}`);

            console.log("Transaction details:", {
                role,
                identityLabel,
                channelName,
                chaincodeName,
                contractName,
                txnType,
                transientData,
                txnName,
                args
            });

            let result;
            if (txnType == "invokeTxn") {
                result = await contract.submitTransaction(txnName, ...args);
            } else if (txnType == "queryTxn") {
                result = await contract.evaluateTransaction(txnName, ...args);
            } else {
                result = await contract.createTransaction(txnName).setTransient(transientData).submit(...args);
            }

            console.log("Transaction submitted successfully.");
            return result;
        } catch (error) {
            console.error("Error occurred:", error);
            throw error;
        } finally {
            console.log("Disconnecting from the gateway...");
            gateway.disconnect();
            console.log("Disconnected from the gateway.");
        }
    }
}

module.exports={ClientApplication}
