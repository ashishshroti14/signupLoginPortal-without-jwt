var bodyParser = require('body-parser')
var message='';
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ash:ash@cluster0-essn3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
var User = require('./user_model')

var urlEncodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

    app.get('/signup', (req, res) => {
        console.log('welcome to the signup portal')
        res.render('signup.ejs',{ msg : 'welcome to the signup portal'});
    })

    app.post('/signup', urlEncodedParser, (req, res) => {
        //Get data from the view and add it to mongodb

        data = req.body
        
        console.log(data);
        if (data.password === data.confirmPassword){
           
            delete data.confirmPassword
            console.log(data);
           
            User.countDocuments({'username': data.username}, (err, result) => {
                console.log(result);
                if(!result){
                    var newInfo = User(req.body).save((err, data) => {

                        console.log(data);
                        
                        res.render('signup.ejs', {msg: 'Account Created!'})
                        // message= 'Account created'
        
                        console.log('account created!')

                })
            }

                else {
                    //message = 'username already taken'
                    res.render('signup.ejs', {msg: 'username already taken'})
                    console.log('username already taken')
                }
            })
           
        
           
        }
        
        else {console.log('Confirm password doesn\'t match with the entered password')
        res.render('signup.ejs', {msg: 'Confirm password doesn\'t match with the entered password'})
    
    }
        
        
       // res.render('signup.ejs', {msg: message});
      
    })
}