const express = require('express');
const multer = require('multer');
const Students = require('./Schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.post('/validateUser', upload.none(), async(req,res) => {
    console.log(req.body);

    let userDetails = await Students.find().and({email: req.body.email});

    if(userDetails.length > 0){
        let ispasswordCorrect = await bcrypt.compare(req.body.password,userDetails[0].password);

        if(ispasswordCorrect == true){
            let encryptedObj = {email: req.body.email, password: req.body.password};
           let generatedToken = jwt.sign(encryptedObj,'hahaha');
            res.json({status:'success', data: userDetails[0],token:generatedToken});
        }else{
            res.json({status:'failed', msg: 'email or password is incorrect'});
        }
    }else{
        res.json({status:'failed', msg: 'user Does not Exists'});
    }

});

module.exports = router;
