const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();
const Job = require('../models/job.schema.js');
const authMiddleware = require("../middleware/authMiddleware");
const errorhanding = require('../middleware/errorhanding');

// const isTokenValid = jwt.verify(token, process.env.secret);
router.get('/', async (req, res, next) => {
    try {
        const job = await Job.find();
        res.send(job)
    } catch (err) {
        next(err)
    }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    console.log("User verified:", req.user);
    try {
        const job = await Job.findById(id);
        if (job) {
            res.status(200).send({jobs:job});
        } else {
            const error = new Error("Job not found");
            error.name = "NotFoundError"
            throw error;
        }
    }
    catch (err) {
        next(err)
    }
});

router.post('/', authMiddleware, async (req, res, next) => {
    const { companyName, addLogo, jobPosition,size, monthlySalary, jobType, remoteOrOffice, location, description, aboutCompany, skillsRequired, information } = req.body;
    try {
        const job = await Job.create({
            companyName,
            addLogo,
            jobPosition,
            size,
            monthlySalary,
            jobType,
            remoteOrOffice,
            location,
            description,
            aboutCompany,
            skillsRequired: typeof skillsRequired === 'string' 
            ? skillsRequired.split(",").map(skill => skill.trim()) 
            : skillsRequired,
            information,
            createdBy: req.user
        });
        res.status(200).send(job);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id;
    const { companyName, addLogo, jobPosition, size, monthlySalary, jobType, remoteOrOffice, location, description, aboutCompany, skillsRequired, information } = req.body;
  
    try {

        const job = await Job.findById(id);
        if (job.createdBy.toString() !== req.user._id) {
            const error = new Error("You are not authorized to edit this job");
            error.name = "ForbiddenError"
            throw error;
        }
       const updatedJob= await Job.findByIdAndUpdate(id, {
            companyName,
            addLogo,
            jobPosition,
            size,
            monthlySalary,
            jobType,
            remoteOrOffice,
            location,
            description,
            aboutCompany,
            skillsRequired: typeof skillsRequired === 'string' 
            ? skillsRequired.split(",").map(skill => skill.trim()) 
            : skillsRequired,
            information,
            updatedAt: Date.now()
        }, { new: true });
        res.status(201).send(updatedJob);
    } catch (err) {
        next(err);
    }
})

module.exports = router;

