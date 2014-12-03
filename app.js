
/**
 * Module dependencies.
 */
var db = require('./routes/dbCollections');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var account = require('./routes/account');
var entry = require('./routes/entries');
var http = require('http');
var path = require('path');

var app = express();
var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
// all environments
app.set('port', process.env.PORT || 3000);
app.use(allowCrossDomain);
app.use(express.bodyParser());
/*
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
*/




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//////////////////////////////////////////////////////
///////////////////////USER RElated API///////////////
//////////////////////////////////////////////////////

//app.get('/users', user.list);
app.post('/users/register', user.register);
app.post('/users/login', user.login);
app.get('/users/profile/:id', user.getProfile);
app.get('/users/admin', user.getAllUser);

//////////////////////////////////////////////////////
///////////////////////USER RElated API///////////////
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
/////////////////Account Based API's//////////////////
//////////////////////////////////////////////////////

app.post('/account/new', account.createNewAccount);
app.post('/account/delete', account.deleteAccount);
app.post('/account/getUserAccounts', account.getUserAccounts);/////Still to complete
app.post('/account/getAccountDetails', account.getAccountDetails);/////Still to complete



//////////////////////////////////////////////////////
/////////////////Account Based API's//////////////////
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
/////////////////Entries Based API's//////////////////
//////////////////////////////////////////////////////
app.post('/entry/new', entry.createNewEntry);
app.post('/entry/delete', entry.deleteEntry);
app.post('/entry/update', entry.updateEntry);
app.post('/entry/allAccountEntries', entry.allAccountEntries);/////Still to complete

//////////////////////////////////////////////////////
/////////////////Entries Based API's//////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
