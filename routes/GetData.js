const express = require('express');
const Lists = require('./UniversitySchema');

let router = express.Router();

router.get('/universitylist', async (req, res) => {
    const { rank } = req.query;
    console.log('Requested Rank:', rank);

    try {
        let result = await Lists.find().and({rank: rank});
        console.log('Query Result:', result);

        if (result) {
            res.json({ university: result[0].university, course: result[0].course });
            //console.log(result[0].university);
            //res.json(result[0].university);
        } else {
            res.json({ error: 'No data found for the given rank.' });
        }
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;