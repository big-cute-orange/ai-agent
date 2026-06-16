import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex max-w-250 flex-col gap-8 p-8">
      <header className="grid gap-2">
        <h1 className="text-3xl font-semibold text-content-primary">Design System</h1>
        <p className="text-content-secondary">
          用于校验颜色、层级、表单状态和按钮变体的一组基础页面。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>色彩与状态</CardTitle>
          <CardDescription>检查品牌色、状态色和文字层级是否清楚。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label>Brand</Label>
            <div className="flex gap-3">
              <div className="size-12 rounded-xl bg-brand-400" />
              <div className="size-12 rounded-xl bg-brand-500" />
              <div className="size-12 rounded-xl bg-brand-600" />
            </div>
          </div>

          <Separator />

          <div className="grid gap-3">
            <Label>State</Label>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="default">Info</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>按钮与操作层级</CardTitle>
          <CardDescription>检查主操作、次操作和风险操作的区分是否稳定。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>表单状态</CardTitle>
          <CardDescription>检查输入区层级、聚焦环和异常态。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">项目名称</Label>
            <Input id="project-name" placeholder="输入项目名称" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-slug">项目标识</Label>
            <Input id="project-slug" aria-invalid defaultValue="ai companion" />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
