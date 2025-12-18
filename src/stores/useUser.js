import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../utils/api";

const userStore = (set, get) => ({
  user: {
    _id: '',
    name: '',
    email: ''
  },

  setUser: (user) => {
    set({
      user: user
    })
  },

  refresh: false,

  // Get User
  loadUser: async () => {
    try {
      const res = await api.get('/api/user')
      const { user } = res.data

      set({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
    }
    catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  },

  // Update User
  updateUser: async (updatedData) => {
    try {
      const res = await api.put('/api/user', updatedData)
      const { message } = res.data
      toast.success(message)

      set(s => ({ refresh: !s.refresh }))
    }
    catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  },

  // Delete User
  deleteUser: async (navigate) => {
    try {
      const res = await api.delete('/api/user')
      const { message } = res.data
      toast.success(message)

      //Clearing the Data...
      get().setUser({
        _id: null, name: null, email: null
      })
      navigate('/logout')
    }
    catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }
})

const useUser = create(userStore)
export default useUser