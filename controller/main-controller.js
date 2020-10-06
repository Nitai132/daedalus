const express = require('express');
const router = express.Router();
const {createLead} = require('../services/main-service');
// const { signupValidation } = require('../validations/signup-validations')


router.post('/sendform', async (req, res) => {
    try {
        await createLead(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});

module.exports = router;