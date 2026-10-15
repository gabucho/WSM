import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { DeleteWorkflowButton } from '@/components/workflow/DeleteWorkflowButton'

export default async function WorkflowsPage() {
  const supabase = await createClient()
  const { data: workflows } = await supabase
    .from('workflows')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-slate-500">Gestiona tus flujos de trabajo</p>
        </div>
        <Link href="/workflows/new">
          <Button>
            <Plus size={16} className="mr-2" /> Nuevo Workflow
          </Button>
        </Link>
      </div>

      {!workflows?.length ? (
        <Card className="p-12 text-center text-slate-500">
          No hay workflows todavía. Crea el primero.
        </Card>
      ) : (
        <div className="grid gap-4">
          {workflows.map((w) => (
            <Card key={w.id} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{w.name}</h3>
                <p className="text-sm text-slate-500">{w.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/workflows/${w.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Pencil size={14} />
                  </Button>
                </Link>
                <DeleteWorkflowButton id={w.id} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}