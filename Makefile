ACCOUNT := clearmatics
SERVICE := validator-dapp
IMAGE := $(ACCOUNT)/$(SERVICE)

default: all

all: login build push logout

login:
	$(info Make: Login to Docker Hub)
	@echo $(DOCKER_PASS) | docker login -u $(DOCKER_USER) --password-stdin

build:
	$(info Make: Building latest tagged image)
	@docker build -t $(IMAGE):latest -f Dockerfile .

run:
	$(info Make: Building latest tagged image)
	@docker run -d -p 3000:3000 --name $(SERVICE) $(IMAGE):latest

push:
	$(info Make: Pushing latest tagged image)
	@docker push $(IMAGE):latest

logout:
	$(info Make: Clear Docker Hub credentials)
	@docker logout
