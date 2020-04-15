# Test Node API for K6

Testing API Demo for K6 built with Node.js

# Prerequisites

- Node.js
- Docker
- Kubernetes
- GNU Make

# Setup

## 1. Install & Configure Kubernetes

There are several implementations of Kubernetes that you can install on your local machine(laptop). My recommendation is to use [microk8s](https://microk8s.io/) since it's the easiest to setup and requires no virtual machine if you are using a Linux distro. Below are links for installation:

- [Windows](https://ubuntu.com/tutorials/install-microk8s-on-windows#1-overview)
- [macOs](https://ubuntu.com/tutorials/install-microk8s-on-mac-os#1-overview)
- [Linux](https://ubuntu.com/tutorials/install-a-local-kubernetes-with-microk8s#1-overview)

After installation, you'll need to execute the following commands:

```bash
# This applies only to Linux(check how the same can be done on Windows and Mac)
sudo snap alias microk8s.kubectl kubectl

# Enable prometheus
microk8s.enable prometheus
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
