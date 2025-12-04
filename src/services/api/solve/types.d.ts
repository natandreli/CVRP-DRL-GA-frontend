import type { Solution } from '@/services/types'

export interface ComparisonRequest {
  instance_id: string
  model_id: string
  population_size: number
  num_generations: number
  mutation_rate: number
  crossover_rate: number
  tournament_size: number
  elite_size: number
}

export interface AlgorithmResult {
  algorithm_name: string
  initial_fitness: number
  final_solution: Solution
  computation_time: number
}

export interface ComparisonMetrics {
  improvement_absolute: number
  improvement_percentage: number
  time_difference: number
  initial_gap_percentage: number
  vehicles_difference: number
  winner: string
}

export interface ComparisonResponse {
  neurogen: AlgorithmResult
  ga_pure: AlgorithmResult
  metrics: ComparisonMetrics
}
