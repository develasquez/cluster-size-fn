#!/bin/bash
export PROJECT_ID=$1;

gsutil mb gs://$PROJECT_ID-deploy-fn

gcloud beta functions deploy cluster-size-fn --entry-point=clusterSizeFn --runtime nodejs16 --memory=512MB --stage-bucket=$PROJECT_ID-deploy-fn --trigger-topic resize-cluster --env-vars-file .env.yaml