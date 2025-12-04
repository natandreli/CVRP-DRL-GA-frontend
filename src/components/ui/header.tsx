import { Link } from 'react-router-dom'
import { IconRoute, IconDatabase, IconChartBar, IconHome } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { checkApiHealth } from '@/services/api'

export const Header = () => {
  const { data: apiStatus, isError } = useQuery({
    queryKey: ['api-health'],
    queryFn: checkApiHealth,
    refetchInterval: 30000,
    retry: 1,
  })

  const isApiHealthy = !isError && apiStatus !== undefined

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-800 dark:bg-slate-700">
              <IconRoute className="h-4 w-4 text-slate-100" strokeWidth={2} />
            </div>
            <div>
              <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                CVRP NeuroGen
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">DRL + GA Hybrid Solver</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              <IconHome className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/comparison"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              <IconChartBar className="h-5 w-5" />
              Comparison
            </Link>
            <Link
              to="/instances"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              <IconDatabase className="h-5 w-5" />
              Instances
            </Link>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
              <div
                className={`h-2 w-2 rounded-full ${
                  isApiHealthy
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : 'bg-amber-500 dark:bg-amber-400'
                }`}
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {isApiHealthy ? 'API Connected' : 'API Offline'}
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
