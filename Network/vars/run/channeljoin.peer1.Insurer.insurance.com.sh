#!/bin/bash
# Script to join a peer to a channel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=10.64.39.89:7004
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/Insurer.insurance.com/peers/peer1.Insurer.insurance.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=Insurer-insurance-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/Insurer.insurance.com/users/Admin@Insurer.insurance.com/msp
export ORDERER_ADDRESS=10.64.39.89:7014
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/insurance.com/orderers/orderer3.insurance.com/tls/ca.crt
if [ ! -f "insurancechannel.genesis.block" ]; then
  peer channel fetch oldest -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA \
  --tls -c insurancechannel /vars/insurancechannel.genesis.block
fi

peer channel join -b /vars/insurancechannel.genesis.block \
  -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA --tls
