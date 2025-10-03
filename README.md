# 📅 Sistema de Agendamento Web

Sistema completo de agendamento desenvolvido com React + Vite, pronto para integração com back-end em C#.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **React Router DOM** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utility-first
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de schemas
- **React Toastify** - Notificações toast
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes React

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── FormInput.jsx   # Input de formulário
│   ├── Navbar.jsx      # Barra de navegação
│   ├── Sidebar.jsx     # Menu lateral
│   ├── Layout.jsx      # Layout principal
│   └── PrivateRoute.jsx # Rota protegida
├── context/
│   └── AuthContext.jsx # Context de autenticação
├── hooks/
│   └── useAuth.js      # Hook de autenticação
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx           # Página de login
│   │   ├── Register.jsx        # Página de cadastro
│   │   └── ForgotPassword.jsx  # Recuperação de senha
│   ├── Dashboard.jsx           # Dashboard principal
│   ├── Professionals.jsx       # CRUD de profissionais
│   ├── Clients.jsx            # CRUD de clientes
│   ├── Services.jsx           # CRUD de serviços
│   ├── Schedule.jsx           # Gerenciamento de agenda
│   ├── Reports.jsx            # Relatórios
│   └── NotFound.jsx           # Página 404
├── services/
│   └── api.js          # API mockada (substituir por API real)
├── utils/
│   └── validators.js   # Validadores Yup e funções auxiliares
├── __tests__/          # Testes unitários
│   ├── setup.js
│   ├── Login.test.jsx
│   ├── Dashboard.test.jsx
│   └── Professionals.test.jsx
├── App.jsx             # Componente principal
├── main.jsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- **Node.js (versão 20.19+ ou 22.12+)** ⚠️ IMPORTANTE
- npm ou yarn

> **⚠️ ATENÇÃO:** Vite 7 requer Node.js 20+. Se você tem Node.js 18, veja o arquivo `IMPORTANT_NOTES.md` para soluções.

### Passo a Passo

1. **Clone o repositório (se aplicável)**
```bash
git clone [url-do-repositorio]
cd agenda
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse o sistema**
```
http://localhost:5173
```

## 👤 Credenciais de Teste

Para acessar o sistema, use as seguintes credenciais:

- **E-mail:** teste@teste.com
- **Senha:** 123456
- **Perfil:** Administrador

## 🎯 Funcionalidades Implementadas

### Autenticação e Autorização (US01-US05)
- ✅ Login com bloqueio após 5 tentativas inválidas
- ✅ Cadastro de usuário com validações
- ✅ Recuperação de senha (simulada)
- ✅ Sistema de perfis (Admin, Profissional, Cliente)
- ✅ Controle de permissões por perfil

### Área Interna (US04-US13)
- ✅ Dashboard com visão geral e métricas
- ✅ CRUD completo de Profissionais
- ✅ CRUD completo de Clientes
- ✅ CRUD completo de Serviços
- ✅ Visualização de Agenda (lista)
- ✅ Criar/Editar/Cancelar Agendamentos
- ✅ Horários disponíveis dinâmicos
- ✅ Notificações com toast
- ✅ Relatórios com filtros
- ✅ Exportação fake (CSV/PDF)

### Qualidade e UX (US14-US15)
- ✅ Testes unitários configurados
- ✅ Interface responsiva com Tailwind CSS
- ✅ Componentização modular
- ✅ Validações em todos os formulários
- ✅ Feedback visual para todas as ações

## 🔐 Sistema de Perfis e Permissões

### Administrador (admin)
- Acesso total ao sistema
- Gerenciar profissionais
- Gerenciar clientes
- Gerenciar serviços
- Visualizar agenda
- Visualizar relatórios

### Profissional (professional)
- Gerenciar clientes
- Visualizar agenda
- Visualizar relatórios
- Dashboard personalizado

### Cliente (client)
- Visualizar própria agenda
- Criar agendamentos
- Dashboard simplificado

## 🧪 Testes

### Executar testes
```bash
npm test
```

### Executar testes com interface
```bash
npm run test:ui
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

## 📡 API Mockada

O sistema utiliza uma camada de API mockada localizada em `src/services/api.js`. Todos os dados são armazenados no `localStorage` para simular persistência.

### Para integrar com back-end real em C#:

1. Substitua as funções em `src/services/api.js` por chamadas HTTP reais usando `fetch` ou `axios`
2. Configure a URL base da API
3. Adicione tratamento de tokens JWT se necessário
4. Atualize os tipos de retorno conforme a API real

Exemplo de como modificar:

```javascript
// De (mockado):
export const professionalsAPI = {
  getAll: async () => {
    await delay();
    return getFromStorage('professionals');
  },
};

// Para (API real):
export const professionalsAPI = {
  getAll: async () => {
    const response = await fetch('https://api.seudominio.com/professionals');
    return response.json();
  },
};
```

## 🎨 Personalização

### Cores
As cores primárias podem ser alteradas em `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize aqui
      },
    },
  },
},
```

### Layout
O layout pode ser modificado nos componentes:
- `src/components/Navbar.jsx` - Barra superior
- `src/components/Sidebar.jsx` - Menu lateral
- `src/components/Layout.jsx` - Estrutura geral

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter
- `npm test` - Executa testes
- `npm run test:ui` - Testes com interface
- `npm run test:coverage` - Testes com cobertura

## 🔄 Próximos Passos

1. **Integração com Back-end C#**
   - Substituir API mockada por chamadas HTTP reais
   - Implementar autenticação JWT
   - Configurar CORS

2. **Melhorias Futuras**
   - Implementar visualização em calendário
   - Adicionar sistema de notificações por e-mail
   - Implementar upload de fotos de perfil
   - Adicionar chat em tempo real
   - Implementar relatórios em PDF real

3. **Otimizações**
   - Implementar lazy loading de rotas
   - Adicionar cache de requisições
   - Otimizar bundle size
   - Adicionar PWA

## 🐛 Resolução de Problemas

### Porta já em uso
Se a porta 5173 estiver em uso, o Vite automaticamente tentará outra porta ou você pode especificar:
```bash
npm run dev -- --port 3000
```

### Erro de módulos
Se encontrar erros de módulos faltando:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e pode ser utilizado livremente.

## 👨‍💻 Autor

Desenvolvido com ❤️ para o projeto de Sistema de Agendamento Web

---

**Nota:** Este é um projeto de front-end com dados mockados. Para uso em produção, é necessário integrar com uma API back-end real desenvolvida em C# conforme planejado.
