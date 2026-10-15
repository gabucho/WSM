'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeleteWorkflowButton({ id }: { id: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    if (!confirm('¿Eliminar este workflow?')) return
    await supabase.from('workflows').delete().eq('id', id)
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete}>
      <Trash2 size={14} className="text-red-500" />
    </Button>
  )
}