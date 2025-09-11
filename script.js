// Simple immediate fallback - show content after 8 seconds regardless of other logic
setTimeout(() => {
    const bootScreen = document.getElementById('bootScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (bootScreen) {
        bootScreen.style.display = 'none';
    }
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
    }
    
    // Also ensure home section is active
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    console.log('Fallback: Content shown after 8 seconds');
}, 8000);

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing boot screen...');
    
    // Boot Screen Animation
    const bootScreen = document.getElementById('bootScreen');
    const mainContent = document.getElementById('mainContent');
    
    console.log('Boot screen element:', bootScreen);
    console.log('Main content element:', mainContent);
    
    // Initialize first section as active
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        console.log('Home section activated');
    }
    
    // Function to hide boot screen
    function hideBootScreen() {
        console.log('Hiding boot screen...');
        if (bootScreen) {
            bootScreen.style.display = 'none';
        }
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
        }
        console.log('Boot screen hidden, main content shown');
    }
    
    // Boot sequence timing
    console.log('Setting boot timer...');
    const bootTimer = setTimeout(() => {
        console.log('Boot timer triggered');
        hideBootScreen();
    }, 7000); // Show boot screen for 7 seconds to let animations complete
    
    // Allow user to skip boot screen by clicking or pressing any key
    if (bootScreen) {
        bootScreen.addEventListener('click', () => {
            console.log('Boot screen clicked');
            clearTimeout(bootTimer);
            hideBootScreen();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (bootScreen && bootScreen.style.display !== 'none') {
            console.log('Key pressed, skipping boot screen');
            clearTimeout(bootTimer);
            hideBootScreen();
        }
    });

    // Language toggle functionality
    const langToggle = document.getElementById('langToggle');
    const langCurrent = document.querySelector('.lang-current');
    const langAlt = document.querySelector('.lang-alt');
    let isEnglish = true;

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Mobile menu functionality
    const navToggle = document.getElementById('navToggle');
    const navContent = document.getElementById('navContent');

    // Handle mobile menu toggle
    if (navToggle && navContent) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.style.overflow = navContent.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navContent.contains(e.target)) {
                navToggle.classList.remove('active');
                navContent.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Language toggle functionality (currently disabled)
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            // Language switching functionality disabled for now
            // Uncomment the code below to re-enable bilingual support
            /*
            isEnglish = !isEnglish;
            
            if (isEnglish) {
                langCurrent.textContent = 'EN';
                langAlt.textContent = '中';
                updateLanguage('en');
            } else {
                langCurrent.textContent = '中';
                langAlt.textContent = 'EN';
                updateLanguage('zh');
            }
            */
        });
    }

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-zh]');
        
        elements.forEach(element => {
            if (lang === 'en') {
                element.textContent = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-zh');
            }
        });
    }

    // Handle hash changes for direct linking
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`[data-section="${hash}"]`);
            if (targetLink) {
                navLinks.forEach(nl => nl.classList.remove('active'));
                targetLink.classList.add('active');
                
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(hash).classList.add('active');
            }
        }
    }

    // Handle browser back/forward
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial hash
    handleHashChange();

    // Smooth scrolling for anchor links
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

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // Add loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });

    // Add intersection observer for scroll animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.work-item, .portfolio-item, .blog-post');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some utility functions for future blog functionality
function addBlogPost(title, date, excerpt, content) {
    const blogPosts = document.querySelector('.blog-posts');
    const postElement = document.createElement('article');
    postElement.className = 'blog-post';
    
    postElement.innerHTML = `
        <h2 class="post-title">${title}</h2>
        <div class="post-meta">${date}</div>
        <div class="post-excerpt">
            <p>${excerpt}</p>
        </div>
        <a href="#" class="read-more">Read more</a>
    `;
    
    blogPosts.insertBefore(postElement, blogPosts.firstChild);
}

// Theme toggle functionality (for future dark mode)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}
