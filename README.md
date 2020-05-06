# Test Node API for K6

Testing API Demo for K6 built with Node.js

## Prerequisites

Please install the following software in your machine:

- Node.js
- Docker
- GNU Make
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

Here's a handy tutorial for [Ubuntu 18:04](https://computingforgeeks.com/how-to-install-minikube-on-ubuntu-18-04/) users. The instructions written for this project are meant for `minikube`. However, they can be modified to adapt to a different type of Kubernetes implementation.

## ENVIRONMENT SETUP

### 1. Configure Minikube

Once your minikube is up and running, enable the following addons:

```bash
$ minikube addons enable dashboard
$ minikube addons enable ingress
$ minikube addons enable ingress-dns
```

To access dashboard, type the following command from a terminal: `minikube dashboard`

### 2. Deploy Prometheus and Kube State Metrics Server

[Kube State metrics](https://github.com/kubernetes/kube-state-metrics) is a service which talks to Kubernetes API server to get all the details about all the API objects like deployments, pods, daemonsets etc. Basically it provides kubernetes API object metrics which you cannot get directly from native Kubernetes monitoring components.

Follow the instructions on this [tutorial](https://devopscube.com/setup-kube-state-metrics/) to deploy Kube State Metrics.

[Prometheus](https://prometheus.io/) is an open source monitoring framework that scrapes(collects) metrics data from various sources. It features a powerful query language that is used to extract information from the data it's collected which is stored in a time-series format.

Follow the instructions on this [tutorial](https://devopscube.com/setup-prometheus-monitoring-on-kubernetes/) to deploy Kube State Metrics.

### 3. Install InfluxDb and Grafana Locally

[InfluxDb]() is a database that stores time-series data. We'll use k6 to output metrics data to this database. Install 1.8 version.

[todo explain Grafana and install instructions]

Copy the following JSON code[todo] to setup the *Crocodile API Metrics Dashboard*.

### 4. Deploy Keda

[todo- explain what Keda is]

Deploy Keda using these [instructions](https://keda.sh/docs/deploy/#yaml)

## PROJECT SETUP

Execute the following commands to download and run the project in your workspace:

```bash
git clone git@github.com:brandiqa/test-node-api-k6.git
cd test-node-api-k6
npm i
npm run dev
```

Point your browser URL to `localhost:4000`. Any changes you make to your source code will restart the server. You can also test the API from your command line like this:

```bash
curl http://localhost:4000/crocodile
```

Next, deploy the application to Minikube, your Kubernetes node. Lucky for you, I've simplified the process. Just execute this one command:

```bash
make image # build and upload docker image to minikube environment
make apply # deploy crocodile-api and expose service
```

If you don't have GNU make on you platform, simply execute the following commands in a new terminal:

```bash
# build and upload docker image to minikube environment
eval $(minikube docker-env)
docker image prune -f
docker build -t brandiqa/crocodile-api .

# deploy crocodile-api and expose service
kubectl apply -f deploy/crocodile-deployment.yml
```

Execute the command to command `kubectl get pods` to confirm the pod is running.

[todo screenshot]

Execute the command to command `kubectl get services` to confirm the pod is running.

## TESTING

1. Run tests without Keda Scaling
2. Run tests with Keda Scaling

[todo write assumptions and conclusion]
