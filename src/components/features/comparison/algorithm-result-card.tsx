import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RouteVisualization } from './route-visualization'
import type { CVRPInstance } from '@/services/api/instances/types'
import type { AlgorithmResult } from '@/services/api/solve/types'

interface AlgorithmResultCardProps {
  title: string
  result: AlgorithmResult
  instance: CVRPInstance
  accentColor: 'emerald' | 'sky'
}

export const AlgorithmResultCard = ({
  title,
  result,
  instance,
  accentColor,
}: AlgorithmResultCardProps) => {
  const colorClasses = {
    emerald: {
      light: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/40',
    },
    sky: {
      light: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
      bg: 'bg-sky-950/40',
    },
  }

  const colors = colorClasses[accentColor]

  return (
    <Card className="relative overflow-hidden border-slate-700/50 bg-slate-800/80">
      <div
        className={`absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full ${colors.light} blur-xl`}
      />
      <CardHeader className="relative">
        <CardTitle className="text-lg text-slate-50">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>Initial Fitness</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.initial_fitness.toFixed(2)}
            </div>
          </div>
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>Final Cost</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.final_solution.total_cost.toFixed(2)}
            </div>
          </div>
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>Vehicles Used</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.final_solution.routes.length}
            </div>
          </div>
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>Total Time (s)</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.computation_time.toFixed(2)}
            </div>
          </div>
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>Pop. Gen Time (s)</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.population_generation_time.toFixed(2)}
            </div>
          </div>
          <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
            <div className={`text-xs font-medium ${colors.text}`}>GA Time (s)</div>
            <div className="text-md mt-1 font-bold text-slate-50">
              {result.ga_convergence_time.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h5 className="mb-3 text-sm font-semibold text-slate-300">Route Visualization</h5>
          <RouteVisualization instance={instance} solution={result.final_solution} />
        </div>

        {/* Routes List */}
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-slate-300">Routes Detail</h5>
          <div className="max-h-[195px] space-y-2.5 overflow-y-auto pr-2">
            {result.final_solution.routes.map((route, idx) => (
              <div
                key={idx}
                className="rounded-md bg-slate-800/40 p-3 text-xs transition-colors hover:bg-slate-800/60"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Vehicle {route.vehicle_id}</span>
                  <span className="font-medium text-violet-400">
                    Distance: {route.total_distance.toFixed(2)}
                  </span>
                </div>
                <div className="leading-relaxed text-slate-400">
                  Customers: {route.customer_sequence.join(' → ')} → Depot
                </div>
                <div className="mt-1.5 text-slate-400">Demand: {route.total_demand}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
