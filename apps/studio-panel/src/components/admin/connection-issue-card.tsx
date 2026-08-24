import { Card } from '@/components/ui/card'

export function ConnectionIssueCard({
  title = 'Conexion pendiente',
  message,
  detail,
}: {
  title?: string
  message: string
  detail?: string | null
}) {
  return (
    <Card className="border-amber-200 bg-amber-50 p-5">
      <p className="font-semibold text-amber-900">{title}</p>
      <p className="mt-1 text-sm text-amber-800">{message}</p>
      {detail ? <p className="mt-2 text-xs text-amber-700">Detalle: {detail}</p> : null}
    </Card>
  )
}
