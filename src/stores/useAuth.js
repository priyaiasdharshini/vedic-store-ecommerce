import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { jwtDecode } from "jwt-decode";

import useUser from './useUser'

const authStore = persist((set, get) => ({
  isAuthorized: false,

  signUp: async (userData, navigate) => {
    try {
      const res = await api.post('/api/signup', userData)
      toast.success(res.data.message)
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  },

  login: async (loginData, navigate) => {
    try {
      const res = await api.post('/api/login', loginData)
      const { message, access, refresh } = res.data

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)

      set({ isAuthorized: true })

      const { loadUser } = useUser.getState()
      await loadUser()

      toast.success(message)
      navigate('/home')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('access')
    if (!token) {
      set({ isAuthorized: false })
      return
    }

    try {
      const decoded = jwtDecode(token)
      const now = Date.now() / 1000

      if (decoded.exp < now) {
        await get().refreshToken()
      } else {
        set({ isAuthorized: true })
      }
    } catch (err) {
      set({ isAuthorized: false })
      toast.error(`Auth error: ${err.message}`)
    }
  },

  refreshToken: async () => {
    const refresh = localStorage.getItem('refresh')
    if (!refresh) {
      set({ isAuthorized: false })
      return
    }

    try {
      const res = await api.post('/api/refresh/', { refreshToken: refresh })
      const { access } = res.data

      localStorage.setItem('access', access)

      api.defaults.headers.common['Authorization'] = `Bearer ${access}`

      set({ isAuthorized: true })
      return access
    } catch (error) {
      set({ isAuthorized: false })
      toast.error(`Auth error: ${error.message}`)
    }
  },
})
  ,
  {
    name: 'auth-store', // persists Zustand state in localStorage
  }
)

const useAuth = create(authStore)

export default useAuth