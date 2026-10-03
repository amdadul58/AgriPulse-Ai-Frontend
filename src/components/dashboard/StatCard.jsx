import { motion } from 'framer-motion'

const StatCard = ({ icon, label, value, color = 'green' }) => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className={`w-11 h-11 rounded-xl ${colors[color]} flex items-center justify-center`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-800 mt-3">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  )
}

export default StatCard