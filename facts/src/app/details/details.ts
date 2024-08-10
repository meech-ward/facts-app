import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import os from 'os';

const ec2Client = new EC2Client();

export async function getInstanceDetails() {
  try {
    // Get instance ID from instance metadata
    const instanceId = await fetch('http://169.254.169.254/latest/meta-data/instance-id')
      .then(response => response.text());

    const command = new DescribeInstancesCommand({
      InstanceIds: [instanceId],
    });

    const response = await ec2Client.send(command);
    const instance = response.Reservations?.[0]?.Instances?.[0];

    if (!instance) {
      throw new Error('Instance not found');
    }

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    return {
      id: instance.InstanceId,
      type: instance.InstanceType,
      publicIpAddress: instance.PublicIpAddress,
      privateIpAddress: instance.PrivateIpAddress,
      vpcId: instance.VpcId,
      subnetId: instance.SubnetId,
      availabilityZone: instance.Placement?.AvailabilityZone,
      state: instance.State?.Name,
      launchTime: instance.LaunchTime,
      imageId: instance.ImageId,
      platform: instance.Platform || 'linux',
      architecture: instance.Architecture,
      securityGroups: instance.SecurityGroups?.map(sg => sg.GroupId),
      totalMemory: `${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
      freeMemory: `${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
      usedMemory: `${((totalMemory - freeMemory) / 1024 / 1024 / 1024).toFixed(2)} GB`,
      cpuModel: os.cpus()[0].model,
      cpuCount: os.cpus().length,
      osType: os.type(),
      osRelease: os.release(),
      hostname: os.hostname()
    };
  } catch (error) {
    console.error('Error fetching instance details:', error);
    return null;
  }
}
