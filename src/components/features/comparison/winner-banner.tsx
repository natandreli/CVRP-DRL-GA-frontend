import { Card, CardContent } from '@/components/ui/card'
import { IconTrophy } from '@tabler/icons-react'
import type { ComparisonMetrics } from '@/services/api/solve/types'

interface WinnerBannerProps {
  metrics: ComparisonMetrics
}

export const WinnerBanner = ({ metrics }: WinnerBannerProps) => {
  return (
    <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-slate-800/80">
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-amber-500/20 blur-2xl" />
      <CardContent className="relative flex items-center gap-4 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
          <IconTrophy className="h-8 w-8 text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-amber-50">
            Winner: {metrics.winner == 'neurogen' ? 'NeuroGen (DRL+GA)' : 'Pure GA'}
          </h3>
          <p className="text-sm text-amber-200/80">
            {metrics.improvement_percentage.toFixed(2)}% better than{' '}
            {metrics.winner == 'neurogen' ? 'Pure GA' : 'NeuroGen (DRL+GA)'}.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
