import os from 'os';

export async function getInstanceDetails() {
  try {
    // Get instance ID from instance metadata
    const instanceId = await fetch('http://169.254.169.254/latest/meta-data/instance-id')
      .then(response => response.text());

    // Get public IPv4 address from instance metadata
    const publicIpAddress = await fetch('http://169.254.169.254/latest/meta-data/public-ipv4')
      .then(response => response.text());

    // Get private IPv4 address from instance metadata
    const privateIpAddress = await fetch('http://169.254.169.254/latest/meta-data/local-ipv4')
      .then(response => response.text());

    // Get availability zone from instance metadata
    const availabilityZone = await fetch('http://169.254.169.254/latest/meta-data/placement/availability-zone')
      .then(response => response.text());

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    return {
      id: instanceId,
      publicIpAddress,
      privateIpAddress,
      availabilityZone,
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