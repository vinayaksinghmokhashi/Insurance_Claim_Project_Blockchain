#!/bin/bash
# Script to join a peer to a channel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=10.64.39.89:7005
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/PolicyHolder.insurance.com/peers/peer1.PolicyHolder.insurance.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=PolicyHolder-insurance-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/PolicyHolder.insurance.com/users/Admin@PolicyHolder.insurance.com/msp
export ORDERER_ADDRESS=10.64.39.89:7013
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/insurance.com/orderers/orderer2.insurance.com/tls/ca.crt
if [ ! -f "insurancechannel.genesis.block" ]; then
  peer channel fetch oldest -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA \
  --tls -c insurancechannel /vars/insurancechannel.genesis.block
fi

peer channel join -b /vars/insurancechannel.genesis.block \
  -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA --tls
