import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { IconRocket, IconChevronDown } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { CVRPInstance } from '@/services/api/instances/types'
import type { ModelInfo } from '@/services/api/drl/types'
import type { GAConfig } from '@/services/api/solve/types'

interface ConfigurationFormProps {
  instances: CVRPInstance[] | undefined
  models: ModelInfo[] | undefined
  selectedInstance: string
  selectedModel: string
  gaConfig: GAConfig
  isLoading: boolean
  isCollapsed?: boolean
  onInstanceChange: (value: string) => void
  onModelChange: (value: string) => void
  onGAConfigChange: (config: GAConfig) => void
  onRunComparison: () => void
  onToggleCollapse?: () => void
}

export const ConfigurationForm = ({
  instances,
  models,
  selectedInstance,
  selectedModel,
  gaConfig,
  isLoading,
  isCollapsed = false,
  onInstanceChange,
  onModelChange,
  onGAConfigChange,
  onRunComparison,
  onToggleCollapse,
}: ConfigurationFormProps) => {
  return (
    <div className="mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Configuration
          </span>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Select the CVRP instance and DRL model, and configure the Genetic Algorithm parameters.
          </p>
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
            <IconChevronDown
              size={16}
              className={`transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
            />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Card className="relative overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-sky-500/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-violet-500/8 blur-xl" />

              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Instance Selection */}
                  <Select
                    label="CVRP Instance"
                    placeholder="Select an instance..."
                    value={selectedInstance}
                    options={
                      instances?.map((instance) => ({
                        value: instance.id,
                        label: instance.name,
                        subtitle: instance.id,
                      })) || []
                    }
                    onChange={onInstanceChange}
                    required
                  />

                  {/* Model Selection */}
                  <Select
                    label="DRL Model"
                    placeholder="Select a model..."
                    value={selectedModel}
                    options={
                      models?.map((model) => ({
                        value: model.id,
                        label: model.name,
                        subtitle: model.subname,
                      })) || []
                    }
                    onChange={onModelChange}
                    required
                  />
                </div>

                {/* GA Parameters */}
                <div className="space-y-6">
                  <span className="text-md block font-semibold text-slate-300">
                    Genetic Algorithm Parameters
                  </span>

                  {/* Basic Parameters */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <Input
                      required
                      label="Population Size"
                      type="number"
                      min={1}
                      value={gaConfig.population_size.toString()}
                      setValue={(value) =>
                        onGAConfigChange({ ...gaConfig, population_size: parseInt(value) })
                      }
                    />
                    <Input
                      required
                      label="Generations"
                      type="number"
                      min={1}
                      value={gaConfig.generations.toString()}
                      setValue={(value) =>
                        onGAConfigChange({ ...gaConfig, generations: parseInt(value) })
                      }
                    />
                    <Input
                      label="Seed"
                      type="number"
                      placeholder="Leave empty for random"
                      value={gaConfig.seed?.toString() || ''}
                      setValue={(value) =>
                        onGAConfigChange({
                          ...gaConfig,
                          seed: value === '' ? null : parseInt(value),
                        })
                      }
                    />
                  </div>

                  {/* Genetic Operators */}
                  <div className="space-y-4">
                    <span className="block text-sm font-medium text-slate-400">
                      Genetic Operators
                    </span>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Select
                        label="Selection Method"
                        value={gaConfig.selection_method}
                        options={[
                          {
                            value: 'tournament',
                            label: 'Tournament',
                            subtitle: 'Selects best from random sample',
                          },
                          {
                            value: 'roulette',
                            label: 'Roulette',
                            subtitle: 'Fitness proportional selection',
                          },
                        ]}
                        onChange={(value) =>
                          onGAConfigChange({
                            ...gaConfig,
                            selection_method: value as 'tournament' | 'roulette',
                          })
                        }
                        required
                      />
                      <Select
                        label="Crossover Method"
                        value={gaConfig.crossover_method}
                        options={[
                          {
                            value: 'ox',
                            label: 'OX (Order Crossover)',
                            subtitle: 'Preserves relative order',
                          },
                          {
                            value: 'pmx',
                            label: 'PMX (Partially Mapped)',
                            subtitle: 'Partial mapping crossover',
                          },
                          {
                            value: 'edge',
                            label: 'Edge Crossover',
                            subtitle: 'Edge-based recombination',
                          },
                        ]}
                        onChange={(value) =>
                          onGAConfigChange({
                            ...gaConfig,
                            crossover_method: value as 'ox' | 'pmx' | 'edge',
                          })
                        }
                        required
                      />
                      <Select
                        label="Mutation Method"
                        value={gaConfig.mutation_method}
                        options={[
                          {
                            value: 'swap',
                            label: 'Swap',
                            subtitle: 'Interchange two customers',
                          },
                          {
                            value: 'insert',
                            label: 'Insert',
                            subtitle: 'Move customer to new position',
                          },
                          {
                            value: 'inversion',
                            label: 'Inversion',
                            subtitle: 'Reverse segment order',
                          },
                          {
                            value: '2opt',
                            label: '2-opt',
                            subtitle: 'Remove crossings in route',
                          },
                        ]}
                        onChange={(value) =>
                          onGAConfigChange({
                            ...gaConfig,
                            mutation_method: value as 'swap' | 'insert' | 'inversion' | '2opt',
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Rates and Elitism */}
                  <div className="space-y-4">
                    <span className="block text-sm font-medium text-slate-400">
                      Rates & Elitism
                    </span>
                    <div
                      className={`grid gap-4 ${
                        gaConfig.selection_method === 'tournament'
                          ? 'grid-cols-2 md:grid-cols-4'
                          : 'grid-cols-3'
                      }`}
                    >
                      <Input
                        required
                        label="Crossover Rate"
                        type="number"
                        min={0}
                        max={1}
                        step={0.05}
                        value={gaConfig.crossover_rate.toString()}
                        setValue={(value) =>
                          onGAConfigChange({ ...gaConfig, crossover_rate: parseFloat(value) })
                        }
                      />
                      <Input
                        required
                        label="Mutation Rate"
                        type="number"
                        min={0}
                        max={1}
                        step={0.05}
                        value={gaConfig.mutation_rate.toString()}
                        setValue={(value) =>
                          onGAConfigChange({ ...gaConfig, mutation_rate: parseFloat(value) })
                        }
                      />
                      {gaConfig.selection_method === 'tournament' && (
                        <Input
                          required
                          label="Tournament Size"
                          type="number"
                          min={2}
                          value={gaConfig.tournament_size.toString()}
                          setValue={(value) =>
                            onGAConfigChange({ ...gaConfig, tournament_size: parseInt(value) })
                          }
                        />
                      )}
                      <Input
                        required
                        label="Elitism Count"
                        type="number"
                        min={1}
                        value={gaConfig.elitism_count.toString()}
                        setValue={(value) =>
                          onGAConfigChange({ ...gaConfig, elitism_count: parseInt(value) })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={onRunComparison}
                isLoading={isLoading}
                disabled={!selectedInstance || !selectedModel}
                size="md"
                icon={<IconRocket />}
              >
                Run Comparison
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
