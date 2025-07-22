import type { FormRules } from 'element-plus'

function labelValidator(_rule: any, value: any, callback: any) {
  if (!value) return callback()

  if (value.length > 50) {
    return callback(new Error('Метка не должна превышать 50 символов'))
  }

  return callback()
}

function typeValidator(_rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('Выберите тип записи'))
  }
  return callback()
}

function loginValidator(_rule: any, value: any, callback: any) {
  const type = (this as any)?.type

  if (!type) {
    return callback()
  }

  if (!value) {
    return callback(new Error('Введите логин'))
  }

  if (value.length > 100) {
    return callback(new Error('Логин не должен превышать 100 символов'))
  }

  return callback()
}

function passwordValidator(_rule: any, value: any, callback: any) {
  const type = (this as any)?.type

  if (!type) {
    return callback()
  }

  if (type === 'ldap') {
    return callback()
  }

  if (!value) {
    return callback(new Error('Введите пароль'))
  }

  if (value.length > 100) {
    return callback(new Error('Пароль не должен превышать 100 символов'))
  }

  return callback()
}

export const accountFormRules: FormRules = {
  label: [
    {
      validator: labelValidator,
      trigger: ['blur'],
    },
  ],
  type: [
    {
      validator: typeValidator,
      trigger: ['change'],
    },
  ],
  login: [
    {
      validator: loginValidator,
      trigger: ['blur'],
    },
  ],
  password: [
    {
      validator: passwordValidator,
      trigger: ['blur'],
    },
  ],
} 

export function validateRequiredFields(index: number) {
  const form = formRefs.value[index]
  if (!form) return

  const fieldsToValidate = ['type', 'login', 'password']
  for (const field of fieldsToValidate) {
    form.validateField(field)
  }
}