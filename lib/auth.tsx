'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'superadmin' | 'admin' | 'teknisi' | 'agen' | 'pelanggan'

export interface User {
  id: string
  name: string
  username: string
  role: Role
  avatar: string
}

// Simulated user database — in production, this would be API-driven
const USERS: Record<string, User & { password: string }> = {
  superadmin: { id: '1', name: 'Super Admin', username: 'superadmin', role: 'superadmin', avatar: 'SA', password: 'admin123' },
  admin:      { id: '2', name: 'Admin Utama',  username: 'admin',      role: 'admin',      avatar: 'AU', password: 'admin123' },
  teknisi:    { id: '3', name: 'Ahmad Teknisi',username: 'teknisi',    role: 'teknisi',    avatar: 'AT', password: 'teknisi1' },
  agen:       { id: '4', name: 'Agen Maju',    username: 'agen',       role: 'agen',       avatar: 'AM', password: 'agen1234' },
  pelanggan:  { id: '5', name: 'Budi Santoso', username: 'pelanggan',  role: 'pelanggan',  avatar: 'BS', password: 'user1234' },
}

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Super Admin',
  admin:      'Admin',
  teknisi:    'Teknisi',
  agen:       'Agen',
  pelanggan:  'Pelanggan',
}

// Role-based menu access
export const ROLE_MENUS: Record<Role, string[]> = {
  superadmin: ['dashboard','pelanggan','gangguan','billing','pembayaran','transaksi','laporan','voucher','corporate','teknisi','inventori','monitoring','wa','mikrotik','pengaturan'],
  admin:      ['dashboard','pelanggan','gangguan','billing','pembayaran','transaksi','laporan','voucher','corporate','teknisi','inventori','monitoring','wa'],
  teknisi:    ['dashboard','gangguan','monitoring'],
  agen:       ['dashboard','pelanggan','pembayaran'],
  pelanggan:  ['dashboard','billing','pembayaran'],
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function login(username: string, password: string): boolean {
    const found = USERS[username.toLowerCase()]
    if (found && found.password === password) {
      const { password: _, ...u } = found
      setUser(u)
      return true
    }
    return false
  }

  function logout() { setUser(null) }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
