const router = require('express').Router();
const db = require('../models');

router.get('/:regno', (req, res, next) => {
    db.Student.find({ regno: req.params.regno})
    .then(student => {
        //console.log(student);
        res.status(200).json(student);
    })
})

module.exports = router;