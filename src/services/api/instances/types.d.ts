import type { Location, Customer } from '@/services/api/types'

export interface CVRPInstance {
  id: string
  type: string
  name: string
  description?: string
  depot: Location
  customers: Customer[]
  vehicle_capacity: number
  max_vehicles?: number
  distance_matrix?: number[][]
}

export interface GenerateRandomInstanceRequest {
  num_customers: number
  grid_size: number
  vehicle_capacity: number
  min_customer_demand: number
  max_customer_demand: number
  seed?: number
}

export interface GenerateClusteredInstanceRequest {
  num_customers: number
  grid_size: number
  vehicle_capacity: number
  min_customer_demand: number
  max_customer_demand: number
  num_clusters: number
  seed?: number
}
