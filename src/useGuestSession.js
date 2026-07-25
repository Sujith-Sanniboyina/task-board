import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function useGuestSession() {
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initSession() {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setUserId(session.user.id)
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signInAnonymously()

      if (error) {
        console.error('Guest sign-in failed:', error.message)
        setLoading(false)
        return
      }

      setUserId(data.user.id)
      setLoading(false)
    }

    initSession()
  }, [])

  return { userId, loading }
}