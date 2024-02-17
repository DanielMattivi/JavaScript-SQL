const {mongoose} = require('../db')

const passportLocalMongoose = require('passport-local-mongoose');

const administradorSchema = new mongoose.Schema({
    username: String,
    password: String,
    permAdm: { type: Boolean, default: false }
});


administradorSchema.plugin(passportLocalMongoose);
const Administrador = mongoose.model("Administrador", administradorSchema)


module.exports = Administrador