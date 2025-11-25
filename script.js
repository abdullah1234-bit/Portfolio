document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Fetch GitHub Projects
    fetchProjects();
});

async function fetchProjects() {
    const username = 'abdullah1234-bit';
    const projectsGrid = document.getElementById('projects-grid');

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        const repos = await response.json();
        projectsGrid.innerHTML = ''; // Clear loading text

        const excludedProjects = [
            'machine-learning-model-deployment-render',
            'Agent',
            'Data-analysis-project'
        ];

        const filteredRepos = repos.filter(repo => !excludedProjects.includes(repo.name));

        filteredRepos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-img"><img src="assets/project-placeholder.png" alt="${repo.name}"></div>
                <div class="project-info">
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <div class="project-tags"><span>${repo.language || 'Code'}</span></div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i></a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsGrid.innerHTML = '<p>Failed to load projects. Please check back later.</p>';
    }
}
