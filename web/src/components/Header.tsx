type Props = {
  title: string
  subtitle?: string
}

function Header({ title, subtitle }: Props) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-700 py-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-slate-300 mt-2">{subtitle}</p>}
      </div>
    </header>
  )
}

export default Header
