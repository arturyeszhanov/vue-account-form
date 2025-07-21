export interface Account {
  id: number
  label: string
  type: 'local' | 'ldap'
  login: string
  password: string | null
}

export interface NewAccount {
  label: string
  type: 'local' | 'ldap'
  login: string
  password?: string | null
}

  