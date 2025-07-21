export interface Account {
  id: number
  label: string
  type: 'local' | 'ldap' | null
  login: string
  password: string | null
  dirty: boolean
}

export interface NewAccount {
  label: string
  type: 'local' | 'ldap' | null
  login: string
  password?: string | null
  dirty: boolean
}

  