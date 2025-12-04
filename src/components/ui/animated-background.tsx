export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient orbs */}
      <div className="animate-blob absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-purple-700 dark:opacity-10" />
      <div className="animation-delay-2000 animate-blob absolute -top-32 -right-32 h-96 w-96 rounded-full bg-yellow-300 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-yellow-700 dark:opacity-10" />
      <div className="animation-delay-4000 animate-blob absolute -bottom-32 left-1/2 h-96 w-96 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-pink-700 dark:opacity-10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)]" />
    </div>
  )
}
