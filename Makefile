.DEFAULT_GOAL := image

image:
	docker build -t 572232595707.dkr.ecr.eu-west-1.amazonaws.com/validator-dapp:latest .
	docker push 572232595707.dkr.ecr.eu-west-1.amazonaws.com/validator-dapp:latest

login:
	aws ecr get-login --no-include-email --region eu-west-1
