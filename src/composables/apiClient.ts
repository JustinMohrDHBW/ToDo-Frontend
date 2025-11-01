import { client } from '@/api/client.gen'
import { useAuthStore } from '@/stores/authStore'
import type { Client } from '@/api/client'

export const updateClientAuthToken = () => {
  const authStore = useAuthStore()
  
  // Setup auth token as Authorization header in client configuration
  client.setConfig({
    headers: {
      Authorization: `Bearer ${authStore.accessToken || ''}`
    }
  })
}

export const initializeAuthenticatedClient = () => {
  updateClientAuthToken()
}

export const getAuthenticatedClient = (): Client => {
  return client
}

