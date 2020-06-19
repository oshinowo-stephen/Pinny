echo "Deploying to the swarm"

sudo docker image prune -a
sudo docker stack deploy --prune -c "docker-compose.yml" pinny
