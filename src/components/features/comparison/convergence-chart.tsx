import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ConvergenceData {
  generation: number
  fitness: number
}

interface ConvergenceChartProps {
  data: ConvergenceData[]
  algorithmName: string
  color: string
  yDomain?: [number, number]
}

export const ConvergenceChart = ({
  data,
  algorithmName,
  color,
  yDomain,
}: ConvergenceChartProps) => {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
      <h5 className="mb-3 text-sm font-semibold text-slate-300">{algorithmName} - Convergence</h5>
      <div
        style={{ outline: 'none' }}
        className="[&_*]:!outline-none [&_*:focus]:!outline-none [&_svg]:!outline-none"
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 25, right: 40, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="generation"
              stroke="#94a3b8"
              fontSize={12}
              label={{
                value: 'Generation',
                position: 'insideBottom',
                offset: -15,
                fill: '#94a3b8',
              }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              label={{
                value: 'Fitness',
                angle: -90,
                position: 'insideLeft',
                offset: 5,
                fill: '#94a3b8',
              }}
              domain={yDomain}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
              }}
              labelStyle={{ color: '#94a3b8' }}
              labelFormatter={(value) => `Generation: ${value}`}
              formatter={(value: number) => [`${value.toFixed(2)}`, 'Fitness']}
              cursor={{ stroke: '#64748b', strokeWidth: 1 }}
              wrapperStyle={{ outline: 'none', border: 'none' }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                color: '#94a3b8',
                paddingBottom: '10px',
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
            <Line
              type="monotone"
              dataKey="fitness"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              name="Fitness"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
