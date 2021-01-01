const mongoose = require("mongoose");
const { databasePassword, databaseUsername, clusterName } = require('../config');
mongoose.Promise = global.Promise;

//Connexion à la base de donnée

const url = 'mongodb+srv://' + databaseUsername + ':' + databasePassword + 
'@' + clusterName + '.mongodb.net/test?retryWrites=true&w=majority';

mongoose
.connect(url, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('[NOM PROJET] connected to database'.yellow))
.catch(err => console.log('[NOM PROJET] could not connect to database'.red, err));

module.exports = mongoose;