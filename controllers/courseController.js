const router = require('express').Router();
const axios = require('axios');
const SERVER = 'http://localhost:5000'

router.get('/semesters', (req, res, next) => {

    axios.get(`${SERVER}/api/courses/semesters`)
    .then(semesters => {
        //console.log(semesters.data);
        res.json(semesters.data.sort())
    })

})

router.get('/:semno', (req, res, next) => {
    var semno = req.params.semno; 

    axios.get(`${SERVER}/api/courses/${semno}`)
    .then(courses => {
        //console.log(courses.data);
        res.json(courses.data)
    })

})

module.exports = router;