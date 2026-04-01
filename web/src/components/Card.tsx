type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

function Card({ title, subtitle, children }: Props) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <div className="border-b border-slate-700 px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default Card
