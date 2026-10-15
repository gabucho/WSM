import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { EditWorkflowForm } from '@/components/workflow/EditWorkflowForm'

export default async function EditWorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: workflow } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', id)
    .single()

  if (!workflow) notFound()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Workflow</h1>
      <EditWorkflowForm workflow={workflow} />
    </div>
  )
}