import type { Account } from '@/types'

export const accountRules = {
    login: [
        { required: true, message: 'Поле обязательно', trigger: 'blur' },
        { max: 100, message: 'Максимум 100 символов', trigger: 'blur' }
      ],
      password: [
        {
          validator: (_rule, value, callback, source) => {
            const trimmed = (value || '').trim()
            const account = source as Partial<Account>
      
            if (account.type === 'local') {
              if (!value || trimmed === '') {
                return callback(new Error('Поле обязательно"'))
              }
      
              if (trimmed.length > 5) {
                return callback(new Error('Максимум 5 символов'))
              }
            }
            
            return callback()
          },
          trigger: 'blur'
        }
      ],
      type: [
      {
          validator: (_rule, value, callback) => {
          if (value !== 'local' && value !== 'ldap') {
              return callback(new Error('Тип записи обязателен'))
          }
          return callback()
          },
          trigger: 'blur'
      }
      ]
}
