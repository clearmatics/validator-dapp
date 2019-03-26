## Validator Dapp on the live Autonity network

## Run
To run the Validator frontend

### With Docker
Ensure Docker is installed

Pull from (DockerHub)(https://hub.docker.com/r/clearmatics/validator-dapp) :
```
docker pull clearmatics/validator-dapp
```

run:
```
make run
```

The frontend will load on: http://localhost:3000

### Locally npm
Ensure npm is installed

- npm:
```
npm install
npm start
```

The frontend will load on http://localhost:3000/

Connect to Matamask and create a new `Custom RPC` with http://HOST:PORT of the network to connect to as the `New RPC URL`.
