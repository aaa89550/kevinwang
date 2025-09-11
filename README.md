# Kevin Wang - Personal Brand Website

A minimalist black and white personal brand website for writer and translator Kevin Wang.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Bilingual Support**: Toggle between English and Traditional Chinese
- **Four Main Sections**:
  - **About**: Personal introduction, photo, and featured works
  - **Portfolio**: Grid-style presentation of all works
  - **Blog**: Dynamic blog system for articles and thoughts
  - **Contact**: Professional contact information with location, email, social media, and specializations

## Design Principles

- **American Minimalist Style**: Clean, black and white aesthetic
- **Typography-focused**: Uses Inter font family for optimal readability
- **Smooth Interactions**: Subtle animations and transitions
- **Performance Optimized**: Lightweight, fast-loading static site

## Getting Started

1. **Local Development**:
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

2. **Deployment**:
   - Upload all files to your web hosting service
   - Compatible with GitHub Pages, Netlify, Vercel, etc.

## Content Management

### Adding Blog Posts

You can add new blog posts programmatically using the blog management system:

```javascript
// Open browser console and use:
createNewPost(
    "English Title",
    "中文標題", 
    "English excerpt...",
    "中文摘要...",
    "<p>English content...</p>",
    "<p>中文內容...</p>",
    "url-slug"
);
```

### Updating Personal Information

Edit the content in `index.html`:
- Update bio text in the hero section
- Modify portfolio items
- Change contact information in the Contact section
- Update social media links and location details

### Customizing Styles

Edit `styles.css` to modify:
- Color scheme
- Typography
- Layout and spacing
- Responsive breakpoints

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── blog.js             # Blog management system
└── README.md           # This file
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

Possible additions:
- Dark mode toggle
- RSS feed for blog
- Search functionality
- Contact form
- Social media integration
- Analytics integration

## License

All rights reserved © 2025 Kevin Wang

---

For questions or support, contact: kevinwang13@gmail.com