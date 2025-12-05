import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllInstances } from '@/services/api/instances'
import { IconPlus, IconMapPin, IconPackage } from '@tabler/icons-react'
import { InstancesList } from '@/components/features/instances/instances-list'
import { GenerateRandomForm } from '@/components/features/instances/generate-random-form'
import { GenerateClusteredForm } from '@/components/features/instances/generate-clustered-form'
//

type TabType = 'list' | 'generate-random' | 'generate-clustered' //| 'upload'

export const InstancesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('list')

  // Fetch all instances
  const { data: instances, isLoading } = useQuery({
    queryKey: ['instances'],
    queryFn: getAllInstances,
  })

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Instance Management
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Generate, upload, and manage CVRP problem instances
        </p>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'list'
              ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100'
              : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          <IconPackage className="h-4 w-4" />
          All Instances
        </button>
        <button
          onClick={() => setActiveTab('generate-random')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'generate-random'
              ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100'
              : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          <IconPlus className="h-4 w-4" />
          Generate Random
        </button>
        <button
          onClick={() => setActiveTab('generate-clustered')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'generate-clustered'
              ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100'
              : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          <IconMapPin className="h-4 w-4" />
          Generate Clustered
        </button>
        {/* <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100'
              : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          <IconUpload className="h-4 w-4" />
          Upload File
        </button> */}
      </div>
      Tab Content
      <div>
        {activeTab === 'list' && (
          <InstancesList
            instances={instances}
            isLoading={isLoading}
            onGenerateRandom={() => setActiveTab('generate-random')}
            onGenerateClustered={() => setActiveTab('generate-clustered')}
          />
        )}

        {activeTab === 'generate-random' && (
          <GenerateRandomForm onSuccess={() => setActiveTab('list')} />
        )}

        {activeTab === 'generate-clustered' && (
          <GenerateClusteredForm onSuccess={() => setActiveTab('list')} />
        )}

        {/* {activeTab === 'upload' && <UploadForm onSuccess={() => setActiveTab('list')} />} */}
      </div>
    </div>
  )
}
