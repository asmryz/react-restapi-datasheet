const router = require('express').Router();
const db = require('../models');

router.post('/add', (req, res, next) => {

    //console.log(req.body);
    var courseids = JSON.parse(req.body.courses);
    //console.log(courses);

    regs = [];

    for(courseid of courseids){
        regs.push(new db.Registration({ courseid: courseid, regno: req.body.regno, gradeid: null}));
    }

    console.log(regs);

    db.Registration.insertMany(regs)
    .then(regs => {
        //console.log(regs);
        res.status(200).json(regs);
    })
    
})

router.get('/:regno', (req, res, next) => {
    
    Promise.all([
        db.Registration.aggregate([
            {$match: { regno : req.params.regno }}, 
            {$lookup: {from: "courses", localField: "courseid", foreignField: "courseid", as: "course"}}, 
            {$unwind: "$course"}, 
            {$lookup: {from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade"}}, 
            {$unwind: { path: "$grade", preserveNullAndEmptyArrays: true }}
        ]), 
        db.Grade.find().sort('gradeid'), 
        db.Registration.aggregate([
            {$match: { regno : req.params.regno, gradeid: { $ne :null}}}, 
            {$lookup: {from: "courses", localField: "courseid", foreignField: "courseid", as: "course"}}, 
            {$unwind: "$course"}, 
            {$lookup: {from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade"}}, 
            {$unwind: "$grade"}, 
            { $group: {_id:null, tcr:{$sum: '$course.crhr'}, 
                mcr: {$sum: {$multiply: ['$course.crhr', '$grade.gpa']}}}}, 
            { $project: {_id:0, GPA: {$divide: ['$mcr', '$tcr']}}}
        ])        
    ])

    .then(([regs, grades, gpa]) => {
        //console.log(regs);
        res.status(200).json([regs, grades, gpa]);
    })    
})

router.patch('/update', (req, res, next) => {

    db.Registration.findOneAndUpdate({_id: req.body.id},
    {$set: { gradeid: req.body.gradeid } }, {new: true})
    .then(reg => {
        //console.log(regs);
        res.status(200).json(reg);
    })    

})

router.get('/gpa/:regno', (req, res, next) => {

    db.Registration.aggregate([
        {$match: { regno : req.params.regno, gradeid: { $ne :null}}}, 
        {$lookup: {from: "courses", localField: "courseid", foreignField: "courseid", as: "course"}}, 
        {$unwind: "$course"}, 
        {$lookup: {from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade"}}, 
        {$unwind: "$grade"}, 
        { $group: {_id:null, tcr:{$sum: '$course.crhr'}, 
            mcr: {$sum: {$multiply: ['$course.crhr', '$grade.gpa']}}}}, 
        { $project: {_id:0, GPA: {$divide: ['$mcr', '$tcr']}}}
    ]) 
    .then(gpa => {
        //console.log(regs);
        res.status(200).json(gpa);
    })    

})

module.exports = router;