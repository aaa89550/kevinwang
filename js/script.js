// Keep navigation simple; old #events and #press links still work.
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const glyph = document.querySelector('.name-glyph');

    function showSection(requestedId, scroll = false) {
        const id = Array.from(sections).some(section => section.id === requestedId)
            ? requestedId : 'about';
        sections.forEach(section => section.classList.toggle('active', section.id === id));
        navLinks.forEach(link => {
            const active = link.dataset.section === id;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
        if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    }

    navLinks.forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        const id = link.dataset.section;
        if (window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
        showSection(id, true);
    }));
    const restoreSection = () => showSection(window.location.hash.slice(1), true);
    window.addEventListener('popstate', restoreSection);
    window.addEventListener('hashchange', restoreSection);
    showSection(window.location.hash.slice(1));

    if (glyph) glyph.addEventListener('click', () => {
        const open = glyph.classList.toggle('is-open');
        glyph.setAttribute('aria-pressed', String(open));
        glyph.setAttribute('aria-label', open
            ? 'Hatchet and mouth: restore 可'
            : '可: reveal a hatchet and a mouth');
    });
});
