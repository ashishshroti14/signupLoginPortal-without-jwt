var bodyParser = require('body-parser')
var message='';
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

var urlEncodedParser = bodyParser.urlencoded({extended: false});

var User = require('./user_model') 
module.exports = function(app){

    app.get('/login', (req, res) => {
        console.log('welcome to the login portal')
        res.render('login.ejs',{ msg : 'welcome to the login portal'});
    })

    app.post('/login',urlEncodedParser, (req,res) => {
        data = req.body

        User.findOne( {'username' : data.username, 'password': data.password},(err,result) => {
            console.log(result);
            if(result !== null){
                console.log(result)
                console.log('account found')
                res.json(result)
            }else{
            res.json(result)
            console.log('account not found')
        }
        })


    })


}