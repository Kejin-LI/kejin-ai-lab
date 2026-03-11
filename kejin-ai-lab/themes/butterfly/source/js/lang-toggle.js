(function() {
  const createButton = (id, iconClass, title, onClick, text = null) => {
    if (document.getElementById(id)) return;

    const btn = document.createElement('button');
    btn.id = id;
    btn.type = 'button';
    btn.title = title;
    
    // Explicit Styling
    Object.assign(btn.style, {
      width: '35px',
      height: '35px',
      backgroundColor: '#49b1f5',
      color: '#fff',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '5px',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      opacity: '1',
      pointerEvents: 'auto'
    });

    if (text) {
      btn.textContent = text;
    } else if (iconClass) {
      const i = document.createElement('i');
      i.className = iconClass;
      // Ensure icon color is white
      i.style.color = '#fff';
      btn.appendChild(i);
    }

    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    };

    return btn;
  };

  const initCustomRightside = () => {
    const rightside = document.getElementById('rightside');
    if (!rightside) return;

    // 1. Language Toggle Button
    const path = window.location.pathname;
    const isEn = path.startsWith('/en/');
    
    const langBtn = document.createElement('button');
    langBtn.id = 'lang-toggle-btn';
    // Style settings...
    Object.assign(langBtn.style, {
      width: '35px',
      height: '35px',
      backgroundColor: '#49b1f5',
      color: '#fff',
      borderRadius: '5px',
      marginBottom: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    langBtn.textContent = isEn ? '中' : 'En';
    
    langBtn.onclick = () => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/en/')) {
        window.location.href = currentPath.replace('/en/', '/');
      } else {
        // Handle root path specifically or append /en/
        window.location.href = '/en' + (currentPath === '/' ? '/' : currentPath);
      }
    };

    // 2. Hide Aside Button (Width Adjustment)
    const asideBtn = createButton('custom-aside-btn', 'fas fa-arrows-alt-h', 'Toggle Sidebar', () => {
      const html = document.documentElement;
      html.classList.toggle('hide-aside');
      // Dispatch resize event for charts/canvas
      window.dispatchEvent(new Event('resize'));
    });

    // Insert buttons in order (from bottom to top logic, but insertBefore puts at top)
    // We want order: [Lang] -> [Aside] -> [Top]
    // So we insert Aside first (above Top), then Lang first (above Aside).
    
    // Check if they exist to avoid re-inserting
    if (asideBtn && !document.getElementById('custom-aside-btn')) {
      rightside.insertBefore(asideBtn, rightside.firstChild);
    }
    
    if (langBtn && !document.getElementById('lang-toggle-btn')) {
      rightside.insertBefore(langBtn, rightside.firstChild);
    }
  };

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomRightside);
  } else {
    initCustomRightside();
  }
  document.addEventListener('pjax:complete', initCustomRightside);
})();
