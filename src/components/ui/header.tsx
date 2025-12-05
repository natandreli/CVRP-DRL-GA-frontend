import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconRoute,
  IconDatabase,
  IconChartBar,
  IconHome,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { checkApiHealth } from '@/services/api'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { data: apiStatus, isError } = useQuery({
    queryKey: ['api-health'],
    queryFn: checkApiHealth,
    refetchInterval: 30000,
    retry: 1,
  })

  const isApiHealthy = !isError && apiStatus !== undefined

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="container mx-auto px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-800 dark:bg-slate-700">
              <IconRoute className="h-4 w-4 text-slate-100" strokeWidth={2} />
            </div>
            <div>
              <span className="text-lg font-semibold text-slate-900 md:text-2xl dark:text-slate-100">
                CVRP NeuroGen
              </span>
              <p className="hidden text-xs text-slate-500 md:block dark:text-slate-400">
                DRL+GA Hybrid Solver
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 md:hidden dark:border-slate-800">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <IconHome className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/comparison"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <IconChartBar className="h-5 w-5" />
              Comparison
            </Link>
            <Link
              to="/instances"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <IconDatabase className="h-5 w-5" />
              Instances
            </Link>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
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
        )}
      </div>
    </header>
  )
}
