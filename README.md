# 📋 Sua Lista de Afazeres

Uma aplicação moderna de lista de tarefas construída com React e Vite, que funciona completamente offline e salva seus dados localmente no navegador.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.0-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Modern-green)

## ✨ Funcionalidades

- ➕ **Adicionar tarefas** - Crie novas tarefas facilmente
- ✅ **Marcar como concluída** - Clique na tarefa para alternar o status
- 🗑️ **Deletar tarefas** - Remova tarefas que não precisa mais
- 💾 **Persistência local** - Suas tarefas são salvas automaticamente no navegador
- 🌙 **Tema escuro** - Interface moderna e elegante
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile
- 🚀 **Offline** - Funciona sem conexão com a internet

## 🚀 Como Usar

### Opção 1: Usar Online (Recomendado)

1. Acesse o site: [Link do seu repositório GitHub Pages]
2. Comece a usar imediatamente!

### Opção 2: Executar Localmente

#### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (vem com o Node.js)

#### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   cd SEU-REPOSITORIO
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   - Acesse `http://localhost:5173`
   - O Vite abrirá automaticamente no seu navegador

## 🎯 Como Usar a Aplicação

### Adicionar uma Tarefa
1. Digite sua tarefa no campo de texto
2. Clique em "Adicionar" ou pressione Enter
3. Sua tarefa aparecerá na lista

### Marcar como Concluída
1. Clique no texto da tarefa
2. A tarefa será riscada e ficará acinzentada
3. Clique novamente para desmarcar

### Deletar uma Tarefa
1. Clique no ícone de lixeira ao lado da tarefa
2. A tarefa será removida permanentemente

### Persistência de Dados
- Todas as suas tarefas são salvas automaticamente no navegador
- Mesmo fechando o navegador, suas tarefas continuam lá
- Os dados ficam salvos no seu computador (localStorage)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Ferramenta de build rápida e moderna
- **JavaScript ES6+** - Linguagem de programação moderna
- **CSS3** - Estilização com design responsivo
- **localStorage** - Armazenamento local no navegador

## 📁 Estrutura do Projeto

```
to-do-list/
├── index.html              # Página principal
├── package.json            # Configurações e dependências
├── vite.config.js          # Configuração do Vite
├── README.md              # Este arquivo
└── src/
    ├── main.jsx           # Ponto de entrada da aplicação
    ├── App.jsx            # Componente principal
    ├── App.css            # Estilos globais
    └── components/
        ├── TaskForm.jsx   # Formulário para adicionar tarefas
        └── TaskItem.jsx   # Componente de cada tarefa
```

## 🎨 Personalização

### Alterando Cores
Edite o arquivo `src/App.css` para personalizar as cores:

```css
/* Cor principal (amarelo) */
h1 { color: #ffce00; }
.task-form button { background: #ffce00; }

/* Cor de fundo */
body { background-color: #121212; }
.app-container { background: #1e1e1e; }
```

### Adicionando Novas Funcionalidades
- **Filtros**: Adicione filtros para tarefas concluídas/pendentes
- **Categorias**: Organize tarefas por categorias
- **Data**: Adicione datas de vencimento
- **Prioridades**: Sistema de prioridades (alta, média, baixa)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Cria build de produção
npm run preview      # Visualiza build de produção

# Qualidade de código
npm run lint         # Executa linter
```

## 🌐 Deploy

### GitHub Pages
1. Execute `npm run build`
2. Configure GitHub Pages para servir a pasta `dist`
3. Seu site estará disponível em `https://SEU-USUARIO.github.io/SEU-REPOSITORIO`

### Netlify
1. Conecte seu repositório GitHub ao Netlify
2. Configure build command: `npm run build`
3. Configure publish directory: `dist`

### Vercel
1. Instale Vercel CLI: `npm i -g vercel`
2. Execute `vercel` na pasta do projeto
3. Siga as instruções

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

## 🙏 Agradecimentos

- [React](https://reactjs.org/) - Biblioteca incrível para interfaces
- [Vite](https://vitejs.dev/) - Build tool super rápido
- [MDN Web Docs](https://developer.mozilla.org/) - Documentação sempre útil

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
