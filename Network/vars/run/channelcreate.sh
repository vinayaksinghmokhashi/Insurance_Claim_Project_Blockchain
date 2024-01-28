#!/bin/bash
# Script to create channel block 0 and then create channel
cp $FABRIC_CFG_PATH/core.yaml /vars/core.yaml
cd /vars
export FABRIC_CFG_PATH=/vars
configtxgen -profile OrgChannel \
  -outputCreateChannelTx insurancechannel.tx -channelID insurancechannel

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=10.64.39.89:7004
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/Insurer.insurance.com/peers/peer1.Insurer.insurance.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=Insurer-insurance-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/Insurer.insurance.com/users/Admin@Insurer.insurance.com/msp
export ORDERER_ADDRESS=10.64.39.89:7013
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/insurance.com/orderers/orderer2.insurance.com/tls/ca.crt
peer channel create -c insurancechannel -f insurancechannel.tx -o $ORDERER_ADDRESS \
  --cafile $ORDERER_TLS_CA --tls
