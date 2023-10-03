PHONY: dc install run_dev run_prod test

dc:
	docker-compose up --build --remove-orphans

install:
	cd frontend && npm install

run_dev:
	cd frontend && npm run webpack-config-dev

run_prod:
	cd frontend && npm run webpack-config-prod

test:
	cd frontend && npm run test