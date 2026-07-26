function BoardStats({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'done').length
  const overdue = tasks.filter((t) => {
    if (!t.due_date || t.status === 'done') return false
    const due = new Date(t.due_date + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return due < today
  }).length

  const stats = [
    { label: 'Total', value: total, style: 'text-gray-700' },
    { label: 'Completed', value: completed, style: 'text-emerald-600' },
    { label: 'Overdue', value: overdue, style: 'text-red-600' },
  ]

  return (
    <div className="flex gap-4 px-6 pt-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex-1">
          <p className="text-xs text-gray-400">{s.label}</p>
          <p className={`text-lg font-semibold ${s.style}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}

export default BoardStats