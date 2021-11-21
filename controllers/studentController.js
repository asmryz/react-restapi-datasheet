const router = require('express').Router();
const axios = require('axios');
const SERVER = 'http://localhost:5000'

router.get('/:regno', (req, res, next) => {
    var regno = req.params.regno;

    axios.get(`${SERVER}/api/students/${regno}`)
    .then(student => {
        //console.log(student.data[0]);
        res.json(student.data[0])
    })

})

module.exports = router;