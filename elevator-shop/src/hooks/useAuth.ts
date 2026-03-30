import { useState, useEffect, useCallback } from 'react'
import { login as loginApi, logout as logoutApi, getUserInfo } from '../api'

interface User {
  name: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoggedIn(false)
      setLoading(false)
      return
    }

    try {
      const userInfo = await getUserInfo()
      setUser(userInfo)
      setIsLoggedIn(true)
    } catch (e) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await loginApi({ email, password })
      if (res.token || res.success) {
        await checkAuth()
        return true
      }
      return false
    } catch (e) {
      console.error('Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }, [checkAuth])

  const logout = useCallback(async () => {
    await logoutApi()
    setUser(null)
    setIsLoggedIn(false)
  }, [])

  return { user, loading, isLoggedIn, login, logout, checkAuth }
}
