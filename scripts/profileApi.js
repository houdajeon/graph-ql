import { query } from "./query.js"
import { profileInfo } from "./profile.js"
import { login } from "./auth.js"
export async function profileApi() {
    
    const token = localStorage.getItem('jwtToken')
    
    try {
        const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })

        const data = await response.json()

        if (data.errors) {
            localStorage.removeItem("token")
            login()
        } else {
            return profileInfo(data.data)
        }
    } catch (error) {
        login()
    }
}

