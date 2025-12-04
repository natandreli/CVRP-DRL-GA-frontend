import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateRandomInstance } from '@/services/api/instances'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

type GenerateRandomFormProps = {
  onSuccess: () => void
}

export const GenerateRandomForm = ({ onSuccess }: GenerateRandomFormProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState(() => ({
    num_customers: '20',
    vehicle_capacity: '100',
    max_vehicles: '',
    grid_size: '100',
    min_customer_demand: '10',
    max_customer_demand: '30',
    seed: String(Math.floor(Math.random() * 10000)),
  }))

  const generateMutation = useMutation({
    mutationFn: generateRandomInstance,
    onSuccess: () => {
      toast.success('Random instance generated successfully')
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

    if (numCustomers < 1 || vehicleCapacity < 1 || gridSize < 1 || minDemand < 1 || maxDemand < 1) {
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
      seed: parseInt(formData.seed),
    })
  }

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Generate Random Instance
        </span>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Create a CVRP instance with randomly distributed customers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="mt-10 flex justify-end gap-3">
          <Button type="submit" size="md" variant="grey" isLoading={generateMutation.isPending}>
            Generate Instance
          </Button>
        </div>
      </form>
    </div>
  )
}
