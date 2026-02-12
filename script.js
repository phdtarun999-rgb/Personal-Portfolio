
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSkills();
});

function addProject() {
    const name = document.getElementById('projectName').value.trim();
    const desc = document.getElementById('projectDesc').value.trim();
    const github = document.getElementById('projectGithub').value.trim();
    const live = document.getElementById('projectLive').value.trim();

    if (!name || !desc || !github) {
        alert('Please fill in all required fields');
        return;
    }

    const project = { name, desc, github, live, id: Date.now() };
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectGithub').value = '';
    document.getElementById('projectLive').value = '';

    loadProjects();
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-body">
                <h3>${project.name}</h3>
                <p>${project.desc}</p>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="github">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.live ? `<a href="${project.live}" target="_blank" class="live">
                        <i class="fas fa-globe"></i> Live
                    </a>` : ''}
                </div>
                <button class="delete-btn" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
}

function addSkill() {
    const skill = document.getElementById('skillInput').value.trim();
    if (!skill) {
        alert('Please enter a skill');
        return;
    }

    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    if (!skills.includes(skill)) {
        skills.push(skill);
        localStorage.setItem('skills', JSON.stringify(skills));
        document.getElementById('skillInput').value = '';
        loadSkills();
    } else {
        alert('Skill already added');
    }
}


function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const display = document.getElementById('skillsDisplay');
    display.innerHTML = '';

    skills.forEach(skill => {
        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.innerHTML = `
            ${skill}
            <button onclick="deleteSkill('${skill}')">×</button>
        `;
        display.appendChild(badge);
    });
}

function deleteSkill(skill) {
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    skills = skills.filter(s => s !== skill);
    localStorage.setItem('skills', JSON.stringify(skills));
    loadSkills();
}

function downloadResume() {
    const file = document.getElementById('resumeFile').files[0];
    if (file) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.click();
    } else {
        alert('Please upload a resume first');
    }
}


function downloadJSON() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const skills = JSON.parse(localStorage.getItem('skills')) || [];

    const data = {
        name: 'Your Name',
        email: 'your.email@example.com',
        projects,
        skills,
        downloadedAt: new Date().toLocaleString()
    };

    const link = document.createElement('a');
    link.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(data, null, 2));
    link.download = 'portfolio-data.json';
    link.click();
}


function downloadCSV() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    let csv = 'Skill\n';
    skills.forEach(skill => {
        csv += skill + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv,' + encodeURIComponent(csv);
    link.download = 'skills.csv';
    link.click();
}


function sendMessage(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.getElementById('skillInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSkill();
});
