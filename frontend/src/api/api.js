const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// encodeURIComponent makes sure that the query doesn't fail due to any kind of parameter


// Courses

export const fetchCourses = async (filters) => {
    let url = `${API_BASE}/api/courses`

    if(filters.title) url += `?title=${encodeURIComponent(filters.title)}`
    else if (filters.instructor) url += `?instructor=${encodeURIComponent(filters.instructor)}`
    else if (filters.term) url += `?term=${encodeURIComponent(filters.term)}`

    const response = await fetch(url)
    if(!response.ok) throw new Error('Failed to fetch courses')
    return response.json()
}

// Reviews

export const fetchReviews = async (instructor) => {
    const response = await fetch(
        `${API_BASE}/api/reviews?instructor=${encodeURIComponent(instructor)}`
    )
    if (!response.ok) throw new Error('Failed to fetch reviews')
    return response.json()
}

export const postReview = async ({ instructor, userId, rating, comment }) => {
    const response = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(instructor, userId, rating, comment)
    })
    if (!response.ok) throw new Error('Failed to post review')
    return response.json()
}

// userData

export const getUserData = async (userId) => {
    const response = await fetch(`${API_BASE}/api/userData?userId=${encodeURIComponent(userId)}`)
    if(!response.ok) throw new Error('Failed to fetch user')
    return response.json()
}

export const createUser = async ({ userId, email }) => {
    const response = await fetch(`${API_BASE}/api/userData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, email })
    })
    if(!response.ok) throw new Error('Failed to create user')
    return response.json()
}

// Mandatory Courses

export const getMandatoryCourse = async (userId) => {
    const response = await fetch(`${API_BASE}/api/userMandatoryCourse/${encodeURIComponent(userId)}`)
    if (!response.ok) throw new Error('Failed to fetch mandatory courses')
    return response.json()
}

export const updateMandatoryCourses = async (userId, updates) => {
    const response = await fetch(`${API_BASE}/api/userMandatoryCourse/${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates) // stringify object of format (CSCI_111 : true)
    })
    if (!response.ok) throw new Error('Failed to update mandatory courses')
    return response.json()
}

