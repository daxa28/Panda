PHONY: dc-dev dc-prod front_install front_run_dev front_run_prod back_install back_run_dev back_run_prod

dc-dev:
	docker-compose --file docker-compose-dev.yml up --build --remove-orphans

dc-prod:
	docker-compose --file docker-compose-prod.yml up --build --remove-orphans



front_run_dev:
	cd frontend && npm install && npm run webpack-config-dev

front_run_prod:
	cd frontend && npm install && npm run start-prod



back_run_dev:
	cd backend && npm install && npm run start:dev

back_run_prod:
	cd backend && npm install && npm run start:prod