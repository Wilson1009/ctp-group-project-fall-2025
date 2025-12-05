const express = require('express')
const router = express.Router()

const { db } = require('../db/db')
const { professorRating } = require('../db/schema')
const { eq } = require('drizzle-orm/expressions ')


router.get('/:instructor', (req, res) => {
    try {
        const { instructor } = req.params


    } catch (err) {

    }
})