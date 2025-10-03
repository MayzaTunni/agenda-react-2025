# 🚀 Guia Rápido de Início

## 📥 Primeiros Passos

### 1. Instale as Dependências
```bash
npm install
```

### 2. Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Acesse o Sistema
Abra seu navegador em: **http://localhost:5173**

## 🔑 Login Inicial

Use estas credenciais para fazer login:

```
E-mail: teste@teste.com
Senha: 123456
Perfil: Administrador
```

## 🎯 Navegando pelo Sistema

### Como Administrador

1. **Dashboard**
   - Veja métricas gerais do sistema
   - Acesse ações rápidas

2. **Profissionais**
   - Clique em "Profissionais" no menu lateral
   - Cadastre novos profissionais com "➕ Novo Profissional"
   - Edite ou exclua profissionais existentes

3. **Clientes**
   - Acesse "Clientes" no menu
   - Cadastre clientes para fazer agendamentos
   - CPF deve estar no formato: 123.456.789-00

4. **Serviços**
   - Vá em "Serviços"
   - Cadastre os serviços que serão oferecidos
   - Defina duração (minutos) e preço

5. **Agenda**
   - Acesse "Agenda" para ver todos os agendamentos
   - Clique em "➕ Novo Agendamento" para criar um
   - Selecione cliente, profissional, serviço, data e horário
   - Edite ou cancele agendamentos existentes

6. **Relatórios**
   - Veja estatísticas detalhadas
   - Filtre por data e status
   - Exporte dados (simulado)

## 🧪 Testando o Sistema

### Criar um Agendamento Completo

1. **Cadastrar um Cliente**
   - Vá em Clientes → Novo Cliente
   - Preencha: Nome, E-mail, Telefone, CPF, Data de Nascimento
   - Clique em Salvar

2. **Verificar Profissionais**
   - Vá em Profissionais
   - Já existem profissionais cadastrados por padrão
   - Adicione mais se desejar

3. **Verificar Serviços**
   - Vá em Serviços
   - Já existem serviços cadastrados
   - Adicione mais se necessário

4. **Criar Agendamento**
   - Vá em Agenda
   - Clique em "➕ Novo Agendamento"
   - Selecione o cliente que acabou de criar
   - Escolha um profissional
   - Escolha um serviço
   - Selecione uma data (hoje ou futura)
   - Veja os horários disponíveis aparecerem
   - Escolha um horário
   - Adicione observações (opcional)
   - Clique em Salvar

5. **Ver o Agendamento**
   - O agendamento aparecerá na lista
   - Status: Agendado (azul)

6. **Editar ou Cancelar**
   - Clique em "Editar" para modificar
   - Clique em "Cancelar" para cancelar
   - Status mudará para Cancelado (vermelho)

## 🔄 Testando Diferentes Perfis

### Criar Novo Usuário Profissional

1. **Faça Logout**
   - Clique em "Sair" no canto superior direito

2. **Cadastre-se**
   - Clique em "Cadastre-se"
   - Preencha os dados
   - **Importante:** Selecione "Profissional" no campo Perfil
   - Senha deve ter maiúsculas, minúsculas e números
   - Exemplo de senha válida: Teste123

3. **Faça Login**
   - Use o e-mail e senha que acabou de criar
   - Note que o menu é diferente
   - Profissionais não veem "Profissionais" e "Serviços"

### Criar Novo Usuário Cliente

1. Repita o processo acima
2. Mas selecione "Cliente" no perfil
3. Clientes veem apenas:
   - Dashboard
   - Agenda

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Ver interface de testes
npm run test:ui

# Ver cobertura
npm run test:coverage
```

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Visualizar build
npm run preview
```

## 🔍 Funcionalidades Especiais

### 🔒 Bloqueio de Login
Tente fazer login com senha errada 5 vezes para ver o bloqueio de 15 minutos em ação.

### 📧 Recuperação de Senha
Clique em "Esqueceu a senha?" para ver a simulação de envio de e-mail.

### ✅ Validações
Tente enviar formulários vazios ou com dados inválidos para ver as validações em ação.

### 🔔 Notificações
Todas as ações importantes mostram notificações toast no canto superior direito.

### 📱 Responsividade
Redimensione a janela ou acesse de um celular para ver o layout responsivo.

## 💾 Dados Mockados

Todos os dados são salvos no `localStorage` do navegador.

### Limpar Dados
Para resetar o sistema:
```javascript
// Abra o Console do navegador (F12)
localStorage.clear();
// Recarregue a página (F5)
```

### Dados Iniciais
Ao carregar pela primeira vez, o sistema cria automaticamente:
- 3 Profissionais
- 3 Clientes
- 4 Serviços
- 3 Agendamentos de exemplo

## 🐛 Problemas Comuns

### A página não carrega
- Verifique se rodou `npm install`
- Verifique se a porta 5173 está livre
- Tente `npm run dev -- --port 3000`

### Mudanças não aparecem
- Limpe o localStorage (veja acima)
- Recarregue a página (Ctrl+Shift+R)
- Verifique o console do navegador (F12)

### Erro ao fazer login
- Verifique as credenciais
- Caso bloqueado, limpe o localStorage
- Ou espere 15 minutos

### Horários não aparecem no agendamento
- Certifique-se de selecionar profissional e data primeiro
- Use uma data atual ou futura

## 📚 Documentação Adicional

- **README.md** - Documentação completa do projeto
- **USER_STORIES.md** - User stories implementadas
- **INTEGRATION_GUIDE.md** - Guia para integrar com back-end C#

## 💡 Dicas

1. **Use o formato correto de dados:**
   - Telefone: (11) 98765-4321
   - CPF: 123.456.789-00
   - Data: use o date picker

2. **Perfis têm permissões diferentes:**
   - Admin vê tudo
   - Profissional vê menos
   - Cliente vê apenas sua agenda

3. **Agendamentos só podem ser editados se estiverem "Agendados"**
   - Cancelados não podem ser editados
   - Concluídos não podem ser editados

4. **Use os filtros nos relatórios:**
   - Filtre por data
   - Filtre por status
   - Exporte os dados (simulado)

## 🎉 Pronto!

Agora você está pronto para explorar todas as funcionalidades do sistema de agendamento!

Para qualquer dúvida, consulte a documentação completa ou abra uma issue no repositório.

**Bom uso! 📅✨**

