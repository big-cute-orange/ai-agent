import { Badge } from './badge'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Label } from './label'
import { Separator } from './separator'

type TailwindDemoProps = {
  appName: string
}

export function TailwindDemo({ appName }: TailwindDemoProps) {
  return (
    <Card className="w-full max-w-250 overflow-hidden">
      <CardHeader className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div className="grid gap-3">
          <Badge>shared ui package</Badge>
          <div className="grid gap-2">
            <CardTitle className="text-2xl md:text-3xl">
              Design system is active in {appName}
            </CardTitle>
            <CardDescription className="max-w-160">
              基础组件已经统一消费设计令牌，颜色、层级、圆角和状态反馈保持一致。
            </CardDescription>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border-default bg-surface-canvas px-4 py-3 text-sm text-content-secondary">
            Shared tokens
          </div>
          <div className="rounded-xl border border-border-default bg-surface-canvas px-4 py-3 text-sm text-content-secondary">
            Shared primitives
          </div>
          <div className="rounded-xl border border-border-default bg-surface-canvas px-4 py-3 text-sm text-content-secondary">
            Shared states
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="grid gap-4 rounded-xl border border-border-default bg-surface-canvas p-5">
          <div className="grid gap-2">
            <Label htmlFor={`${appName}-workspace`}>Workspace</Label>
            <Input id={`${appName}-workspace`} defaultValue={`${appName}.workspace.local`} />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="outline">Outline action</Button>
          </div>
        </div>

        <div className="rounded-xl border border-border-default bg-surface-canvas p-5 text-sm leading-6 text-content-secondary">
          所有应用都通过同一套共享组件输出界面，后续调整主题或组件状态时，只需要维护一处。
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-3 border-t border-border-default pt-6">
        <Button asChild variant="ghost">
          <a href="/design-system" target="_blank" rel="noopener noreferrer">
            View design system
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
