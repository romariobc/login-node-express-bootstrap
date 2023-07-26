const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  //Criar lógica de autenticação do login 
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.post('/cadastro', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Verificar se os campos de senha e confirmar senha são iguais
  if (password !== confirmPassword) {
    // Se não forem iguais, redirecione de volta para o formulário de cadastro com uma mensagem de erro na URL
    res.redirect('/cadastro?error=As senhas não coincidem');
    return;
  }


  // Verificar se o usuário já existe no array de usuários
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    // Se o usuário já existir, redirecione de volta para o formulário de cadastro com uma mensagem de erro
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
  } else {
    // Se o usuário não existir, adicione-o ao array de usuários e redirecione para a página de boas-vindas (welcome.html)
    users.push({ username, password });
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
