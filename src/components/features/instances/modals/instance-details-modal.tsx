import { IconInfoCircle } from '@tabler/icons-react'
import type { CVRPInstance } from '@/services/api/instances/types'

type InstanceDetailsModalProps = {
  instance: CVRPInstance
}

export const InstanceDetailsModal = ({ instance }: InstanceDetailsModalProps) => {
  // Prepare coordinates-only JSON (without max_vehicles and distance_matrix)
  const coordinatesData = {
    depot: instance.depot,
    customers: instance.customers.map((c) => ({
      id: c.id,
      location: c.location,
      demand: c.demand,
    })),
  }

  return (
    <div className="w-[600px] space-y-6">
      <div className="flex items-center gap-3">
        <IconInfoCircle className="h-6 w-6 text-sky-500" />
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Instance Details
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Name
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{instance.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            ID
          </p>
          <p className="font-mono text-xs text-slate-600 dark:text-slate-400">{instance.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Vehicle Capacity
          </p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {instance.vehicle_capacity}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Number of Customers
          </p>
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
            {instance.customers.length}
          </p>
        </div>
        {instance.num_clusters && (
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
              Clusters
            </p>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {instance.num_clusters}
            </p>
          </div>
        )}
        {instance.seed !== undefined && instance.seed !== null && (
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
              Seed
            </p>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-300">{instance.seed}</p>
          </div>
        )}
      </div>

      {instance.description && (
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Description
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {instance.description}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Coordinates Data
        </p>
        <pre className="max-h-64 overflow-auto rounded-lg border border-slate-700/50 bg-slate-900 p-3 text-xs text-slate-300">
          {JSON.stringify(coordinatesData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
