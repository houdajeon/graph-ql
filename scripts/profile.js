import { profileApi } from "./profileApi.js"
profileApi()
export function profileInfo(data) {
    const allData = data.user[0]
    const name = document.getElementById('style-name')
    name.textContent = allData.login
    const aboutme = document.getElementById('style-info')
    const container_aboutme = document.createElement('div')
    container_aboutme.classList.add('content_about')
    container_aboutme.innerHTML = `
    <p>- FirstName : ${allData.firstName}</p>
    <p>- LastName : ${allData.lastName}</p>
    <p>- Gender : ${allData.gender}</p>
    <p>- Email : ${allData.email}</p>
    <p>- Country : ${allData.country}</p>
    <p>- City : ${allData.city}</p>
    <p>- TotalXP : ${(data.xpEvent41Total.aggregate.sum.amount / 1000).toFixed(0)} KB</p>
    <p>- Level : ${data.maxLevelAmount.aggregate.max.amount}</p>
    `
    aboutme.appendChild(container_aboutme)
    graphAuditRatio(allData)
    getTechnicalSkills(data)
    const token = localStorage.getItem('jwtToken')
    if (!token) {

        window.location.replace("/index.html")
    }
}

function graphAuditRatio(allData) {
    const widthUp = allData.totalUp
    const widthDown = allData.totalDown
    const totalwidth = widthUp + widthDown;
    const width = 500;
    const height = 200;

    const graph = document.getElementById('graph-auditRatio')

    const svg = `
    <svg class="svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif">
    
      <!-- Done label -->
      <text x="10" y="45" font-size="17" fill="#BDBDBD">Done</text>
      
      <!-- Upload value -->
      <text x="350" y="45" font-size="17" fill="#BDBDBD" text-anchor="end">${allData.totalUp} ↑</text>
      
      <!-- Bar: Done -->
      <rect x="10" y="52" width="400" height="15" fill="#333" rx="6" />
      <rect x="10" y="52" width="${(widthUp / totalwidth) * 400}" height="15" fill="#5287a3" rx="6" />
    
      <!-- Received label -->
      <text x="10" y="100" font-size="17" fill="#BDBDBD">Received</text>

      <!-- Download value -->

      <text x="350" y="100" font-size="17" fill="#BDBDBD" text-anchor="end">${allData.totalDown} ↓</text>
      <!-- Bar: Received -->
      <rect x="10" y="110" width="400" height="15" fill="#333" rx="6" />
      <rect x="10" y="110" width="${(widthDown / totalwidth) * 400}" height="15" fill="white" rx="6" />
    
      <!-- Ratio -->
      <text x="10" y="165" font-size="36" fill="#5287a3">${allData.auditRatio.toFixed(1)}</text>
      <text x="80" y="165" font-size="14" fill="#5287a3">You can do better!</text>
    </svg>
    `;

    graph.innerHTML = svg;

}

function getTechnicalSkills(data) {
    // Calculate max amounts for each skill type
    const maxSkillAlgoAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_algo').map(item => item.amount));
    const maxSkillProgAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_prog').map(item => item.amount));
    const maxSkillTcpAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_tcp').map(item => item.amount));
    const maxSkillGameAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_game').map(item => item.amount));
    const maxSkillStatsAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_stats').map(item => item.amount));
    const maxSkillBackAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_back-end').map(item => item.amount));
    const maxSkillFrontAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_front-end').map(item => item.amount));
    const maxSkillSysAmount = Math.max(...data.transaction.filter(item => item.type === 'skill_sys-admin').map(item => item.amount));
    const graph2 = document.getElementById('graph-techno')

    // Create an array of skill objects 
    const skills = [
        { name: 'Algo', amount: maxSkillAlgoAmount },
        { name: 'Prog', amount: maxSkillProgAmount },
        { name: 'Front-End', amount: maxSkillFrontAmount },
        { name: 'Game', amount: maxSkillGameAmount },
        { name: 'Back-End', amount: maxSkillBackAmount },
        { name: 'Stats', amount: maxSkillStatsAmount },
        { name: 'Tcp', amount: maxSkillTcpAmount },
        { name: 'Sys-Admin', amount: maxSkillSysAmount }
    ];

    // SVG dimensions and settings
    const width = 400;
    const height = 200;
    const padding = 30;
    const barWidth = 20;
    const barGap = 40;

    // Calculate the maximum value for scaling
    const maxValue = Math.max(...skills.map(skill => skill.amount));
    const scale = (height - padding * 2) / maxValue;

    // Create SVG string
    let svg = `
        <svg class="svg2" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect x="0" y="0" width="${width}" height="${height}" rx="10" ry="10" fill="#f8f9fa" />
            
            <!-- Axes -->
            <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#666" stroke-width="2" />
            <line x1="${padding}" y1="${height - padding}" x2="${padding}" y2="${padding}" stroke="#666" stroke-width="2" />
            
            <!-- Grid lines -->
            <line x1="${padding}" y1="${height - padding - maxValue * scale * 0.25}" x2="${width - padding}" y2="${height - padding - maxValue * scale * 0.25}" stroke="#ddd" stroke-width="1" />
            <line x1="${padding}" y1="${height - padding - maxValue * scale * 0.5}" x2="${width - padding}" y2="${height - padding - maxValue * scale * 0.5}" stroke="#ddd" stroke-width="1" />
            <line x1="${padding}" y1="${height - padding - maxValue * scale * 0.75}" x2="${width - padding}" y2="${height - padding - maxValue * scale * 0.75}" stroke="#ddd" stroke-width="1" />
            
           `;

    // Add bars for each skill
    skills.forEach((skill, index) => {
        const barHeight = skill.amount * scale;
        const barX = padding + (index * barGap) + barGap / 2;
        const barY = height - padding - barHeight;

        svg += `
            <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="#5287a3"  />
            <text x="${barX + barWidth / 2}" y="${height - padding + 20}" text-anchor="middle" font-size="10">${skill.name}</text>
            <text x="${barX + barWidth / 2}" y="${barY - 5}" text-anchor="middle" font-size="10">${skill.amount}</text>`;
    });

    graph2.innerHTML = svg


}