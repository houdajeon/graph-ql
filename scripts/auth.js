import { profileTpl } from "../components/profileTpl.js";
import { profileApi } from "./profileApi.js";
import {loginPage} from '../components/indexTpl.js'


export function login() {
    
document.addEventListener('DOMContentLoaded', function () {
   const token =  localStorage.getItem('jwtToken')
   
    if (token) {
        document.body.innerHTML = ''
        document.body.innerHTML = profileTpl
        logout()
        return
    }
    
    document.body.innerHTML = ''
    document.body.innerHTML = loginPage
    const loginForm = document.getElementById('login-form')

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const usernameInput = document.getElementById('username-input').value
        const password = document.getElementById('password').value

        try {
            const authString = btoa(`${usernameInput}:${password}`)
            const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const token = await response.json()
                localStorage.setItem('jwtToken', token)
                
                if (token) {                    
                    document.body.innerHTML = ''
                    document.body.innerHTML = profileTpl
                    profileApi()
                    logout()
                }

            } else if (!response.ok) {
                const hh = document.createElement('span')
                hh.className = "error"
                hh.textContent = "Invalid informations. Please try again."
                hh.style.color = 'red'
                document.querySelector('.login-submit').prepend(hh)
                return
            }
        }
        catch (error) {
            console.log('error:', error)
        }
    })
})
}
login()
function logout() {
    document.getElementById("logout-button").addEventListener("click",()=>{
        localStorage.removeItem("jwtToken")
        window.location.replace("/index.html")
    })
}