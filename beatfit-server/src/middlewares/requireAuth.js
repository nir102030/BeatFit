const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//This middleware is handling any request that requires user authentication
//and it make sure only a user with a valid token will be able to use the db
module.exports = (req, res, next) => {
   const { authorization } = req.headers;//distract the authorization string from the headers

   // if there is no authorization in the request (the user didn't provide the jwt), throw an error msg
   if (!authorization) {
       return res.status(401).send({ error: 'You must be logged in.'});
   }

   //otherwise, extract only the jwt (js web token) from the auth string
   const token = authorization.replace('Bearer ', ''); 

   //Then, use the jwt library to verify this token plus the secret key 
   jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {

        // if the token isn't as expected, throw an error (we use the same err msg to avoid malicious factors)
        if (err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }

        //otherwise, distract the userId
        const { userId } = payload;
        //Then find the user in the Users collection in db that have the same userId
        const user = await User.findById(userId);
        //assign the user to the request so we can use it in the future (in the same request)
        req.user = user;
        next();
   });
};