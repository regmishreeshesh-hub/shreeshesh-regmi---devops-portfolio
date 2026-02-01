#!/bin/bash

set -e

# Configuration
CLUSTER_NAME="staging-cluster"
NAMESPACE="devops-portfolio"
IMAGE_NAME="shreeshesh-regmi-devops-portfolio"
IMAGE_TAG="latest"
REGISTRY="localhost:5000"

echo "🚀 Deploying DevOps Portfolio to Kind cluster: $CLUSTER_NAME"

# Check if Kind cluster exists
if ! kind get clusters | grep -q "$CLUSTER_NAME"; then
    echo "❌ Kind cluster '$CLUSTER_NAME' not found"
    echo "💡 Please create the cluster first: kind create cluster --name $CLUSTER_NAME"
    exit 1
fi

# Set kubecontext to Kind cluster
echo "📋 Switching to Kind cluster context..."
kubectl config use-context "kind-$CLUSTER_NAME"

# Create namespace if it doesn't exist
echo "📦 Creating namespace: $NAMESPACE"
kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

# Build Docker image for Kind
echo "🔨 Building Docker image..."
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

# Load image into Kind cluster
echo "📦 Loading image into Kind cluster..."
kind load docker-image "$IMAGE_NAME:$IMAGE_TAG" --name "$CLUSTER_NAME"

# Find available NodePort
echo "🔍 Checking for available NodePort..."
DEFAULT_NODEPORT=30001
AVAILABLE_NODEPORT=$(./check-port.sh --find $DEFAULT_NODEPORT)

if [ $? -ne 0 ]; then
    echo "❌ Could not find an available NodePort"
    exit 1
fi

echo "📍 Using NodePort: $AVAILABLE_NODEPORT"

# Create temporary service file with available port
sed "s/nodePort: 30001/nodePort: $AVAILABLE_NODEPORT/" k8s/04-service.yaml > /tmp/service-temp.yaml

# Apply Kubernetes manifests
echo "🚀 Applying Kubernetes manifests..."
kubectl apply -f k8s/ -n "$NAMESPACE"
kubectl apply -f /tmp/service-temp.yaml -n "$NAMESPACE"

# Clean up temporary file
rm -f /tmp/service-temp.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/nginx-devops -n "$NAMESPACE" --timeout=300s

# Get deployment status
echo "📊 Deployment status:"
kubectl get pods -n "$NAMESPACE"

# Get service information
echo "🌐 Service information:"
kubectl get service -n "$NAMESPACE"

# Get access URL
NODE_PORT=$(kubectl get service nginx-devops -n "$NAMESPACE" -o jsonpath='{.spec.ports[0].nodePort}')
echo "🎉 Application deployed successfully!"
echo "🔗 Access your portfolio at: http://localhost:$NODE_PORT"

echo "✅ Deployment complete!"
