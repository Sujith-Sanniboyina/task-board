import { COLUMNS } from '../constants'

function BoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto p-6">
      {COLUMNS.map((col) => (
        <div key={col.id} className="bg-gray-100 rounded-xl p-3 w-72 flex-shrink-0 animate-pulse">
          <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
          <div className="flex flex-col gap-2">
            <div className="h-16 bg-gray-200/70 rounded-lg" />
            <div className="h-16 bg-gray-200/70 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BoardSkeleton