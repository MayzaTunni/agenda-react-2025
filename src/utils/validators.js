import * as yup from 'yup';

// ==================== VALIDADORES DE AUTENTICAÇÃO ====================

export const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup
    .string()
    .matches(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido. Use o formato (11) 98765-4321'
    )
    .required('Telefone é obrigatório'),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'CPF inválido. Use o formato 123.456.789-00'
    )
    .required('CPF é obrigatório'),
  birthDate: yup
    .date()
    .max(new Date(), 'Data de nascimento não pode ser futura')
    .required('Data de nascimento é obrigatória'),
  password: yup
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letras maiúsculas, minúsculas e números'
    )
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

// ==================== VALIDADORES DE PROFISSIONAIS ====================

export const professionalSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  specialty: yup
    .string()
    .min(3, 'Especialidade deve ter no mínimo 3 caracteres')
    .required('Especialidade é obrigatória'),
  phone: yup
    .string()
    .matches(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido. Use o formato (11) 98765-4321'
    )
    .required('Telefone é obrigatório'),
});

// ==================== VALIDADORES DE CLIENTES ====================

export const clientSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup
    .string()
    .matches(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido. Use o formato (11) 98765-4321'
    )
    .required('Telefone é obrigatório'),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      'CPF inválido. Use o formato 123.456.789-00'
    )
    .required('CPF é obrigatório'),
  birthDate: yup
    .date()
    .max(new Date(), 'Data de nascimento não pode ser futura')
    .required('Data de nascimento é obrigatória'),
});

// ==================== VALIDADORES DE SERVIÇOS ====================

export const serviceSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  duration: yup
    .number()
    .positive('Duração deve ser positiva')
    .integer('Duração deve ser um número inteiro')
    .min(5, 'Duração mínima é 5 minutos')
    .max(480, 'Duração máxima é 8 horas (480 minutos)')
    .required('Duração é obrigatória'),
  price: yup
    .number()
    .positive('Preço deve ser positivo')
    .min(0.01, 'Preço mínimo é R$ 0,01')
    .required('Preço é obrigatório'),
  description: yup
    .string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
});

// ==================== VALIDADORES DE AGENDAMENTOS ====================

export const appointmentSchema = yup.object().shape({
  clientId: yup
    .number()
    .positive('Cliente é obrigatório')
    .required('Cliente é obrigatório'),
  professionalId: yup
    .number()
    .positive('Profissional é obrigatório')
    .required('Profissional é obrigatório'),
  serviceId: yup
    .number()
    .positive('Serviço é obrigatório')
    .required('Serviço é obrigatório'),
  date: yup
    .date()
    .min(new Date(), 'Data não pode ser no passado')
    .required('Data é obrigatória'),
  time: yup
    .string()
    .matches(/^\d{2}:\d{2}$/, 'Horário inválido. Use o formato HH:MM')
    .required('Horário é obrigatório'),
  notes: yup
    .string()
    .max(500, 'Observações devem ter no máximo 500 caracteres'),
});

// ==================== VALIDADORES DE RELATÓRIOS ====================

export const reportFilterSchema = yup.object().shape({
  startDate: yup.date().required('Data inicial é obrigatória'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'Data final deve ser maior que a data inicial')
    .required('Data final é obrigatória'),
  status: yup
    .string()
    .oneOf(['all', 'scheduled', 'completed', 'cancelled'], 'Status inválido'),
});

// ==================== FUNÇÕES AUXILIARES ====================

export const formatPhone = (value) => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 0) {
    return '';
  } else if (numbers.length <= 2) {
    return `(${numbers}`;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

export const formatCPF = (value) => {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
  } else if (numbers.length <= 9) {
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  } else {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
};
