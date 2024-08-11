import { getInstanceDetails } from "./details";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const dynamic = 'force-dynamic';

export default async function Page() {
  const computeInstance = await getInstanceDetails();
  if (!computeInstance) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Instance Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Error</div>
                <div>Failed to fetch instance details.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Instance Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Instance ID</div>
                <div>{computeInstance.id}</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Availability Zone</div>
                <div>{computeInstance.availabilityZone}</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Public IP</div>
                <div>{computeInstance.publicIpAddress}</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Private IP</div>
                <div>{computeInstance.privateIpAddress}</div>
              </div>
            </div>

          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Total Memory</div>
                <div>{computeInstance.totalMemory} MB</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">Free Memory</div>
                <div>{computeInstance.freeMemory} MB</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">Used Memory</div>
                <div>{computeInstance.usedMemory} MB</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">CPU Model</div>
                <div>{computeInstance.cpuModel}</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium">CPU Count</div>
                <div>{computeInstance.cpuCount}</div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium">OS</div>
                <div>
                  {computeInstance.osType} {computeInstance.osRelease}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}