var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('Users');
var Account = mongoose.model('Account');
var Entries = mongoose.model('Entries');
var entriesFind = Q.nbind(Entries.find, Entries);
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

    var id =  req.body.accountID;
    deleteUserAccount(id).then(function(){
       return getAllEntriesOfAccount(id);
    }).then(function(accountDet){
        return deleteAllEntry(accountDet);
        //console.log(accountDet)
    }).then(function(result){
        res.send(result)
    })



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


var deleteUserAccount = function(accountId){
    var deferred = Q.defer();
    var result ;

    if (accountId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.

        Account.remove({_id:accountId},function(err, docs){
            if(err) {
                res.send(err)
            }else{
                result =  deferred.resolve(docs);
            };
        });
    }else{
        console.log("err")
    }
    return deferred.promise;
}

var getAllEntriesOfAccount = function(accountId){

    return entriesFind({accountID:accountId})
        //   return   find()
//  ^^^^^^ Rule 1

        .then(function(account) {
//  ^^^^^ Rule 3
            if (!User){
                account.entryInfo = 0;
                //   console.log(User)
            }else{
                account.entryInfo = account;
                //console.log(User)
            }
            return account;
//      ^^^^^^ Rule 3b
        });

}

var deleteAllEntry = function(accountDetail){
    var result ;

    var finalData = [];
    if(accountDetail.length >0){

        var promises = accountDetail.map(deleteEntry); // don't use forEach, we get something back
        return Q.all(promises);

    }else{
        return {msg:"No Friends LIST"};
    }
}

var  deleteEntry =function(entry){
    var deferred = Q.defer();
    var result ;

    Entries.remove({_id:entry._id},function(err, docs){
        if(err) {
           result = deferred.resolve(err);
        }
        else{
            result =deferred.resolve(docs)
        }
    });
    return deferred.promise;
}