import { useQuery } from '@tanstack/react-query'
import { getModels } from '@/services/api/drl'
import { IconRocket, IconTrendingUp, IconBrain, IconStar } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const modelIcons = {
  junior: IconRocket,
  mid: IconTrendingUp,
  expert: IconBrain,
}

const modelColors = {
  junior: 'bg-emerald-700',
  mid: 'bg-sky-700',
  expert: 'bg-violet-700',
}

export const ModelCard = ({ modelId }: { modelId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  })

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <div className="h-48 rounded bg-slate-200 dark:bg-slate-800" />
      </Card>
    )
  }

  const model = data?.models.find((m) => m.id === modelId)
  if (!model) return null

  const Icon = modelIcons[model.id as keyof typeof modelIcons] || IconStar
  const colorClass = modelColors[model.id as keyof typeof modelColors]

  return (
    <Card className="group flex h-full flex-col border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="flex-shrink-0">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-lg transition-transform group-hover:scale-110 ${colorClass}`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          {model.id === 'expert' && <IconStar className="h-5 w-5 flex-shrink-0 text-amber-500" />}
        </div>
        <CardTitle className="mb-2 text-base leading-tight">
          {model.name}
          <br />
          {model.subname && (
            <span className="text-sm font-normal text-slate-500 dark:text-slate-300">
              {model.subname}
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed">{model.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {model.training_specs && (
          <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Problem Size:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {model.training_specs.problem_size} customers
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Episodes:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {model.training_specs.total_episodes.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Distribution:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {model.training_specs.instance_distribution}
              </span>
            </div>
          </div>
        )}
        {model.training_summary && (
          <p className="mt-3 text-xs leading-relaxed text-slate-500 italic dark:text-slate-400">
            {model.training_summary}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
