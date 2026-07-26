function BoardFilters({ search, onSearchChange, priorityFilter, onPriorityChange }) {
  return (
    <div className="flex gap-3 px-6 pt-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="flex-1 max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}

export default BoardFilters