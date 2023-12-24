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

router.post('/validateThruToken', upload.none(), async(req,res) => {
    console.log(req.body);

    let decodedToken = jwt.verify(req.body.token,'hahaha');

    let userDetails = await Students.find().and({email:decodedToken.email});

    if(userDetails.length > 0){
        let ispasswordCorrect = await bcrypt.compare(decodedToken.password, userDetails[0].password);

        if(ispasswordCorrect){
            res.json({status:'success', data: userDetails[0]})
        }else{
            res.json({status:'failed', msg:'email or password is incorrect'});
        }
    }else{
        res.json({status:'failed', msg:"User Doesn't Exists"});
    }

})

module.exports = router;