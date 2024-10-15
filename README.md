# 📊 Finance Investment API

<!-- ![Finance Investment API Logo](https://example.com/finance-investment-api-logo.png) -->

Finance Investment API é uma ferramenta poderosa para análise de ações e gestão de investimentos. Desenvolvida com tecnologias modernas, esta API fornece dados em tempo real sobre ações, análises de mercado e funcionalidades avançadas de gerenciamento de portfólio para investidores informados.

## 🚀 Funcionalidades

- **Autenticação Robusta**

  - Registro e login seguros de usuários
  - Proteção de rotas com JWT

- **Análise de Ações em Tempo Real**

  - Busca de dados atualizados de ações individuais
  - Análise simultânea de múltiplas ações

- **Gestão de Portfólio**

  - Cálculo de ROI e ROI anualizado
  - Análise de diversificação do portfólio
  - Recomendações de rebalanceamento

- **Simulações de Investimento**

  - Simulação de estratégias de investimento a longo prazo
  - Visualização de resultados ano a ano

- **Sistema de Alertas**

  - Configuração de alertas de preço para ações específicas
  - Notificações quando os alvos de preço são atingidos

- **Assinatura Premium**
  - Acesso a funcionalidades avançadas para usuários premium

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor
- **Express.js**: Framework web rápido e minimalista para Node.js
- **MongoDB**: Banco de dados NoSQL para armazenamento flexível de dados
- **Mongoose**: ODM (Object Data Modeling) para MongoDB e Node.js
- **JWT**: JSON Web Tokens para autenticação segura
- **Bcrypt**: Biblioteca para hash de senhas
- **Axios**: Cliente HTTP baseado em promessas para fazer requisições
- **Cheerio**: Biblioteca para web scraping eficiente
- **Swagger**: Ferramenta para documentação interativa da API
- **Jest**: Framework de testes para JavaScript

## 📋 Pré-requisitos

- Node.js (v14+ recomendado)
- MongoDB
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/finance-investment-api.git
   ```
2. Entre no diretório do projeto:
   ```
   cd finance-investment-api
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/finance_investment
   JWT_SECRET=seu_jwt_secret_aqui
   ```

## 🚀 Uso

1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
2. Acesse a API em `http://localhost:3001`
3. Explore a documentação Swagger em `http://localhost:3001/api-docs`

## 📌 Rotas Principais

- `POST /api/auth/register`: Registrar um novo usuário
- `POST /api/auth/login`: Autenticar um usuário
- `GET /api/stock-analysis/stock/:symbol`: Obter dados de uma ação específica
- `POST /api/stock-analysis/stocks`: Obter dados de múltiplas ações
- `POST /api/stock-analysis/analyze-portfolio`: Analisar diversificação do portfólio
- `POST /api/stock-analysis/simulate-strategy`: Simular estratégia de investimento

Para uma lista completa de rotas e seus detalhes, consulte a documentação Swagger.

## 🧪 Testes

Execute os testes unitários com:

```
npm test
```

## 🐞 Problemas Conhecidos

- A API de scraping de ações pode ser lenta em horários de pico do mercado
- Limite de requisições por minuto para usuários não premium

## 🗺️ Roadmap

- Implementação de machine learning para previsões de mercado
- Integração com corretoras para execução automática de ordens
- Expansão da cobertura para mercados internacionais
- Implementação de um sistema de notificações em tempo real

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tem uma sugestão para melhorar isso, por favor, siga estes passos:

1. Faça um fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Faça commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 🙏 Agradecimentos

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger](https://swagger.io/)

---

Desenvolvido com ❤️ por [Gabriel Lara](https://github.com/gabrielbr619)
