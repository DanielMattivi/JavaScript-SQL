const Produto = require('./models/produto')
const Admin = require('./models/administrador')
const createAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const admin = new Admin({ username: 'admin', permAdm: true  });
            await Admin.register(admin, 'admin'); 
            console.log('Administrador criado com sucesso!');
        } else {    
            console.log('O administrador já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar o administrador:', error);
    }
};

createAdmin();

const produto1 = new Produto({
    nome: 'Televisão 34',
    preco: '1200',
    quantidade:'10' 
})
const produto2 = new Produto({
    nome: 'Placa de Vídeo - Rtx 5090',
    preco: '20000',
    quantidade:'4' 
})
const produto3 = new Produto({
    nome: 'Headset Gamer',
    preco: '200',
    quantidade:'20' 
})
const produto4 = new Produto({
    nome: 'PC Gamer Completo',
    preco: '15000',
    quantidade:'4' 
})
const produto5 = new Produto({
    nome: 'Rato Jogador',
    preco: '150',
    quantidade:'12' 
})
const produto6 = new Produto({
    nome: 'Monitor 600hz',
    preco: '10000',
    quantidade:'2' 
})


produto1.save()
produto2.save()
produto3.save()
produto4.save()
produto5.save()
produto6.save()
  