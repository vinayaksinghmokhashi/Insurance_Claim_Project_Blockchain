docker rm $(docker ps -aq) --force
docker container prune
docker system prune
docker volume prune --filter all=1
docker network prune
