// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');
const logoLink = document.querySelector('.logo a');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active section from URL hash or default to 'about'
    const hash = window.location.hash.substring(1) || 'about';
    showSection(hash);
    updateActiveNavLink(hash);
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            updateActiveNavLink(targetSection);
            
            // Update URL hash
            history.pushState(null, null, `#${targetSection}`);
        });
    });
    
    // Add click event listener to logo
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('about');
            updateActiveNavLink('about');
            
            // Update URL hash
            history.pushState(null, null, '#about');
        });
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'about';
        showSection(hash);
        updateActiveNavLink(hash);
    });
});

// Show specific section
function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    // Scroll to top of page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Only handle keyboard navigation if no input is focused
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
        return;
    }
    
    const currentSection = document.querySelector('.section.active');
    const currentId = currentSection ? currentSection.id : 'about';
    const sectionOrder = ['about', 'writing', 'events', 'projects', 'press'];
    const currentIndex = sectionOrder.indexOf(currentId);
    
    let nextIndex = currentIndex;
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % sectionOrder.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
    }
    
    // Number key navigation (1-5)
    const numKey = parseInt(e.key);
    if (numKey >= 1 && numKey <= 5) {
        nextIndex = numKey - 1;
    }
    
    if (nextIndex !== currentIndex) {
        const nextSection = sectionOrder[nextIndex];
        showSection(nextSection);
        updateActiveNavLink(nextSection);
        history.pushState(null, null, `#${nextSection}`);
    }
});

// Add fade-in animation observer for content elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content items for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.work-item, .event-item, .project-item, .press-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility function to get current section
function getCurrentSection() {
    return document.querySelector('.section.active')?.id || 'about';
}

// Print functionality
function printCurrentSection() {
    const currentSection = getCurrentSection();
    const printContent = document.querySelector(`#${currentSection}`).innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kevin Wang - ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <div class="container">
                ${printContent}
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Add print shortcut (Ctrl+P or Cmd+P)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printCurrentSection();
    }
});