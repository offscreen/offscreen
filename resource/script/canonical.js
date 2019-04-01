var link = document.createElement('link');
link.setAttribute('rel', 'canonical');
link.setAttribute('href', location.protocol + '://' + location.host + location.pathname);
document.head.appendChild(link);