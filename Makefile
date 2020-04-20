all: purge image upload apply

purge:
	kubectl delete service crocodile-service
	kubectl delete deployment crocodile-deployment
	microk8s ctr image rm docker.io/brandiqa/crocodile-api:latest
clean:
	kubectl delete service crocodile-service
	# kubectl delete -n monitoring service crocodile-service
	kubectl delete deployment crocodile-deployment
image:
	rm -rf build
	mkdir build
	docker build -t brandiqa/crocodile-api .
	docker save brandiqa/crocodile-api > build/crocodile-api.tar
upload:
	microk8s ctr image import build/crocodile-api.tar
apply:
	kubectl apply -f deploy/crocodile-deployment.yaml
	kubectl get services | grep crocodile
