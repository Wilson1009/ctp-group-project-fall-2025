const express = require('express')
const router = express.Router()

const { db } = require('../db/db')
const { courses, professorRating } = require('../db/schema')
const { eq, ilike, sql } = require('drizzle-orm/expressions')

router.get('/', async (req, res) => {
    try {
        const { title, instructor, term } = req.query;

        let q

        if (title) {
            q = db.select({
                ...courses,
                avgRating: professorRating.avgRating,
                ratingCount: professorRating.ratingCount,
            })
            .from(courses) // start from courses
            .leftJoin(professorRating, eq(courses.instructor, professorRating.instructor)) // join professor rating on matching instructor
            .where(eq(courses.courseTitle, title))
            .orderBy(sql`${professorRating.avgRating} DESC NULLS LAST`)

        } else if (instructor) {
            q = db.select({
                ...courses,
                avgRating: professorRating.avgRating,
                ratingCount: professorRating.ratingCount
            })
            .from(course)
            .leftJoin(professorRating, eq(courses.instructor, professorRating.instructor))
            .where(ilike(courses.instructor, instructor))
            
        } else if (term) {
                if (term.toLowerCase() === 'spring'){
                q = q.where(
                    sql`substring(${courses.meetingDates} from 2 for 1) = '1' AND substring(${courses.meetingDates} from 4 for 1) != '0'` // if course starts in January, but after first 9 days
                ) 
            } else if (term.toLowerCase() === 'winter') {
                q = q.where(
                    sql`substring(${courses.meetingDates} from 2 for 1) = '1' AND substring(${courses.meetingDates} from 4 for 1) = '0'` // if course starts in January, but during the first 9 days  
                )
            } else if (term.toLowerCase() === 'fall') {
                q = q.where(
                    sql`substring(${courses.meetingDates} from 2 for 1) = '8` // if course starts in august
                )
            }
        }
        
        const rows = await q // await specific query

        res.json(rows)
    } catch (err) {
        console.error('GET /api/courses error:', err)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
