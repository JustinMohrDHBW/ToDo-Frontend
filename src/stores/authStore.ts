import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from '@/composables/supabase'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import { updateClientAuthToken } from '@/composables/apiClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const error = ref<string | null>(null)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const accessToken = computed(() => session.value?.access_token || null)

  // Initialize auth state from current session
  const initializeAuth = async () => {
    try {
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      session.value = currentSession
      user.value = currentSession?.user ?? null
    } catch (err) {
      error.value = (err as AuthError).message
      console.error('Error initializing auth:', err)
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      error.value = null
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      session.value = data.session
      user.value = data.user
      
      // Update client with new token
      updateClientAuthToken()

      return { success: true, data }
    } catch (err) {
      error.value = (err as AuthError).message
      console.error('Error signing in:', err)
      return { success: false, error: (err as AuthError).message }
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      error.value = null
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      })

      if (signUpError) throw signUpError

  session.value = data.session
  user.value = data.user
  
  // Update client with new token
  updateClientAuthToken()

  return { success: true, data }
} catch (err) {
  error.value = (err as AuthError).message
  console.error('Error signing up:', err)
  return { success: false, error: (err as AuthError).message }
}
}

  // Sign out
  const signOut = async () => {
    try {
      error.value = null
      
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) throw signOutError

  session.value = null
  user.value = null
  
  // Clear auth token from client
  updateClientAuthToken()

  return { success: true }
} catch (err) {
  error.value = (err as AuthError).message
  console.error('Error signing out:', err)
  return { success: false, error: (err as AuthError).message }
}
}

  // Listen to auth state changes
  const setupAuthListener = () => {
    supabase.auth.onAuthStateChange((event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
      
      // Update client with new token
      updateClientAuthToken()
      
      console.log('Auth state changed:', event)
    })
  }

  const clearError = () => {
    error.value = null
  }

  return {

    user,
    session,
    error,    
    isAuthenticated,
    accessToken,
    
    initializeAuth,
    signIn,
    signUp,
    signOut,
    setupAuthListener,
    clearError
  }
})

