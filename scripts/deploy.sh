echo "Deploying to the swarm"

sudo docker image prune -a
cat docker-compose.yml | sudo docker stack deploy --prune -c - stack
