import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

function Column({ id, title, tasks, onAddTask }) {
  return (
    <div className="bg-gray-100 rounded-xl p-3 w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <span className="text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 min-h-[100px] rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver ? (
              <div className="text-xs text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-lg">
                No tasks yet
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={onAddTask}
        className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg py-2 transition-colors"
      >
        + Add task
      </button>
    </div>
  )
}

export default Column