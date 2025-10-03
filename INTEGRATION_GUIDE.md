# 🔌 Guia de Integração com Back-end C#

Este guia explica como integrar o front-end React com a API back-end em C#.

## 📋 Pré-requisitos

- Back-end C# com API REST funcionando
- Endpoints implementados conforme especificação abaixo
- CORS configurado no back-end

## 🔗 Endpoints Esperados

### Autenticação

```
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }

POST /api/auth/register
Body: { name: string, email: string, password: string, role: string }
Response: { user: User }

POST /api/auth/forgot-password
Body: { email: string }
Response: { success: boolean, message: string }
```

### Profissionais

```
GET    /api/professionals
Response: Professional[]

GET    /api/professionals/:id
Response: Professional

POST   /api/professionals
Body: { name, email, specialty, phone }
Response: Professional

PUT    /api/professionals/:id
Body: { name, email, specialty, phone }
Response: Professional

DELETE /api/professionals/:id
Response: { success: boolean }
```

### Clientes

```
GET    /api/clients
Response: Client[]

GET    /api/clients/:id
Response: Client

POST   /api/clients
Body: { name, email, phone, cpf, birthDate }
Response: Client

PUT    /api/clients/:id
Body: { name, email, phone, cpf, birthDate }
Response: Client

DELETE /api/clients/:id
Response: { success: boolean }
```

### Serviços

```
GET    /api/services
Response: Service[]

GET    /api/services/:id
Response: Service

POST   /api/services
Body: { name, duration, price, description }
Response: Service

PUT    /api/services/:id
Body: { name, duration, price, description }
Response: Service

DELETE /api/services/:id
Response: { success: boolean }
```

### Agendamentos

```
GET    /api/appointments
Response: Appointment[]

GET    /api/appointments/:id
Response: Appointment

GET    /api/appointments/available-slots?professionalId=1&date=2025-10-10
Response: string[]

POST   /api/appointments
Body: { clientId, professionalId, serviceId, date, time, notes }
Response: Appointment

PUT    /api/appointments/:id
Body: { clientId, professionalId, serviceId, date, time, notes }
Response: Appointment

PATCH  /api/appointments/:id/cancel
Response: Appointment

DELETE /api/appointments/:id
Response: { success: boolean }
```

### Relatórios

```
GET    /api/reports/summary
Response: { totalAppointments, scheduledAppointments, ... }

GET    /api/reports/appointments?startDate=&endDate=&status=
Response: Appointment[]

POST   /api/reports/export-csv
Body: { appointments: Appointment[] }
Response: File (CSV)

POST   /api/reports/export-pdf
Body: { appointments: Appointment[] }
Response: File (PDF)
```

## 🔧 Passos para Integração

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://localhost:5001/api
VITE_ENABLE_MOCK_API=false
```

### 2. Criar Arquivo de Configuração da API

Crie `src/config/api.config.js`:

```javascript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
```

### 3. Instalar Axios (Recomendado)

```bash
npm install axios
```

### 4. Criar Cliente HTTP

Crie `src/services/httpClient.js`:

```javascript
import axios from 'axios';
import { API_CONFIG, getAuthHeader } from '../config/api.config';

const httpClient = axios.create(API_CONFIG);

// Interceptor para adicionar token em todas as requisições
httpClient.interceptors.request.use(
  (config) => {
    const authHeader = getAuthHeader();
    config.headers = { ...config.headers, ...authHeader };
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
```

### 5. Atualizar services/api.js

Substitua as funções mockadas por chamadas HTTP reais:

```javascript
import httpClient from './httpClient';

// Exemplo: Profissionais
export const professionalsAPI = {
  getAll: async () => {
    const response = await httpClient.get('/professionals');
    return response.data;
  },

  getById: async (id) => {
    const response = await httpClient.get(`/professionals/${id}`);
    return response.data;
  },

  create: async (professional) => {
    const response = await httpClient.post('/professionals', professional);
    return response.data;
  },

  update: async (id, professional) => {
    const response = await httpClient.put(`/professionals/${id}`, professional);
    return response.data;
  },

  delete: async (id) => {
    const response = await httpClient.delete(`/professionals/${id}`);
    return response.data;
  },
};

// Repita o padrão para os outros recursos...
```

### 6. Atualizar AuthContext para JWT

Modifique `src/context/AuthContext.jsx`:

```javascript
const login = async (email, password) => {
  try {
    const response = await httpClient.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Salvar token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setUser(user);
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};
```

## 🔒 Configuração de CORS no Back-end C#

No seu back-end C#, adicione:

```csharp
// Program.cs ou Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // URL do front-end
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

// ...

app.UseCors("AllowFrontend");
```

## 🧪 Testando a Integração

1. **Inicie o back-end C#**
```bash
dotnet run
```

2. **Configure as variáveis de ambiente no front-end**
```env
VITE_API_BASE_URL=https://localhost:5001/api
VITE_ENABLE_MOCK_API=false
```

3. **Inicie o front-end**
```bash
npm run dev
```

4. **Teste as funcionalidades**
- Login
- Cadastro
- CRUD de cada recurso
- Agendamentos
- Relatórios

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se o CORS está configurado corretamente no back-end
- Confirme se a URL do front-end está na whitelist

### Token não está sendo enviado
- Verifique se o token está sendo salvo no localStorage após login
- Confirme se o interceptor do axios está funcionando

### Erro 401 Unauthorized
- Verifique se o token JWT está válido
- Confirme se o token não expirou
- Verifique o formato do header Authorization

### Erro de conexão
- Confirme se o back-end está rodando
- Verifique se a URL da API está correta
- Teste o endpoint diretamente com Postman/Insomnia

## 📊 Validação de Dados

O front-end já possui validações com Yup. Certifique-se de que:

1. O back-end também valide os dados
2. Retorne mensagens de erro claras
3. Use códigos HTTP apropriados (400 para validação, 404 para não encontrado, etc.)

## 🔐 Segurança

- ✅ Nunca exponha secrets no front-end
- ✅ Use HTTPS em produção
- ✅ Implemente rate limiting no back-end
- ✅ Valide dados tanto no front quanto no back
- ✅ Use tokens JWT com expiração
- ✅ Implemente refresh tokens

## 📝 Checklist de Integração

- [ ] Back-end C# funcionando
- [ ] CORS configurado
- [ ] Endpoints criados conforme especificação
- [ ] Variáveis de ambiente configuradas
- [ ] Axios instalado
- [ ] HttpClient criado
- [ ] services/api.js atualizado
- [ ] AuthContext atualizado para JWT
- [ ] Testes de integração realizados
- [ ] Tratamento de erros implementado
- [ ] Loading states adicionados
- [ ] Mensagens de erro do back-end exibidas

## 🎉 Conclusão

Após seguir todos os passos, seu front-end React estará totalmente integrado com o back-end C#. 

Para qualquer dúvida, consulte a documentação do back-end ou entre em contato com o time de desenvolvimento.

