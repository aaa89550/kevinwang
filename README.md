# Kevin Wang - Personal Website

A minimalist black and white personal portfolio website for writer and literary translator Kevin Wang.

## Features

- **Clean Design**: Minimalist black and white aesthetic
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Single Page Application**: Smooth navigation between sections without page reloads
- **Keyboard Navigation**: Use arrow keys or number keys (1-5) to navigate sections
- **Print Friendly**: Optimized print styles for each section
- **Accessibility**: Semantic HTML and keyboard-friendly navigation

## Structure

```
personal-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet with minimalist design
├── js/
│   └── script.js       # JavaScript for navigation and interactions
└── README.md           # This file
```

## Sections

1. **About** - Personal biography and background
2. **Writing** - Published translations, reviews, and pitching work
3. **Events** - Workshops, talks, and speaking engagements
4. **Projects** - Collaborative projects and editorial board positions
5. **Press** - Media appearances and press coverage

## Navigation

- **Top Navigation**: Fixed navigation bar with links to all sections (right-aligned)
- **Keyboard Shortcuts**:
  - Arrow keys or number keys (1-5) to navigate between sections
  - Ctrl/Cmd + P to print current section
- **URL Support**: Direct linking to sections via URL hash (e.g., `#writing`)

## Design Philosophy

The design emphasizes:
- **Typography**: Clean, readable fonts with careful spacing
- **Minimalism**: Black text on white background with subtle dividers
- **Content Focus**: Design that doesn't distract from the content
- **Professional Aesthetic**: Suitable for academic and literary contexts

## Technical Features

- **Smooth Animations**: Fade-in effects and smooth transitions
- **SEO Friendly**: Proper HTML structure and meta tags
- **Performance**: Lightweight with minimal dependencies
- **Cross-browser**: Compatible with modern web browsers

## How to Use

1. Open `index.html` in a web browser
2. Navigate using the top menu or keyboard shortcuts
3. Content is organized in logical sections for easy browsing
4. Use browser's back/forward buttons to navigate history

## Local Development

To run locally with a web server:

```bash
# Navigate to the project directory
cd personal-website

# Start a local server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx http-server

# Open http://localhost:8000 in your browser
```

## Customization

The website is easily customizable:

- **Content**: Edit the HTML sections in `index.html`
- **Styling**: Modify colors, fonts, and layout in `css/style.css`
- **Functionality**: Add features in `js/script.js`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

*Created with focus on clean design and user experience for showcasing academic and literary work.*