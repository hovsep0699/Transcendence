

all: up

build:
	docker compose build

up:
	@docker compose up -d

down:
	docker compose down

start:
	socker compose start

stop:
	docker compose stop

logs:
	docker compose logs
	
prune: down
	rm -rf backend/node_modules
	rm -rf backend/dist
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	# cd frontend && npm install && cd ..
	rm -rf database/data
	docker system prune -f -a

fclean: down
	docker system prune -f -a

re: prune all 

.PHONY: all build up down start stop logs prune re fclean   
