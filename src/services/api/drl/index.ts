import { apiFetcher } from '@/services/api'
import type { GetModelsResponse } from './types'

/**
 * Get a list of DRL models.
 * @return A list of DRL models.
 */
export async function getModels(): Promise<GetModelsResponse> {
  const res = await apiFetcher.get('/drl/models')
  return res.data
}
