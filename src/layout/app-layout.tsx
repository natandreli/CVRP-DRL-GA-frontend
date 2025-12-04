import { Outlet } from 'react-router-dom'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'

import { AnimatedBackground } from '@/components/ui/animated-background'

export const AppLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 container mx-auto max-w-6xl flex-1 px-6 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
