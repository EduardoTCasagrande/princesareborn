const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Lista de usuários e senhas válidos
const users = [
    { username: 'admin', password: 'admin' },
    // Adicione mais usuários conforme necessário
];

// Função para verificar as credenciais do usuário
function authenticate(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

// Rota de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verificar as credenciais do usuário
    const user = authenticate(username, password);

    if (user) {
        // Autenticado com sucesso
        req.session.isAuthenticated = true;
        res.redirect('/estoque'); // Redireciona para a página de estoque
    } else {
        // Credenciais inválidas - retornar uma mensagem de erro
        res.send('Credenciais inválidas. Tente novamente.');
    }
});


// Rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        }
        res.redirect('/');
    });
});


// Rota de estoque (apenas acessível após o login)
app.get('/estoque', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/estoque.html'));
});

// Middleware para verificar autenticação
function requireAuth(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.send('Acesso bloqueado. Faça o login para acessar esta página.');
    }
}

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
