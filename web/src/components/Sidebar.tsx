type Props = {
  title: string
  children: React.ReactNode
}

function Sidebar({ title, children }: Props) {
  return (
    <aside className="bg-slate-800 rounded-lg shadow-lg p-6 h-fit border border-slate-700 md:sticky md:top-6">
      <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded"></div>
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </aside>
  )
}

export default Sidebar
