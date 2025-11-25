# DressUp - Sistema de Aluguel de Roupas de Festa

Sistema completo para aluguel de roupas de festa com interface moderna e cores pastéis.

## 🚀 Funcionalidades

- ✅ Sistema de autenticação com perfis de admin e cliente
- ✅ Catálogo completo com categorias (Fantasias, Vestidos, Ternos, Acessórios)
- ✅ Sistema de locação com controle de disponibilidade por data
- ✅ Pagamentos online (Cartão, PIX, Boleto)
- ✅ Gestão de estoque e reservas simultâneas
- ✅ Visualização detalhada de produtos (medidas, cores, tamanhos)
- ✅ Opção de retirada na loja física ou entrega por delivery
- ✅ Área administrativa para controle de pedidos, clientes e agenda
- ✅ Design moderno com cores pastéis

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

3. Acesse o site em: `http://localhost:5173`

## 🔐 Credenciais de Acesso

- **Admin:** usuário `admin` / senha `12345`
- **Cliente:** usuário `cliente` / senha `12345`

## 🎨 Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- date-fns

## 📱 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (Auth, Cart)
├── data/          # Dados mockados (produtos)
├── pages/         # Páginas da aplicação
├── types/         # Definições TypeScript
└── App.tsx        # Componente principal
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## 📝 Notas

- Os dados são armazenados no localStorage do navegador
- As imagens dos produtos são placeholders (você pode substituir por imagens reais)
- O sistema está pronto para ser integrado com um backend real

