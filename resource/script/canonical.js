var canonical = document.createElement('link');
canonical.setAttribute('rel', 'canonical');
canonical.setAttribute('href', location.protocol + '://' + location.host + location.pathname);
document.head.appendChild(canonical);