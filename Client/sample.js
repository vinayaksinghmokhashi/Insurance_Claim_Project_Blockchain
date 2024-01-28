const express = require('express');
const bodyParser = require('body-parser');
const { ClientApplication } = require('./client');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const clientApp = new ClientApplication();

//Claim Exists
app.get('/claimExists/:claimId', async (req, res) => {
    try {
        const claimId = req.params.claimId;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'queryTxn',
            null,
            'claimExists',
            claimId
        );

        if (result && result.toString) {
            res.json({ success: true, data: JSON.parse(result.toString()) });
        } else {
            res.status(500).json({ success: false, message: 'Claim does not exist!' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ success: false, message: error.message });
    }
});


//Create Claim

app.post('/createClaim', async (req, res) => {
    try {
        const { claimId, value } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'createClaim',
            claimId,
            value
        );
        if(result && result.toString){
            res.json({ success: true, message: 'Claim Created', result:result.toString() });
        }
        
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//Read Claim
app.get('/readClaim/:claimId', async (req, res) => {
    try {
        const claimId = req.params.claimId;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'queryTxn',
            null,
            'readClaim',
            claimId
        );

        if (result && result.toString) {
            res.json({ success: true, data: JSON.parse(result.toString()) });
        } else {
            res.status(500).json({ success: false, message: 'No valid response from the transaction.' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ success: false, message: error.message });
    }
});

//Approve Claim
app.post('/approveClaim', async (req, res) => {
    try {
        const { claimId } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'approveClaim',
            claimId
        );
        if(result && result.toString){
            res.json({ success: true, message: 'Claim Approved', result:result.toString() });
        }
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Request Verification
app.post('/requestVerification', async (req, res) => {
    try {
        const { claimId } = req.body;
        console.log(claimId);
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'requestVerification',
            claimId
        );
        console.log(result);
        res.json({ success: true, message: 'Request sent for verification!', result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Verify Claim
app.post('/verifyClaim', async (req, res) => {
    try {
        const { claimId } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'verifyClaim',
            claimId
        );

        // Check if result is defined before converting to string
        //const resultString = result !== undefined ? result.toString() : null;
        const resultString = result !== undefined ? result.toString() : null;
         
        res.json({ success: true, message: 'Claim Verified!', result: resultString });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


//Update Claim Status
app.post('/updateClaimStatus', async (req, res) => {
    try {
        const { claimId, newStatus } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'updateClaimStatus',
            claimId,
            newStatus
        );
        res.json({ success: true, message: 'Status Successfully Updated!', result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


app.post('/deleteClaim/:claimId', async (req, res) => {
    try {
        const claimId = req.params.claimId;
        console.log("hello");
        console.log(req.params.claimId);
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'queryTxn',
            null,
            'deleteClaim',
            claimId
        );

        console.log("Raw result:", result);

        // Check if result is a Buffer
        if (Buffer.isBuffer(result)) {
            // Handle binary data directly if needed
            res.json({ success: true, data: 'Binary data received' });
        } else if (typeof result === 'string' && result.trim() !== '') {
            // If it's a string, proceed with parsing
            try {
                const parsedResult = JSON.parse(result);
                console.log("Parsed result:", parsedResult);
                res.json({ success: true, data: parsedResult });
            } catch (parseError) {
                console.error("Error parsing result:", parseError);
                res.status(500).json({ success: false, message: 'Error parsing result.' });
            }
        } else {
            console.error("Invalid result format:", result);
            res.status(500).json({ success: false, message: 'Claim deletion not successful!' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ success: false, message: error.message });
    }
});

//Query All Claims
app.get('/queryAllClaims', async (req, res) => {
    try {
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'queryTxn',
            null,
            'queryAllClaims'
        );

        if (result && result.toString) {
            res.json({ success: true, data: JSON.parse(result.toString()) });
        } else {
            res.status(500).json({ success: false, message: 'There are no claims yet!' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({ success: false, message: error.message});
    }
});



// Reject Verification
app.post('/rejectVerification', async (req, res) => {
    try {
        const { claimId } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'rejectVerification',
            claimId
        );
        if(result && result.toString){
            res.json({ success: true, message: 'Verfication Rejected!', result:result.toString() });
        }
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
});

// Reject Claim
app.post('/rejectClaim', async (req, res) => {
    try {
        const { claimId } = req.body;
        const result = await clientApp.generateAndSubmitTxn(
            'GovtAgency',
            'Admin',
            'insurancechannel',
            'Insurance',
            'ClaimContract',
            'invokeTxn',
            null,
            'rejectClaim',
            claimId
        );
        if(result && result.toString){
            res.json({ success: true, message: 'Claim Rejected!', result:result.toString() });
        }
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
});


app.listen(port, () => console.log(`Listening on port ${port}..`));
