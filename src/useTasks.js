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

  return { tasks, loading, error, setTasks }
}