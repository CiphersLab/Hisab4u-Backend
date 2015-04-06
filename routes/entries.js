var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('Users');
var Account = mongoose.model('Account');
var Entries = mongoose.model('Entries');

exports.createNewEntry = function(req, res){
    var entryData = req.body;
    var entry_info = new Entries({
        userID : entryData.userID,
        accountID:entryData.accountID,
        purpose:entryData.purpose,
        amount:entryData.amount,
        entryDate:entryData.createdDate,
        toFrom:entryData.toFrom,
        form:entryData.form,
        updateDate:entryData.createdDate
    });


    entry_info.save(function(err,data){
        if(err){
            res.send({status:400,msg:"Making an Entry  Fail"+err});
        }else{
            result = {status:200,msg:"Entry Successful",data:{accountID:data.accountID,_id:data._id,purpose:data.purpose,amount:data.amount,entryDate:data.entryDate,toFrom:data.toFrom,form:data.form}}
            res.send(result);
        }
    });//>save
}

exports.deleteEntry = function(req, res){
            var id =  req.body.id
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                // Yes, it's a valid ObjectId, proceed with `findById` call.

                Entries.remove({_id:id},function(err, docs){
                    if(err) res.send(err);
                    else    res.send(docs);
                });
            }else{
                console.log("err")
    }
}

exports.updateEntry = function(req, res){
    var entryData = req.body.entryData;
    Entries.findOne({_id:entryData.entryID},function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                var query=entryData;
                var result
                Entries.update({_id:data.id},{$set:query},function(err2,data2){
                    if(data2 == 0){
                        res.send("error");
                    }else{
                        result = {status:200,msg:"Entry Updated Successfully",data:{accountID:data2.accountID,_id:data2._id,purpose:data2.purpose,amount:data2.amount,entryDate:data2.entryDate,toFrom:data2.toFrom,form:data2.form}}
                        res.send(result);
                    }
                })

            }//else  for data forward

        }//Main else

    })//FindOne funtionx
}

exports.allAccountEntries = function(req, res){
    var accountID = req.body.accountID;

    Entries.find({accountID:accountID},function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send(err);
        } else {
            if(!data){
                console.log('record not found');
                res.send({})
            }else{
                res.send(data)
            }//else  for data forward
        }
    })
}

