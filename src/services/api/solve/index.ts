import { apiFetcher } from '@/services/api'
import type { ComparisonRequest, ComparisonResponse } from './types'

/**
 * Run comparison between pure GA and DRL+GA (NeuroGen)
 * @param params The parameters for the comparison.
 * @return The comparison results.
 */
export async function runComparison(params: ComparisonRequest): Promise<ComparisonResponse> {
  const res = await apiFetcher.post('/solve/comparison', params)
  return res.data
}
