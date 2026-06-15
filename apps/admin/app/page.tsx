import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
import { TailwindDemo } from '@repo/ui/tailwind-demo'

export default function Home() {
  return (
    <>
      <TailwindDemo appName="admin" />

      <Card>
        <CardHeader>
          <CardTitle>Admin primitive validation</CardTitle>
          <CardDescription>
            This block checks the same shared primitives in a second app with a slightly different
            layout and button sizing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2 md:max-w-md">
            <Label htmlFor="tenant-id">Tenant identifier</Label>
            <Input id="tenant-id" placeholder="team-enterprise-01" />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Queue sync</Button>
            <Button variant="secondary">Inspect</Button>
            <Button size="lg" variant="outline">
              Publish changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
