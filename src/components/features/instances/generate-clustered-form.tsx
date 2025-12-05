import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateClusteredInstance } from '@/services/api/instances'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import type { CVRPInstance } from '@/services/api/instances/types'
import { Card, CardContent } from '@/components/ui/card'

type GenerateClusteredFormProps = {
  onSuccess: () => void
}

export const GenerateClusteredForm = ({ onSuccess }: GenerateClusteredFormProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState(() => ({
    num_customers: '20',
    vehicle_capacity: '100',
    grid_size: '100',
    min_customer_demand: '10',
    max_customer_demand: '30',
    num_clusters: '3',
    seed: String(Math.floor(Math.random() * 10000)),
  }))

  const generateMutation = useMutation({
    mutationFn: generateClusteredInstance,
    onSuccess: (instance: CVRPInstance) => {
      toast.success(
        <span>
          Clustered instance <strong>{instance.id}</strong> generated successfully
        </span>
      )
      queryClient.invalidateQueries({ queryKey: ['instances'] })
      onSuccess()
    },
    onError: () => {
      toast.error('Failed to generate instance')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.num_customers ||
      !formData.vehicle_capacity ||
      !formData.grid_size ||
      !formData.min_customer_demand ||
      !formData.max_customer_demand ||
      !formData.num_clusters ||
      !formData.seed
    ) {
      toast.warning('Please fill in all required fields')
      return
    }

    const numCustomers = parseInt(formData.num_customers)
    const vehicleCapacity = parseInt(formData.vehicle_capacity)
    const gridSize = parseInt(formData.grid_size)
    const minDemand = parseInt(formData.min_customer_demand)
    const maxDemand = parseInt(formData.max_customer_demand)
    const numClusters = parseInt(formData.num_clusters)

    if (
      numCustomers < 1 ||
      vehicleCapacity < 1 ||
      gridSize < 1 ||
      minDemand < 1 ||
      maxDemand < 1 ||
      numClusters < 1
    ) {
      toast.error('All fields must be greater than 0')
      return
    }

    if (minDemand >= maxDemand) {
      toast.error('Minimum demand must be less than maximum demand')
      return
    }

    generateMutation.mutate({
      num_customers: numCustomers,
      vehicle_capacity: vehicleCapacity,
      grid_size: gridSize,
      min_customer_demand: minDemand,
      max_customer_demand: maxDemand,
      num_clusters: numClusters,
      seed: parseInt(formData.seed),
    })
  }

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Generate Clustered Instance
        </span>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Create a CVRP instance with customers grouped in clusters
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="relative overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-sky-500/10 blur-2xl" />
          <div className="absolute top-1/2 left-0 h-28 w-28 -translate-x-8 -translate-y-1/2 rounded-full bg-violet-500/8 blur-xl" />
          <div className="absolute right-1/4 bottom-0 h-24 w-24 translate-y-6 rounded-full bg-emerald-500/8 blur-xl" />
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Number of Customers"
                type="number"
                min={1}
                value={formData.num_customers}
                setValue={(value) => setFormData({ ...formData, num_customers: value })}
                required
                containerProps={{
                  className: 'w-full',
                }}
              />
              <Input
                label="Grid Size"
                type="number"
                min={1}
                value={formData.grid_size}
                setValue={(value) => setFormData({ ...formData, grid_size: value })}
                required
                containerProps={{
                  className: 'w-full',
                }}
              />
              <Input
                label="Minimum Customer Demand"
                type="number"
                min={1}
                value={formData.min_customer_demand}
                setValue={(value) => setFormData({ ...formData, min_customer_demand: value })}
                required
                containerProps={{
                  className: 'w-full',
                }}
              />
              <Input
                label="Maximum Customer Demand"
                type="number"
                min={1}
                value={formData.max_customer_demand}
                setValue={(value) => setFormData({ ...formData, max_customer_demand: value })}
                required
                containerProps={{
                  className: 'w-full',
                }}
              />
              <div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Input
                  label="Number of Clusters"
                  type="number"
                  min={1}
                  value={formData.num_clusters}
                  setValue={(value) => setFormData({ ...formData, num_clusters: value })}
                  required
                  containerProps={{
                    className: 'w-full',
                  }}
                />
                <Input
                  label="Vehicle Capacity"
                  type="number"
                  min={1}
                  value={formData.vehicle_capacity}
                  setValue={(value) => setFormData({ ...formData, vehicle_capacity: value })}
                  required
                  containerProps={{
                    className: 'w-full',
                  }}
                />
                <Input
                  label="Random Seed"
                  type="number"
                  value={formData.seed}
                  setValue={(value) => setFormData({ ...formData, seed: value })}
                  required
                  containerProps={{
                    className: 'w-full',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="submit" size="md" isLoading={generateMutation.isPending}>
            Generate Instance
          </Button>
        </div>
      </form>
    </div>
  )
}
