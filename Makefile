all: clean image upload apply

clean:
	kubectl delete service crocodile-service
	kubectl delete deployment crocodile-deployment
	microk8s ctr image rm docker.io/brandiqa/crocodile-api:latest
image:
	rm -rf build
	mkdir build
	docker build -t brandiqa/crocodile-api .
	docker save brandiqa/crocodile-api > build/crocodile-api.tar
upload:
	microk8s ctr image import build/crocodile-api.tar
apply:
	kubectl apply -f deploy/crocodile-deployment.yaml
	# kubectl expose deployment crocodile-deployment --name=crocodile-service --type=NodePort --port=3000
	kubectl get services | grep crocodile
