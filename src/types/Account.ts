// export type AccountType = 'LDAP' | 'Локальная';

// export interface AccountItem {
//   id: string;
//   labels: { text: string }[];
//   type: AccountType;
//   login: string;
//   password: string | null;
//   isValid: boolean;
// }
// src/types/Account.ts

export interface Account {
    id: number
    label: string
    type: 'local' | 'ldap' | ''
    login: string
    password: string | null
  }
  