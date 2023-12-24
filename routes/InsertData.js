const express = require('express');
const Students = require('./Schema');
const multer = require('multer');
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


router.post('/userDetails', upload.array("profile"), async (req,res)=>{

    console.log(req.body);

    let userArr = await Students.find().and({email: req.body.email});

    if(userArr.length > 0){
        res.json({status:'failed', msg:'User Already Exists'})
    }else{
        try {
            let hasedPassword = await bcrypt.hash(req.body.password, 10);

            let newUser = new Students({
        
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hasedPassword,
                confirmPassword: req.body.confirmPassword,
                gender: req.body.gender,
                profile: req.files[0].path,
        
            });
        
            await newUser.save();
            res.json({status:'success',msg:'user created successfully'})
           } catch (error) {
            console.log('unable to create user',error);
            res.json({status:'failed',msg:error});
           }
    }
});

module.exports = router;

