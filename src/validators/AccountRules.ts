import type { Account } from '@/types'

export const accountRules = {
  login: [
    { required: true, message: 'Логин обязателен', trigger: 'blur' },
    { max: 100, message: 'Максимум 100 символов', trigger: 'blur' }
  ],
  type: [
    {
      validator: (_rule, value, callback) => {
        if (!['local', 'ldap'].includes(value)) {
          return callback(new Error('Тип записи обязателен'))
        }
        return callback()
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (_rule, value, callback, source) => {
        const account = source as Account
        const trimmed = (value || '').trim()

        if (account.type === 'local') {
          if (trimmed === '') {
            return callback(new Error('Пароль обязателен'))
          }
          if (trimmed.length > 100) {
            return callback(new Error('Максимум 100 символов'))
          }
        }

        return callback()
      },
      trigger: 'blur'
    }
  ]
}
