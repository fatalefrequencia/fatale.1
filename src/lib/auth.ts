import { User } from './types'
import { endpoints } from '@/config/api'

export const signUp = async (email: string, password: string): Promise<User> => {
  const response = await fetch(endpoints.auth.signUp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Failed to sign up')
  }

  return response.json()
}

export const signIn = async (email: string, password: string): Promise<User> => {
  const response = await fetch(endpoints.auth.signIn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Failed to sign in')
  }

  return response.json()
}

export const signOut = async (): Promise<void> => {
  const response = await fetch(endpoints.auth.signOut, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to sign out')
  }
}

export const onAuthChange = (callback: (user: User | null) => void) => {
  // For now, we'll check auth status on page load and after auth operations
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(endpoints.user.profile, {
        credentials: 'include',
      })
      
      if (response.ok) {
        const user = await response.json()
        callback(user)
      } else {
        callback(null)
      }
    } catch (error) {
      callback(null)
    }
  }

  // Check initial auth status
  checkAuthStatus()

  // Return cleanup function
  return () => {
    // Cleanup if needed
  }
}