export interface TrainingSpecs {
  algorithm: string
  total_episodes: number
  instance_distribution: string
  problem_size: string
  learning_strategy: string
  validation_method: string
}

export interface ModelInfo {
  id: string
  name: string
  subname?: string
  description?: string
  training_summary?: string
  training_specs?: TrainingSpecs
}

export interface GetModelsResponse {
  models: ModelInfo[]
}
