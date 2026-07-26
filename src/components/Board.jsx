import { DragDropContext } from '@hello-pangea/dnd'
import { COLUMNS } from '../constants'
import Column from './Column'

function Board({ tasks, onAddTask, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-6">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.id)
          return (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={columnTasks}
              onAddTask={() => onAddTask(col.id)}
            />
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default Board