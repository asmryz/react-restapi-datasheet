const router = require('express').Router();
const db = require('../models');

router.get('/semesters', (req, res, next) => {
    db.Course.distinct('semester')
    .then(semesters => {
        //console.log(semesters);
        res.status(200).json(semesters);
    })
})

router.get('/:semno', (req, res, next) => {
    
    db.Course.find({ semester: req.params.semno }).sort('courseid')
    .then(courses => {
        //console.log(courses);
        res.status(200).json(courses);
    })
})

module.exports = router;