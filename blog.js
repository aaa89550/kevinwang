// Blog Management System
// Simple JSON-based blog system for static hosting

class BlogManager {
    constructor() {
        this.posts = [];
        this.loadPosts();
    }

    // Load posts from localStorage or initialize with sample data
    loadPosts() {
        const savedPosts = localStorage.getItem('blogPosts');
        if (savedPosts) {
            this.posts = JSON.parse(savedPosts);
        } else {
            // Initialize with sample posts
            this.posts = [
                {
                    id: 1,
                    title: {
                        en: "Welcome to My Blog",
                        zh: "歡迎來到我的部落格"
                    },
                    date: "2025-09-11",
                    excerpt: {
                        en: "This is where I'll share thoughts on translation, literature, and cross-cultural communication.",
                        zh: "在這裡我將分享關於翻譯、文學和跨文化交流的思考。"
                    },
                    content: {
                        en: `<p>Welcome to my blog! This space will serve as a platform for sharing insights about the art of translation, literary exploration, and the fascinating world of cross-cultural communication.</p>
                        <p>As a translator working between English and Chinese, I often find myself navigating the delicate balance between fidelity and creativity, between preserving the original voice and making it accessible to a new audience.</p>
                        <p>I look forward to sharing this journey with you.</p>`,
                        zh: `<p>歡迎來到我的部落格！這個空間將作為分享翻譯藝術、文學探索和跨文化交流見解的平台。</p>
                        <p>作為一名在中英文之間工作的翻譯者，我經常發現自己在忠實性與創造性之間、在保持原作聲音與讓新讀者理解之間尋找微妙的平衡。</p>
                        <p>我期待與您分享這個旅程。</p>`
                    },
                    slug: "welcome-to-my-blog"
                },
                {
                    id: 2,
                    title: {
                        en: "On Literary Translation",
                        zh: "論文學翻譯"
                    },
                    date: "2025-09-15",
                    excerpt: {
                        en: "Reflections on the art and craft of bringing literature across languages and cultures.",
                        zh: "關於將文學跨越語言和文化的藝術與技巧的思考。"
                    },
                    content: {
                        en: `<p>Literary translation is often described as an impossible art—the attempt to recreate not just meaning, but voice, rhythm, and cultural nuance in an entirely different linguistic system.</p>
                        <p>Every translation is an interpretation, a reading of the original text through the lens of another language and culture. This is both the challenge and the beauty of our work.</p>
                        <p>In my experience working with contemporary Taiwanese and Japanese literature, I've found that the most successful translations are those that honor the spirit of the original while finding natural expression in the target language.</p>`,
                        zh: `<p>文學翻譯常被形容為一門不可能的藝術——試圖在完全不同的語言系統中重現的不僅是意義，還有聲音、節奏和文化細節。</p>
                        <p>每個翻譯都是一種詮釋，是通過另一種語言和文化的鏡頭對原文的閱讀。這既是我們工作的挑戰，也是其美妙之處。</p>
                        <p>在我處理當代台灣和日本文學的經驗中，我發現最成功的翻譯是那些既尊重原作精神，又在目標語言中找到自然表達的作品。</p>`
                    },
                    slug: "on-literary-translation"
                }
            ];
            this.savePosts();
        }
    }

    // Save posts to localStorage
    savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }

    // Add new post
    addPost(postData) {
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toISOString().split('T')[0]
        };
        this.posts.unshift(newPost);
        this.savePosts();
        this.renderBlogPosts();
        return newPost;
    }

    // Get all posts
    getAllPosts() {
        return this.posts;
    }

    // Get post by slug
    getPostBySlug(slug) {
        return this.posts.find(post => post.slug === slug);
    }

    // Render blog posts in the DOM
    renderBlogPosts() {
        const blogContainer = document.querySelector('.blog-posts');
        if (!blogContainer) return;

        const currentLang = document.querySelector('.lang-current').textContent === 'EN' ? 'en' : 'zh';
        
        blogContainer.innerHTML = this.posts.map(post => `
            <article class="blog-post" data-slug="${post.slug}">
                <h2 class="post-title">${post.title[currentLang]}</h2>
                <div class="post-meta">${this.formatDate(post.date, currentLang)}</div>
                <div class="post-excerpt">
                    <p>${post.excerpt[currentLang]}</p>
                </div>
                <a href="#" class="read-more" onclick="blogManager.showFullPost('${post.slug}')">${currentLang === 'en' ? 'Read more' : '閱讀更多'}</a>
            </article>
        `).join('');
    }

    // Format date based on language
    formatDate(dateString, lang) {
        const date = new Date(dateString);
        if (lang === 'zh') {
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        } else {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
    }

    // Show full post (could open modal or navigate to full post page)
    showFullPost(slug) {
        const post = this.getPostBySlug(slug);
        if (!post) return;

        const currentLang = document.querySelector('.lang-current').textContent === 'EN' ? 'en' : 'zh';
        
        // Create modal for full post
        const modal = document.createElement('div');
        modal.className = 'post-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.post-modal').remove()">&times;</button>
                <article class="full-post">
                    <h1>${post.title[currentLang]}</h1>
                    <div class="post-meta">${this.formatDate(post.date, currentLang)}</div>
                    <div class="post-content">${post.content[currentLang]}</div>
                </article>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'modal-styles';
            modalStyles.textContent = `
                .post-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                }
                
                .modal-content {
                    position: relative;
                    background: white;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    margin: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    background: #f5f5f5;
                    color: #333;
                }
                
                .full-post {
                    padding: 3rem;
                }
                
                .full-post h1 {
                    font-size: 2rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    color: #1a1a1a;
                }
                
                .full-post .post-meta {
                    color: #666;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .full-post .post-content {
                    line-height: 1.7;
                    color: #333;
                }
                
                .full-post .post-content p {
                    margin-bottom: 1.5rem;
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        margin: 1rem;
                        max-height: 95vh;
                    }
                    
                    .full-post {
                        padding: 2rem;
                    }
                    
                    .full-post h1 {
                        font-size: 1.5rem;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }
    }

    // Update posts when language changes
    updateLanguage() {
        this.renderBlogPosts();
    }
}

// Initialize blog manager
let blogManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    blogManager = new BlogManager();
    blogManager.renderBlogPosts();
    
    // Update blog posts when language changes
    const originalUpdateLanguage = window.updateLanguage;
    if (typeof originalUpdateLanguage === 'function') {
        window.updateLanguage = function(lang) {
            originalUpdateLanguage(lang);
            blogManager.updateLanguage();
        };
    }
});

// Admin functions for adding posts (for development/content management)
function createNewPost(titleEn, titleZh, excerptEn, excerptZh, contentEn, contentZh, slug) {
    if (!blogManager) {
        console.error('Blog manager not initialized');
        return;
    }
    
    const postData = {
        title: {
            en: titleEn,
            zh: titleZh
        },
        excerpt: {
            en: excerptEn,
            zh: excerptZh
        },
        content: {
            en: contentEn,
            zh: contentZh
        },
        slug: slug || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    };
    
    return blogManager.addPost(postData);
}

// Example usage (uncomment to add a new post):
/*
createNewPost(
    "The Challenge of Cultural Context",
    "文化語境的挑戰",
    "How cultural references pose unique challenges in literary translation.",
    "文化參考在文學翻譯中帶來的獨特挑戰。",
    "<p>One of the most complex aspects of literary translation involves navigating cultural references...</p>",
    "<p>文學翻譯最複雜的方面之一涉及處理文化參考...</p>",
    "cultural-context-challenge"
);
*/
