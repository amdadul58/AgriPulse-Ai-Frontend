const QuickActions = () => {
  const actions = [
    { icon: '🌱', label: 'Add Farm' },
    { icon: '🤖', label: 'AI Chat' },
    { icon: '📸', label: 'Detect Disease' },
    { icon: '🌾', label: 'Recommendation' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((item, idx) => (
        <button key={idx} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:border-green-300 transition-all duration-200">
          <div className="text-2xl">{item.icon}</div>
          <p className="text-sm font-medium text-gray-700 mt-1">{item.label}</p>
        </button>
      ))}
    </div>
  )
}

export default QuickActions