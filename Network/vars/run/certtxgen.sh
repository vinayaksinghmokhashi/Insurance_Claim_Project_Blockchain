#!/bin/bash
cd $FABRIC_CFG_PATH
# cryptogen generate --config crypto-config.yaml --output keyfiles
configtxgen -profile OrdererGenesis -outputBlock genesis.block -channelID systemchannel

configtxgen -printOrg Enterprise-insurance-com > JoinRequest_Enterprise-insurance-com.json
configtxgen -printOrg GovtAgency-insurance-com > JoinRequest_GovtAgency-insurance-com.json
configtxgen -printOrg Insurer-insurance-com > JoinRequest_Insurer-insurance-com.json
configtxgen -printOrg PolicyHolder-insurance-com > JoinRequest_PolicyHolder-insurance-com.json
