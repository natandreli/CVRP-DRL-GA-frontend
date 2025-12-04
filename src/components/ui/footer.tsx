export const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-slate-200/50 bg-white/80 px-12 py-6 backdrop-blur-lg dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="flex items-center justify-center text-sm text-slate-600 dark:text-slate-400">
        <p>CVRP NeuroGen © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
