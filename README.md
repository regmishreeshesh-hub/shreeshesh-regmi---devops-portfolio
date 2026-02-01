<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DevOps Portfolio

A modern React portfolio application showcasing DevOps skills and projects.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## Kubernetes Deployment

**Prerequisites:** 
- Docker
- Kind (Kubernetes in Docker)
- kubectl

### Quick Deploy

Deploy to your Kind cluster with automatic port allocation:

```bash
./deploy-k8s.sh
```

The script will:
- Build the Docker image
- Load it into the Kind cluster
- Find an available NodePort (starting from 30001)
- Deploy the application
- Provide the access URL

### Manual Deployment

1. Create Kind cluster (if not exists):
   ```bash
   kind create cluster --name staging-cluster
   ```

2. Build and load Docker image:
   ```bash
   docker build -t shreeshesh-regmi-devops-portfolio:latest .
   kind load docker-image shreeshesh-regmi-devops-portfolio:latest --name staging-cluster
   ```

3. Deploy to Kubernetes:
   ```bash
   kubectl apply -f k8s/ -n devops-portfolio
   ```

4. Get access URL:
   ```bash
   kubectl get service nginx-devops -n devops-portfolio
   ```

### Port Management

The deployment includes automatic port allocation to avoid conflicts:
- Starts checking from port 30001
- Automatically finds the next available port if needed
- Displays the correct access URL after deployment

## Architecture

- **Frontend:** React + TypeScript + Vite
- **Container:** Multi-stage Docker build (Node.js build + nginx serve)
- **Orchestration:** Kubernetes with Kind
- **Service:** NodePort for external access
