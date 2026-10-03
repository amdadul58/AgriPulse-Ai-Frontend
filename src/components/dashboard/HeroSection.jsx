import { motion } from 'framer-motion'
import { Sparkles, Cloud, Calendar } from 'lucide-react'

const HeroSection = ({ userName, farmCount }) => {
  const weather = '🌤️ 32°C'
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-8 text-white shadow-xl">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1"><Sparkles size={20} className="text-yellow-300" /><span className="text-sm font-medium text-green-100">Welcome back!</span></div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{userName}</h1>
          <p className="text-green-100 mt-1 text-sm">You have <span className="font-semibold text-white">{farmCount}</span> farms under management</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10"><Cloud size={18} /><span className="text-sm">{weather}</span></div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10"><Calendar size={18} /><span className="text-sm">{date}</span></div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection