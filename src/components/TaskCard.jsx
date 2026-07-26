import { Draggable } from '@hello-pangea/dnd'

function TaskCard({ task, index }) {
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
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard