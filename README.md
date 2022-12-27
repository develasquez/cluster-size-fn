# This is not an official Google project.

This script is for **educational purposes only**, is **not certified** and is **not recommended** for production environments.

## Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 
# Resize GKE Kubernetes Cluster
* This function allows you to resize a Google Kubernetes Engine (GKE) cluster by setting the size of its node pool. 
* The function is triggered by a Pub/Sub topic called "resize".

## Prerequisites
Before deploying this function, you will need to have the following set up:

A Google Cloud Platform (GCP) project with the necessary permissions to create and manage Cloud Functions and GKE clusters.
The Google Cloud SDK installed and configured for your GCP project.

### Deploying the Function

1-  Create a new Cloud Function in your GCP project:

```sh
gcloud functions create clusterSizeFn \
--runtime nodejs12 \
--trigger-topic resize
```

2- Set the following environment variables for the function:

* CLUSTER_ID: the ID of the GKE cluster to resize.
* ZONE: the zone where the cluster is located.
* NODE_POOL_ID: the ID of the node pool to resize.
* SIZE: the new size for the node pool (the number of nodes).
* PROJECT_ID: the ID of your GCP project.

You can set these variables using the gcloud command-line tool:

```sh
gcloud functions deploy clusterSizeFn \
--set-env-vars CLUSTER_ID=<CLUSTER_ID>,ZONE=<ZONE>,NODE_POOL_ID=<NODE_POOL_ID>,SIZE=<SIZE>,PROJECT_ID=<PROJECT_ID>
```

3- Upload the code for the function to Cloud Functions:

```sh
gcloud functions deploy clusterSizeFn --update-code=<CODE_FILE_PATH>
```

## Testing the Function

To test the function, you can publish a message to the "resize" topic with the following command:

```sh
gcloud pubsub topics publish resize --message '{"clusterId": "<CLUSTER_ID>", "zone": "<ZONE>", "nodePoolId": "<NODE_POOL_ID>", "size": <SIZE>}'
```

Replace the placeholders with the appropriate values for your cluster and desired node pool size. The function should be triggered and the node pool should be resized to the specified size.



