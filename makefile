up:
	sudo docker-compose up -d
down:
	sudo docker-compose down
rebuild:
	sudo docker-compose down
	sudo docker-compose up -d --build
restart:
	sudo docker-compose down
	sudo docker-compose up -d
studio:
	sudo pnpm dlx prisma studio
seed:
	sudo pnpm prisma db seed
dev:
	sudo pnpm dev