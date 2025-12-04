import type { Location, Customer } from '@/services/api/types'

export interface CVRPInstance {
  id: string
  name: string
  description?: string
  depot: Location
  customers: Customer[]
  vehicle_capacity: number
  max_vehicles?: number
  distance_matrix?: number[][]
}

export interface GenerateRandomInstanceRequest {
  name: string
  description?: string
  num_customers: number
  vehicle_capacity: number
  max_vehicles?: number
  grid_size: number
  demand_min: number
  demand_max: number
  seed?: number
}

export interface GenerateClusteredInstanceRequest {
  name: string
  description?: string
  num_customers: number
  vehicle_capacity: number
  max_vehicles?: number
  grid_size: number
  demand_min: number
  demand_max: number
  num_clusters: number
  cluster_std: number
  seed?: number
}
