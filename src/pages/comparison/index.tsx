import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllInstances } from '@/services/api/instances'
import { getModels } from '@/services/api/drl'
import { runComparison } from '@/services/api/solve'
import { useToast } from '@/hooks/use-toast'
import { ConfigurationForm } from '@/components/features/comparison/configuration-form'
import { WinnerBanner } from '@/components/features/comparison/winner-banner'
import { MetricsOverview } from '@/components/features/comparison/metrics-overview'
import { AlgorithmResultCard } from '@/components/features/comparison/algorithm-result-card'
import { ConvergenceChart } from '@/components/features/comparison/convergence-chart'
import type { ComparisonResponse, GAConfig } from '@/services/api/solve/types'

export const ComparisonPage = () => {
  const toast = useToast()
  const [selectedInstance, setSelectedInstance] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [comparisonResult, setComparisonResult] = useState<ComparisonResponse | null>(null)
  const [isFormCollapsed, setIsFormCollapsed] = useState(false)

  const [gaConfig, setGaConfig] = useState<GAConfig>({
    population_size: 50,
    generations: 100,
    mutation_rate: 0.2,
    crossover_rate: 0.8,
    selection_method: 'tournament',
    tournament_size: 3,
    elitism_count: 2,
    crossover_method: 'ox',
    mutation_method: 'swap',
    seed: null,
  })

  const { data: instances } = useQuery({
    queryKey: ['instances'],
    queryFn: getAllInstances,
  })

  const { data: modelsData } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  })

  const comparisonMutation = useMutation({
    mutationFn: runComparison,
    onSuccess: (data) => {
      setComparisonResult(data)
      setIsFormCollapsed(true)
      toast.success('Comparison completed successfully!')
    },
    onError: () => {
      toast.error('Failed to run comparison')
    },
  })

  const handleRunComparison = () => {
    if (!selectedInstance || !selectedModel) {
      toast.warning('Please select an instance and a model')
      return
    }

    setComparisonResult(null)
    setIsFormCollapsed(false)

    toast.warning('Running comparison... This may take a while, please wait.')

    comparisonMutation.mutate({
      instance_id: selectedInstance,
      drl_model_id: selectedModel,
      ga_config: gaConfig,
    })
  }

  const selectedInstanceData = instances?.find((i) => i.id === selectedInstance)

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Algorithm Comparison
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Compare pure GA vs NeuroGen (DRL+GA) performance
        </p>
      </div>

      {/* Configuration Form */}
      <ConfigurationForm
        instances={instances}
        models={modelsData?.models}
        selectedInstance={selectedInstance}
        selectedModel={selectedModel}
        gaConfig={gaConfig}
        isLoading={comparisonMutation.isPending}
        isCollapsed={isFormCollapsed}
        onInstanceChange={setSelectedInstance}
        onModelChange={setSelectedModel}
        onGAConfigChange={setGaConfig}
        onRunComparison={handleRunComparison}
        onToggleCollapse={() => setIsFormCollapsed(!isFormCollapsed)}
      />

      {/* Results */}
      {comparisonResult && selectedInstanceData && (
        <div className="space-y-8">
          <WinnerBanner metrics={comparisonResult.metrics} />
          <MetricsOverview metrics={comparisonResult.metrics} />

          {/* Convergence Charts */}
          {(comparisonResult.neurogen.convergence_history ||
            comparisonResult.ga_pure.convergence_history) &&
            (() => {
              // Calculate common Y-axis domain for both charts
              const neurogenMax = comparisonResult.neurogen.convergence_history
                ? Math.max(...comparisonResult.neurogen.convergence_history.map((d) => d.fitness))
                : 0
              const pureMax = comparisonResult.ga_pure.convergence_history
                ? Math.max(...comparisonResult.ga_pure.convergence_history.map((d) => d.fitness))
                : 0
              const maxFitness = Math.max(neurogenMax, pureMax)
              const yDomain: [number, number] = [0, Math.ceil(maxFitness * 1.1)] // Add 10% padding

              return (
                <div className="space-y-4">
                  <div className="mb-8">
                    <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Convergence Analysis
                    </span>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Fitness over generations for each algorithm
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {comparisonResult.neurogen.convergence_history && (
                      <ConvergenceChart
                        data={comparisonResult.neurogen.convergence_history}
                        algorithmName="NeuroGen (DRL+GA)"
                        color="#10b981"
                        yDomain={yDomain}
                      />
                    )}
                    {comparisonResult.ga_pure.convergence_history && (
                      <ConvergenceChart
                        data={comparisonResult.ga_pure.convergence_history}
                        algorithmName="Pure GA"
                        color="#3b82f6"
                        yDomain={yDomain}
                      />
                    )}
                  </div>
                </div>
              )
            })()}

          {/* Algorithm Results */}
          <div className="space-y-4">
            <div className="mb-8">
              <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Detailed Results
              </span>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                In-depth metrics and route visualizations for each algorithm
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AlgorithmResultCard
                title="NeuroGen (DRL+GA)"
                result={comparisonResult.neurogen}
                instance={selectedInstanceData}
                accentColor="emerald"
              />
              <AlgorithmResultCard
                title="Pure GA"
                result={comparisonResult.ga_pure}
                instance={selectedInstanceData}
                accentColor="sky"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
