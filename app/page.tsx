'use client'
import { useState } from 'react'
import { AuthProvider, useAuth } from '@/lib/auth'
import LoginPage from '@/components/LoginPage'
import AppShell from '@/components/AppShell'

function AppRouter() {
  const { user, logout } = useAuth()
  const [loggedIn, setLoggedIn] = useState(false)

  // If user logged out, reset state
  if (loggedIn && !user) {
    setLoggedIn(false)
  }

  if (!loggedIn || !user) {
    return <LoginPage onSuccess={() => setLoggedIn(true)} />
  }

  return <AppShell />
}

export default function Page() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
