import { Draggable } from '@hello-pangea/dnd'

const PRIORITY_STYLES = {
  low: 'bg-gray-100 text-gray-500',
  normal: 'bg-blue-100 text-blue-600',
  high: 'bg-red-100 text-red-600',
}

function formatDueDate(dueDate) {
  if (!dueDate) return null
  const date = new Date(dueDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24))

  const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  if (diffDays < 0) return { label: `${label} (overdue)`, style: 'bg-red-50 text-red-600' }
  if (diffDays === 0) return { label: `${label} (today)`, style: 'bg-amber-50 text-amber-600' }
  if (diffDays <= 2) return { label, style: 'bg-amber-50 text-amber-600' }
  return { label, style: 'bg-gray-50 text-gray-500' }
}

function TaskCard({ task, index }) {
  const due = formatDueDate(task.due_date)

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-grab ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-300' : ''
          }`}
        >
          <p className="text-sm font-medium text-gray-800">{task.title}</p>

          {task.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          )}

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${PRIORITY_STYLES[task.priority]}`}>
              {task.priority}
            </span>
            {due && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${due.style}`}>
                {due.label}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard