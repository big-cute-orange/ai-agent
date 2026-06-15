import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
import { TailwindDemo } from '@repo/ui/tailwind-demo'

export default function Home() {
  return (
    <>
      <TailwindDemo appName="web" />

      <Card>
        <CardHeader>
          <CardTitle>Primitive validation in web</CardTitle>
          <CardDescription>
            This section imports shared Button, Input, Label, Card, and Separator components
            directly from{' '}
            <code className="rounded bg-white/10 px-2 py-1 text-slate-100">@repo/ui</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" placeholder="AI Agent workspace" />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3">
            <Button>Save draft</Button>
            <Button variant="secondary">Preview</Button>
            <Button variant="outline">Open docs</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
