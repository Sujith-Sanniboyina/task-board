import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function useTasks(userId) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    async function fetchTasks() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setTasks(data)
      }

      setLoading(false)
    }

    fetchTasks()
  }, [userId])

  async function insertTask(newTask) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(newTask)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    setTasks((prev) => [...prev, data])
    return { data }
  }

  async function updateTaskStatus(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    )

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)

    if (error) {
      console.error('Failed to update task status:', error.message)
      return { error: error.message }
    }

    return { success: true }
  }

  return { tasks, loading, error, setTasks, insertTask, updateTaskStatus }
}