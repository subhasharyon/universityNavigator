const express = require('express');
const Students = require('./Schema');
const multer = require('multer');

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


router.post('/editProfile', upload.array("profile"), async (req,res)=>{

    console.log(req.body);

       await Students.updateMany({email: req.body.email},{
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        profile: req.files[0].path,

       });

       res.json({status:"success", msg: "user profile updated successfully"});
       
});

module.exports = router;

