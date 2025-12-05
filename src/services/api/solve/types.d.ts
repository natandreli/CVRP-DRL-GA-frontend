import type { Solution } from '@/services/types'

export interface GAConfig {
  population_size: number
  generations: number
  crossover_rate: number
  mutation_rate: number
  selection_method: 'tournament' | 'roulette'
  tournament_size: number
  elitism_count: number
  crossover_method: 'ox' | 'pmx' | 'edge'
  mutation_method: 'swap' | 'insert' | 'inversion' | '2opt'
  seed?: number | null
}

export interface ComparisonRequest {
  instance_id: string
  drl_model_id: string
  ga_config: GAConfig
}

export interface AlgorithmResult {
  algorithm_name: string
  initial_fitness: number
  final_solution: Solution
  computation_time: number
  convergence_history?: Array<{ generation: number; fitness: number }>
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
