import TaskCard from './TaskCard'

function Column({ title, tasks }) {
  return (
    <div className="bg-gray-100 rounded-xl p-3 w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <span className="text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-h-[100px]">
        {tasks.length === 0 ? (
          <div className="text-xs text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-lg">
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}

export default Column