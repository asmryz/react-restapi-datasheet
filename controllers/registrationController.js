const router = require('express').Router();
const axios = require('axios');
const SERVER = 'http://localhost:5000'

router.post('/add', (req, res, next) => {

    axios.post(`${SERVER}/api/registrations/add`, req.body)
    .then(regs => {
        //console.log(regs.data);
        res.json(regs.data)
    })

})

router.get('/:regno', (req, res, next) => {
    var regno = req.params.regno;
    axios.get(`${SERVER}/api/registrations/${regno}`)
    .then(regs => {
        //console.log(regs.data);
        res.json(regs.data)
    })

})

router.get('/gpa/:regno', (req, res, next) => {
    var regno = req.params.regno;
    axios.get(`${SERVER}/api/registrations/gpa/${regno}`)
    .then(regs => {
        //console.log(regs.data);
        res.json(regs.data)
    })

})

router.post('/update', (req, res, next) => {

    axios.patch(`${SERVER}/api/registrations/update`, req.body)
    .then(regs => {
        //console.log(regs.data);
        res.json(regs.data)
    })

})

module.exports = router;