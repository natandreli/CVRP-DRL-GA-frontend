import { Card, CardContent } from '@/components/ui/card'
import { IconTrendingUp, IconClock, IconChartBar, IconRoute } from '@tabler/icons-react'
import type { ComparisonMetrics } from '@/services/api/solve/types'

interface MetricsOverviewProps {
  metrics: ComparisonMetrics
}

export const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-slate-700/50 bg-slate-800/80">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Cost Improvement</p>
              <p className="mt-1 text-2xl font-bold text-emerald-400">
                {metrics.improvement_percentage.toFixed(1)}%
              </p>
            </div>
            <IconTrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-700/50 bg-slate-800/80">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Time Difference</p>
              <p className="mt-1 text-2xl font-bold text-sky-400">
                {metrics.time_difference.toFixed(2)}s
              </p>
            </div>
            <IconClock className="h-5 w-5 text-sky-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-700/50 bg-slate-800/80">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Initial Gap</p>
              <p className="mt-1 text-2xl font-bold text-violet-400">
                {metrics.initial_gap_percentage.toFixed(1)}%
              </p>
            </div>
            <IconChartBar className="h-5 w-5 text-violet-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-700/50 bg-slate-800/80">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Vehicles Diff</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">
                {metrics.vehicles_difference}
              </p>
            </div>
            <IconRoute className="h-5 w-5 text-amber-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
