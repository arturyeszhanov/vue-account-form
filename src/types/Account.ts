export interface Account {
  id: string
  label: string
  type: 'local' | 'ldap' | null
  login: string
  password: string | null
  dirty: boolean
}

  