document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form')
    const loginButton = document.getElementById('login-button')
    const errorMessage = document.getElementById('error-message')
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const usernameInput = document.getElementById('username-input').value
        const password = document.getElementById('password').value
        loginButton.disabled = true
        loginButton.textContent = 'login ....'
        errorMessage.style.display = 'none'
        try {
            const authString = btoa(`${usernameInput}:${password}`)
            console.log("hoho", authString);
            const response = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("ggg", response);
            
            if (!response.ok) {
                throw new Error('Invalid credentials. Please try again.');
            }
            
        } catch (error) {
            
        }
    })
})