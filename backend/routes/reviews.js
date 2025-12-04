const express = require('express')
const router = express.Router()

const { db } = require('../db/db')
const { reviews, professorRating } = require('../db/schema')
const { eq } = require('drizzle-orm/expressions')
const { sql } = require('drizzle-orm')

// post new review, simultaneously update professors rating on post

router.post('/', async (req, res) => {
    try{
        const { instructor, userId, rating, comment } = req.body;
        if (!professorId || !userId || !rating) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        await db.transaction(async (tx) => {

            await tx.insert(reviews).values({
                instructor: instructor,
                userId: userId,
                rating,
                comment,
                createdAt: new Date(),
            });

            await tx.update(professorRating)
                .set({
                    ratingSum: sql`${professorRating.ratingSum} + ${rating}`,
                    ratingCount: sql`${professorRating.ratingCount} + 1`,
                    avgRating: sql`round(((${professorRating.ratingSum} + ${rating})::numeric) / (${professorRating.ratingCount} + 1), 2)`
                })
                .where(eq(professorRating.instructor, instructor))
            })

            res.status(201).json({ success: true })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Failed to post review' })
        }
    })

    module.exports = router