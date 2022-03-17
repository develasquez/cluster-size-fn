const {google} = require('googleapis');
const container = google.container('v1');
const Buffer = require('safe-buffer').Buffer;

exports.clusterSizeFn = async (message, context) => {
    const data = message.data
        ? Buffer.from(message.data, 'base64').toString()
        : '';
    let payload = JSON.parse(data)
    console.log(payload)
    if (payload.size >= 0 ){
        resize(JSON.parse(data));
    } else {
        resize({
            clusterId: process.env.CLUSTER_ID,
            zone: process.env.ZONE,
            nodePoolId: process.env.NODE_POOL_ID,
            size: process.env.SIZE
        });
    }
        
};

async function resize ({clusterId, zone, nodePoolId, size}) {
  const authClient = await authorize();
  const request = {
    projectId: process.env.PROJECT_ID, 
    zone,
    clusterId,
    nodePoolId,
    resource: {
        nodeCount: size
    },
    auth: authClient,
  };
    console.log(request);
  try {
    const response = (await container.projects.zones.clusters.nodePools.setSize(request)).data;
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  return await auth.getClient();
}
