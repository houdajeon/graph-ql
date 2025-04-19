export const profileTpl = `
<main class="profile">
<header class="header">

        <img id="header-img" src="imgs/profile.jpg">
        <h1 id="style-name"></h1>
        <button id="logout-button">Logout</button>

    </header>

    <div class="container">
        
        <div class="profile-section">
            <h2>About me</h2>
            <div id="style-info"></div>
        </div>

        <div class="profile-section">
            <h2>AuditRatio</h2>
            <div id="graph-auditRatio"></div>
        </div>

        <div class="profile-section">
            <h2>Technologies</h2>
            <div id="graph-techno"></div>
        </div>
    </div>
    </div>

</main>
`