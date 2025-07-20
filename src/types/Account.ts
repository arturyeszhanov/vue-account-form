export type AccountType = 'LDAP' | 'Локальная';

export interface AccountItem {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
  isValid: boolean;
}
