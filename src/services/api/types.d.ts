export type CustomClassName = string | undefined

export interface Location {
  x: number
  y: number
}

export interface Customer {
  id: number
  location: Location
  demand: number
  ready_time?: number
  due_time?: number
  service_time?: number
}

export interface Route {
  vehicle_id: number
  customer_sequence: number[]
  total_demand: number
  total_distance: number
}

export interface Solution {
  id: string
  instance_id: string
  algorithm: string
  routes: Route[]
  total_cost: number
  computation_time: number
  is_valid: boolean
  convergence_history?: number[]
}

export interface Toast {
  id: string
  content: React.ReactNode
  type: 'default' | 'success' | 'error' | 'warning' | 'loading'
}
