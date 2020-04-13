# Test Node API for K6

Testing API Demo for K6 built with Node.js

# Prerequisites

- Docker
- Kubernetes e.g. use [microk8s](https://microk8s.io/) if you are on a Linux distro. Requires no VM

# Setup

## 1. Build Docker File

```bash
git clone git@github.com:brandiqa/test-node-api-k6.git
cd test-node-api-k6/api
docker build -t <username>/crocodile-api
```

## 2. Configure Kubernetes & Prometheus - microk8s

Use this [instructions](https://ubuntu.com/tutorials/install-a-local-kubernetes-with-microk8s#1-overview) to setup microk8s if you haven't.

```bash
sudo snap alias microk8s.kubectl kubectl
microk8s.enable prometheus
```

## 3. Deploy your app

Read how to [deploy local image](https://microk8s.io/docs/registry-images)

```bash
docker images
docker save brandiqa/crocodile-api > crocodile-api.tar
microk8s ctr image import crocodile-api.tar

# Wait for the import to complete
microk8s ctr images ls
```

[TODO add service definition to yaml]
Next, deploy the app:

```bash
microk8s kubectl apply -f brandiqa/crocodile-deployment.yaml
kubectl expose deployment crocodile-deployment --name=croc-service --type=NodePort --port=3000
```

Give a couple of minutes for the deployment process to complete. You can check on the status by running:

```bash
kubectl get pods
kubectl get service
```

Take note of the IP address listed for `croc-service`. Once the service is ready, you can open the browser at `<ip address>:3000` to confirm the app is working as expected.
