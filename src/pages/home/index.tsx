import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getModels } from '@/services/api/drl'
import { ModelCard } from '@/components/features/model-card'
import { Button } from '@/components/ui/button'
import { IconChartBar, IconDatabase, IconUpload, IconSparkles } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const HomePage = () => {
  const { data: modelsData } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  })

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="py-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
          <IconSparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          Hybrid Learnheuristics: DRL + GA
        </div>
        <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-100">
          CVRP NeuroGen Solver
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Solve the Capacitated Vehicle Routing Problem by combining Deep Reinforcement Learning
          with Genetic Algorithms to obtain optimal solutions in less time.
        </p>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card className="group relative flex flex-col overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-sky-500/10 blur-xl" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-sky-700 shadow-lg transition-transform group-hover:scale-110">
                <IconChartBar className="h-5 w-5 text-sky-50" />
              </div>
              <CardTitle className="text-base text-slate-50">New Comparison</CardTitle>
              <CardDescription className="text-sm text-slate-400">
                Run a comparison between pure GA and DRL+GA
              </CardDescription>
            </CardHeader>
            <CardContent className="relative mt-auto">
              <Link to="/comparison">
                <Button variant="alt" className="w-full">
                  Start Comparison
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative flex flex-col overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-emerald-500/10 blur-xl" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg transition-transform group-hover:scale-110">
                <IconDatabase className="h-5 w-5 text-emerald-50" />
              </div>
              <CardTitle className="text-base text-slate-50">Generate Instance</CardTitle>
              <CardDescription className="text-sm text-slate-400">
                Create a personalized CVRP instance
              </CardDescription>
            </CardHeader>
            <CardContent className="relative mt-auto">
              <Link to="/instances?action=generate">
                <Button variant="alt" className="w-full">
                  Generate New
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative flex flex-col overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-violet-500/10 blur-xl" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-700 shadow-lg transition-transform group-hover:scale-110">
                <IconUpload className="h-5 w-5 text-violet-50" />
              </div>
              <CardTitle className="text-base text-slate-50">Load Benchmark</CardTitle>
              <CardDescription className="text-sm text-slate-400">
                Upload an instance from file
              </CardDescription>
            </CardHeader>
            <CardContent className="relative mt-auto">
              <Link to="/instances?action=upload">
                <Button variant="alt" className="w-full">
                  Upload File
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* DRL Models */}
      <section>
        <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Available DRL Models
        </h2>
        <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">
          Three levels of trained agents for different problem scales
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {modelsData?.models.map((model) => (
            <ModelCard key={model.id} modelId={model.id} />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="mt-8">
        <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
          How does NeuroGen work?
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card className="group relative overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-xl" />
            <CardContent className="relative p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-800/50 bg-emerald-950/40 text-emerald-400 transition-transform group-hover:scale-110">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="mb-3 text-base font-semibold text-slate-50">
                Intelligent Initialization (Solving the Cold Start)
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                Traditional Genetic Algorithms often struggle with a "Cold Start," wasting
                computational resources evolving from a random, low-quality initial population.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                NeuroGen leverages Deep Reinforcement Learning to generate high-quality initial
                solutions, providing a strong starting point for the Genetic Algorithm.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-sky-500/10 blur-xl" />
            <CardContent className="relative p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-sky-800/50 bg-sky-950/40 text-sky-400 transition-transform group-hover:scale-110">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="mb-3 text-base font-semibold text-slate-50">
                Evolutionary Refinement
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                The Genetic Algorithm takes this elite population and focuses on refinement rather
                than exploration. using operators like Order Crossover (OX) and mutation techniques
                (Swap, Inversion), the GA fine-tunes the solutions to escape local optima that the
                neural network might have missed, ensuring convergence to a superior global
                solution.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-slate-700/50 bg-slate-800/80 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-violet-500/10 blur-xl" />
            <CardContent className="relative p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-violet-800/50 bg-violet-950/40 text-violet-400 transition-transform group-hover:scale-110">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="mb-3 text-base font-semibold text-slate-50">
                Synergistic Optimization
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                By combining DRL and GA, NeuroGen harnesses the strengths of both approaches. The
                DRL model provides rapid, high-quality solutions, while the GA ensures thorough
                exploration and optimization, leading to faster convergence and better overall
                results compared to using either method alone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
