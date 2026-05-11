#!/usr/bin/env bash
# Simple AWS ECR build & push script (placeholder)
# Usage: ./scripts/aws-deploy.sh <aws-account-id> <region> <repo-name> <tag>
set -e
if [ "$#" -lt 4 ]; then
  echo "Usage: $0 <aws-account-id> <region> <repo-name> <tag>"
  exit 1
fi
AWS_ACCOUNT=$1
AWS_REGION=$2
REPO_NAME=$3
TAG=$4

IMAGE_NAME=${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${TAG}

echo "Building image ${IMAGE_NAME}..."
docker build -t ${REPO_NAME}:${TAG} .

echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com

# create repo if not exists
aws ecr describe-repositories --repository-names "${REPO_NAME}" --region ${AWS_REGION} >/dev/null 2>&1 || aws ecr create-repository --repository-name "${REPO_NAME}" --region ${AWS_REGION}

docker tag ${REPO_NAME}:${TAG} ${IMAGE_NAME}
docker push ${IMAGE_NAME}

echo "Image pushed: ${IMAGE_NAME}"

echo "You can now update your ECS task definition or deploy the image to your target runtime."
