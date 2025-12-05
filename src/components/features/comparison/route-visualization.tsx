import { useState, useRef, useEffect } from 'react'
import { IconZoomIn, IconZoomOut, IconZoomReset } from '@tabler/icons-react'
import type { CVRPInstance } from '@/services/api/instances/types'
import type { Solution } from '@/services/types'

interface RouteVisualizationProps {
  instance: CVRPInstance
  solution: Solution
}

export const RouteVisualization = ({ instance, solution }: RouteVisualizationProps) => {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const width = 400
  const height = 300
  const padding = 30

  const allLocations = [instance.depot, ...instance.customers.map((c) => c.location)]
  const minX = Math.min(...allLocations.map((l) => l.x))
  const maxX = Math.max(...allLocations.map((l) => l.x))
  const minY = Math.min(...allLocations.map((l) => l.y))
  const maxY = Math.max(...allLocations.map((l) => l.y))

  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 2 * padding) + padding
  const scaleY = (y: number) => ((y - minY) / (maxY - minY)) * (height - 2 * padding) + padding

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 1.1 : 0.9
      setZoom((prev) => Math.max(0.5, Math.min(5, prev * delta)))
    }

    container.addEventListener('wheel', handleWheelEvent, { passive: false })
    return () => container.removeEventListener('wheel', handleWheelEvent)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(5, prev * 1.2))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev / 1.2))
  const handleZoomReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const colors = [
    '#10b981',
    '#3b82f6',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#f97316',
  ]

  return (
    <div className="relative">
      {/* Zoom Controls */}
      <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-1 rounded-lg bg-slate-800/90 p-1.5 shadow-lg">
        <button
          onClick={handleZoomIn}
          className="rounded p-1.5 text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
          title="Zoom In"
        >
          <IconZoomIn size={18} />
        </button>
        <button
          onClick={handleZoomOut}
          className="rounded p-1.5 text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
          title="Zoom Out"
        >
          <IconZoomOut size={18} />
        </button>
        <button
          onClick={handleZoomReset}
          className="rounded p-1.5 text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
          title="Reset"
        >
          <IconZoomReset size={18} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden rounded"
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} transform-origin="center">
            {/* Routes */}
            {solution.routes.map((route, routeIdx) => {
              const color = colors[routeIdx % colors.length]
              const depotX = scaleX(instance.depot.x)
              const depotY = scaleY(instance.depot.y)

              return (
                <g key={routeIdx}>
                  {/* Lines from depot to first customer and back */}
                  {route.customer_sequence.map((custId, idx) => {
                    const customer = instance.customers.find((c) => c.id === custId)
                    if (!customer) return null

                    const x = scaleX(customer.location.x)
                    const y = scaleY(customer.location.y)

                    if (idx === 0) {
                      return (
                        <line
                          key={`start-${custId}`}
                          x1={depotX}
                          y1={depotY}
                          x2={x}
                          y2={y}
                          stroke={color}
                          strokeWidth="1.5"
                          strokeOpacity="0.6"
                        />
                      )
                    } else {
                      const prevCustId = route.customer_sequence[idx - 1]
                      const prevCustomer = instance.customers.find((c) => c.id === prevCustId)
                      if (!prevCustomer) return null

                      const prevX = scaleX(prevCustomer.location.x)
                      const prevY = scaleY(prevCustomer.location.y)

                      return (
                        <line
                          key={`line-${custId}`}
                          x1={prevX}
                          y1={prevY}
                          x2={x}
                          y2={y}
                          stroke={color}
                          strokeWidth="1.5"
                          strokeOpacity="0.6"
                        />
                      )
                    }
                  })}
                  {/* Line from last customer back to depot */}
                  {route.customer_sequence.length > 0 &&
                    (() => {
                      const lastCustId = route.customer_sequence[route.customer_sequence.length - 1]
                      const lastCustomer = instance.customers.find((c) => c.id === lastCustId)
                      if (!lastCustomer) return null

                      const x = scaleX(lastCustomer.location.x)
                      const y = scaleY(lastCustomer.location.y)

                      return (
                        <line
                          key={`end-${lastCustId}`}
                          x1={x}
                          y1={y}
                          x2={depotX}
                          y2={depotY}
                          stroke={color}
                          strokeWidth="1.5"
                          strokeOpacity="0.6"
                        />
                      )
                    })()}
                </g>
              )
            })}

            {/* Customers */}
            {instance.customers.map((customer) => {
              const x = scaleX(customer.location.x)
              const y = scaleY(customer.location.y)
              return (
                <g key={customer.id}>
                  <circle cx={x} cy={y} r="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                  <text
                    x={x}
                    y={y - 8}
                    fontSize="8"
                    fill="#cbd5e1"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {customer.id}
                  </text>
                </g>
              )
            })}

            {/* Depot */}
            <g>
              <circle
                cx={scaleX(instance.depot.x)}
                cy={scaleY(instance.depot.y)}
                r="6"
                fill="#ef4444"
                stroke="#fca5a5"
                strokeWidth="2"
              />
              <text
                x={scaleX(instance.depot.x)}
                y={scaleY(instance.depot.y) - 12}
                fontSize="9"
                fill="#fca5a5"
                textAnchor="middle"
                fontWeight="bold"
              >
                DEPOT
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
