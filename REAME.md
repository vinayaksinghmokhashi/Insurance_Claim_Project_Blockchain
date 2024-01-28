# Insurance_Blockchain
This is application for Insurance claim using permission based  blockchain Hyperledger Fabric

## Steps to setup network from scratch
1. open Terminal and `cd Network` 

2. Run : `./minifab netup -s couchdb -e true -o Insurer.insurance.com`

3. Check containers are up and running by : `docker ps`

4. Create channel : `./minifab create -c insurancechannel`

5. Join channel : `./minifab join -c insurancechannel`

6. To peer communication : `./minifab anchorupdate`

7. To create wallet profiles : `./minifab profilegen -c insurancechannel`

8. Open IBM Blockchain extension

9. Add wallets, Gateways, Fabric Environment

10. Create and deploy chaincode


### To take down network 
`./minifab down`


### To cleanup the network
`./minifab cleanup`

#### To remove the containers
`docker rm $(docker container ls -q) --force` <br/>

`docker container prune`  <br/>

`docker system prune`<br/>

`docker volume prune --filter all=1` <br/>

`docker network prune` <br/>

