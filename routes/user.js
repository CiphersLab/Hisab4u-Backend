var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('Users');
/*
 * GET users listing.
 */


exports.register = function(req, res){
    //res.send({msg : "Regitered"})
    var result ;
    var userData = req.body.userData;
    var presentQuery={email:userData.email};


    User.findOne(presentQuery,function(err,data){
        if (err) {// ...
            console.log('An error has occurred');
            result = {status:0,msg:err}
            res.send(result);
        } else {
            if(!data){
                console.log('record not found');

                var user_info = new User({
                    userName : userData.userName,
                    email:userData.email,
                    pass:userData.pass
                });

                user_info.save(function(err,data){
                    if(err){
                        res.send({status:400,msg:"Registration Fail"+err});
                    }else{
                        result = {status:200,msg:"User Created",data:{email:data.email,_id:data._id,userName:data.userName}}
                        res.send(result);
                        console.log("REgisterd")
                    }
                });//>save

            }else{
                result = {code:200,msg:'email found'}
                console.log("Already registered")
                res.send(result);

            }//else  for data forward

        }//Main else


    })//FindOne funtionx

}


exports.login = function(req, res){

    var result;
    var userData = req.body.userData;
    var presentQuery={email:userData.email,pass:userData.pass}
   // var presentQuery={email:req.body.email,pass: req.body.pass}; //userData.email,pass:userData.pass}//"muddassir_92@hotmail.com",pass:"a1234567"}//
    User.findOne(presentQuery,'_id email',function(err,data){
        if (err) {// ...
            console.log('An error has occurred');
            result = {status:0,msg:err}
            res.send(result);
        } else {
            if(!data){
                //alert('record not found');
                result = {msg:'Email or Password have some error'};
                console.log(result);
                res.send({status:404, data:result});


            }else{
                result = {msg:'email found',data:{_id:data._id,email:data.email,userName:data.userName,pass:data.pass}};
                console.log("Signed In as " + result);
                res.send({status:200, data:result});

            }//else  for data forward

        }//Main else

    });
    //res.send("Hello " + req.body.username);
}


exports.getProfile = function(req, res){
    var userID = req.params.userID;

    User.findOne({_id:userID },function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                console.log("data == "+data);
                res.send(data);
                //res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx
}


exports.getAllUser = function(req, res){
    User.find({},function(err,data){
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

/*
exports.list = function(req, res){
  res.send("respond with a resource");
};*/