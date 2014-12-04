var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('Users');
var Account = mongoose.model('Account');

/*
 * GET users listing.
 */


exports.createNewAccount = function(req, res){
    var accountData = req.body.accountData;
    var account_info = new Account({
        userID : accountData.userID,
        accountName:accountData.accountName,
        purpose:accountData.purpose,
        createdDate:accountData.createdDate
    });

    account_info.save(function(err,data){
        if(err){
            res.send({status:400,msg:"Creation on Account  Fail"+err});
        }else{
            result = {status:200,msg:"User Created",data:{accountName:data.accountName,_id:data._id,purpose:data.purpose,createdDate:data.createdDate}}
            console.log("Account Added");
            res.send(result);

        }
    });//>save
}


exports.deleteAccount = function(req, res){

    var id =  req.body.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.

        Account.remove({_id:id},function(err, docs){
            if(err) res.send(err);
            else    res.send(docs);
        });
    }else{
        console.log("err")
    }
}


exports.getUserAccounts = function(req, res){
    var userID =  req.body.userID
   var query = {userID:userID}
    findUserAccounts(query).then(function(data){
        res.send(data);
        /*console.log(data)
        return   getAccountsInfo(data)*/

    })/*.then(function(data2){
            // console.log(data2)
            res.send(data2)
        })*/
}


exports.getAccountDetails = function(req, res){


}


var findUserAccounts = function(query){
    var deferred = Q.defer();
    var result ;
    Account.find(query.userID,function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            result = err;

        }
        else {
            if(!data){
                console.log('record not found');
                result = {}

            }else{
                result =  deferred.resolve(data);
                console.log(result)
                //res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx
    return deferred.promise;
}
