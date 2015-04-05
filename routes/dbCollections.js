var mongoose = require('mongoose');
mongoose.connect('mongodb://hisabDB:getconnection@ds043170.mongolab.com:43170/hisabdb');
//mongoose.connect('mongodb://localhost');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
    console.log("db connected");
});


var userSchema = mongoose.Schema({
    userName : String,
    email: String,
    pass: String
});

var accountSchema = mongoose.Schema({
    userID : String,
    accountName: String,
    purpose: String,
    createdDate:Array

});

var entrySchema = mongoose.Schema({
    userID : String,
    accountID: String,
    purpose: String,
    amount: String,
    entryDate:String,
    toFrom:String,
    form:String

});


mongoose.model('Users',userSchema);
mongoose.model('Account',accountSchema);
mongoose.model('Entries',entrySchema);
