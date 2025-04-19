export const loginPage = `
 <main class="index">
    <div class="login-box">
      <div class="img-style">
        <img src="imgs/profile.jpg" class="img">
      </div>
      <form id="login-form">
        <div class="user-box">
          <input type="text" required id="username-input">
          <label>Username or Email</label>
        </div>
        <div class="user-box">
          <input type="password" required id="password">
          <label>Password</label>
        </div>
        <div class="login-submit">
          <button type="submit" id="login-button">Login</button>
        </div>
      </form>
    </div>
  </main>
`