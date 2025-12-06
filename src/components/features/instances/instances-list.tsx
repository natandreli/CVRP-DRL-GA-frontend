import { deleteInstance, getInstance } from '@/services/api/instances'
import type { CVRPInstance } from '@/services/api/instances/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IconTrash, IconPackage } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal'
import { useToast } from '@/hooks/use-toast'
import { InstanceDetailsModal } from '@/components/features/instances/modals/instance-details-modal'

type InstancesListProps = {
  instances: CVRPInstance[] | undefined
  isLoading: boolean
  onGenerateRandom: () => void
  onGenerateClustered: () => void
}

export const InstancesList = ({
  instances,
  isLoading,
  onGenerateRandom,
  onGenerateClustered,
}: InstancesListProps) => {
  const modal = useModal()
  const toast = useToast()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteInstance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instances'] })
      toast.success('Instance deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete instance')
    },
  })

  const handleViewDetails = async (instanceId: string) => {
    try {
      const instance = await getInstance(instanceId)
      modal.open(<InstanceDetailsModal instance={instance} />)
    } catch {
      toast.error('Failed to load instance details')
    }
  }

  const handleDelete = (instanceId: string) => {
    modal.open(
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Delete Instance
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to delete <strong>{instanceId}</strong> instance? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="grey" onClick={() => modal.close()}>
            Cancel
          </Button>
          <Button
            variant="error"
            onClick={() => {
              deleteMutation.mutate(instanceId)
              modal.close()
            }}
            isLoading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
          <div className="absolute top-0 left-0 h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-sky-500"></div>
        </div>
        <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          Loading instances...
        </p>
      </div>
    )
  }

  if (!instances || instances.length === 0) {
    return (
      <Card className="py-12">
        <CardContent className="text-center">
          <IconPackage className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-sm font-medium text-slate-900 dark:text-slate-100">
            No instances yet
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Generate or upload an instance to get started
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button size="sm" onClick={onGenerateRandom}>
              Generate Random
            </Button>
            <Button size="sm" variant="alt" onClick={onGenerateClustered}>
              Generate Clustered
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const presetInstances = instances.filter((instance) => instance.type === 'preset')
  const userInstances = instances.filter((instance) => instance.type !== 'preset')

  const renderInstanceCard = (instance: CVRPInstance) => (
    <Card
      key={instance.id}
      className="group relative cursor-pointer overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50"
      onClick={() => handleViewDetails(instance.id)}
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-sky-500/10 blur-xl" />
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-lg font-bold text-slate-50">
              {instance.name}
            </CardTitle>
            <CardDescription className="mt-1.5 truncate font-mono text-xs text-slate-500">
              {instance.id}
            </CardDescription>
          </div>
          {instance.type !== 'preset' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(instance.id)
              }}
              className="flex-shrink-0 rounded-lg p-2 text-slate-500 transition-all hover:scale-110 hover:bg-red-950/50 hover:text-red-400"
              aria-label="Delete instance"
            >
              <IconTrash className="h-5 w-5" />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-sky-800/50 bg-sky-950/40 p-3">
            <div className="text-xs font-medium text-sky-400">Customers</div>
            <div className="text-md mt-1 font-bold text-sky-50">{instance.customers.length}</div>
          </div>
          <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/40 p-3">
            <div className="text-xs font-medium text-emerald-400">Capacity</div>
            <div className="text-md mt-1 font-bold text-emerald-50">
              {instance.vehicle_capacity}
            </div>
          </div>
        </div>

        {instance.description && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-sm leading-relaxed text-slate-300">
            {instance.description}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-10">
      {/* User Generated Instances Section */}
      {userInstances.length > 0 && (
        <div>
          <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Your Instances
            <span className="ml-2 text-sm font-normal text-slate-600 dark:text-slate-400">
              ({userInstances.length})
            </span>
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userInstances.map(renderInstanceCard)}
          </div>
        </div>
      )}

      {/* Empty state for user instances */}
      {userInstances.length === 0 && presetInstances.length > 0 && (
        <div>
          <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Your Instances
            <span className="ml-2 text-sm font-normal text-slate-600 dark:text-slate-400">(0)</span>
          </h4>
          <Card className="py-8">
            <CardContent className="text-center">
              <IconPackage className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700" />
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                You haven't created any instances yet
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button size="sm" onClick={onGenerateRandom}>
                  Generate Random
                </Button>
                <Button size="sm" variant="alt" onClick={onGenerateClustered}>
                  Generate Clustered
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preset Instances Section */}
      {presetInstances.length > 0 && (
        <div>
          <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Preset Instances
            <span className="ml-2 text-sm font-normal text-slate-600 dark:text-slate-400">
              ({presetInstances.length})
            </span>
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {presetInstances.map(renderInstanceCard)}
          </div>
        </div>
      )}
    </div>
  )
}
