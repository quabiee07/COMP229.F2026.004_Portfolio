module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to my first backend application",
       
    }

    res.json(messageObj);
}