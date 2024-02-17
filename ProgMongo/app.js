const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Administrador = require('./models/administrador');
const Produto = require('./models/produto');
const expressSession = require("express-session");
const path = require("path");
const methodOverride = require('method-override')
const app = express();


app.set("view engine", 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));



passport.use(new LocalStrategy(Administrador.authenticate()));
passport.serializeUser(Administrador.serializeUser());
passport.deserializeUser(Administrador.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.get("/", (req, res) => {
    res.redirect("/produtos");
});

app.get("/produtos", async (req, res) => {
    const produtos = await Produto.find({});
    const currentUser = req.user;
    const permAdm = currentUser && currentUser.permAdm;

    res.render("home", { produtos, permAdm }); // Enviando a lista de produtos para a home
});

app.get('/produtos/new', (req, res) => {
    res.render('new')
})

// Visualizar um produto específico
app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params
    const produto = await Produto.findById(id);
    const currentUser = req.user;
    const permAdm = currentUser && currentUser.permAdm;
    res.render("produto", { produto, permAdm }); 

});

app.post('/produtos', async (req, res) => {
    const novoproduto = new Produto(req.body)
    await novoproduto.save()
    res.redirect('/produtos')
})

app.get('/produtos/:id/edit', async (req, res) => {
    const { id } = req.params
    const produto = await Produto.findById(id)
    res.render('edit', { produto })
})

app.patch('/produtos/:id', async (req, res) => {
    const { id } = req.params
    const produto = await Produto.findByIdAndUpdate(id, req.body)
    res.redirect('/produtos/' + id)
})

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params
    const produto = await Produto.findByIdAndDelete(id)
    res.redirect('/produtos')
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adm = new Administrador({ username });
        const admRegistrado = await Administrador.register(adm, password);
        req.login(admRegistrado, err => {
            if (err) return next(err);
        })
    } catch (e) {
        console.log(e);
    }
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

app.listen(3000, () => { console.log('Servidor ligado na porta 3000!') });