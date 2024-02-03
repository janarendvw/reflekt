up:
	docker-compose up -d
down:
	docker-compose down
build:
	docker-compose build
restart:
	docker-compose down
	docker-compose up -d
studio:
	pnpm dlx prisma studio
seed:
	pnpm prisma db seed
dev:
	pnpm dev