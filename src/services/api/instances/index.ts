import { apiFetcher } from '@/services/api'
import type {
  CVRPInstance,
  GenerateRandomInstanceRequest,
  GenerateClusteredInstanceRequest,
} from './types'

/**
 * Get all instances
 * @return A list of all CVRP instances.
 */
export async function getAllInstances(): Promise<CVRPInstance[]> {
  const res = await apiFetcher.get('/instances/all')
  return res.data
}

/**
 * Generate a random CVRP instance
 * @param params The parameters for generating the random instance.
 * @return A randomly generated CVRP instance.
 */
export async function generateRandomInstance(
  params: GenerateRandomInstanceRequest
): Promise<CVRPInstance> {
  const res = await apiFetcher.post('/instances/generate/random', params)
  return res.data
}

/**
 * Generate a clustered CVRP instance
 * @param params The parameters for generating the clustered instance.
 * @return A clustered CVRP instance.
 */
export async function generateClusteredInstance(
  params: GenerateClusteredInstanceRequest
): Promise<CVRPInstance> {
  const res = await apiFetcher.post('/instances/generate/clustered', params)
  return res.data
}

/**
 * Upload a CVRP instance file
 * @param file The CVRP instance file to upload.
 * @return The uploaded CVRP instance.
 */
export async function uploadInstance(file: File): Promise<CVRPInstance> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await apiFetcher.post('/instances/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}

/**
 * Delete an instance
 * @param instanceId The ID of the instance to delete.
 */
export async function deleteInstance(instanceId: string): Promise<void> {
  await apiFetcher.delete(`/instances/${instanceId}`)
}
