# Test Node API for K6

Testing API Demo for K6 built with Node.js

# Prerequisites

- Node.js
- Docker
- Kubernetes: use `Minikube`
- GNU Make

The instructions written for this project are meant for `minikube`. However, they can be modified to adapt to a different type of Kubernetes implementation.

# Setup

## 1. Install Kubernetes - Minikube

You'll need to install the following:

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/), [Binary Releases](https://github.com/kubernetes/minikube/releases)

Here's a handy tutorial for [Ubuntu 18:04](https://computingforgeeks.com/how-to-install-minikube-on-ubuntu-18-04/) users.

Once everything is installed and running, proceed to the next step:

## 2. Enable Addons

Enable the following addons:

```bash
$ minikube addons enable dashboard
$ minikube addons enable metrics-server
```

To access dashboard, type the following command from a terminal: `minikube dashboard`

### 3. Install InfluxDb

Install [InfluxDB](https://v2.docs.influxdata.com/v2.0/get-started/). You can install it in your Kubernetes node:

```bash
kubectl apply -f https://raw.githubusercontent.com/influxdata/docs-v2/master/static/downloads/influxdb-k8-minikube.yaml
# Ensure pod is running
kubectl get pods -n influxdb
# Ensure Service is running
kubectl port-forward -n influxdb service/influxdb 9999:9999
# Access dashboard from localhost
kubectl port-forward -n influxdb service/influxdb 9999:9999
```

https://portal.influxdata.com/downloads/

Open `http://localhost:9999/` in your browser.

### 4. Install Helm

Install [Helm](https://helm.sh/). Here are instructions for Ubuntu users:

```bash
# Install
sudo snap install helm --classic
# Add repo
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
# List all stable packages
helm search repo stable
```

### 5. Install Prometheus

[todo]

### 6. Install Grafana

```bash
# Enable Grafana to start on boot
sudo systemctl daemon-reload
sudo systemctl enable grafana-server
### You can start grafana-server by executing
sudo /bin/systemctl start grafana-server
```

## 2. Download Project

Execute the following commands to download the project to your workspace:

```bash
git clone git@github.com:brandiqa/test-node-api-k6.git
cd test-node-api-k6/api
```

## 3. Run Project (Dev)

Execute the following commands to install package dependencies and run the project using Node.js:

```bash
npm i
npm run dev
```

Point your browser URL to `localhost:3000`. Any changes you make to your source code will restart the server.

## 4. Deploy Project to Local Kubernetes

I have written a GNU makefile that will automate the process of building and deploying this project to your Kubernetes cluster. Execute the following command:

```bash
make
```

The deployment process should take about a minute or so. If successful, the last output you should see is:

```bash
crocodile-service   NodePort    10.152.183.211   <none>        3000:31850/TCP   0s
```

The IP address will be different each time you deploy. In the above case, point your browser URL to: `10.152.183.211:3000`.
