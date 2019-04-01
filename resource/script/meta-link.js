var canonical = document.createElement('link');
canonical.setAttribute('rel', 'canonical');
canonical.setAttribute('href', location.protocol + '//' + location.host + location.pathname);
document.head.appendChild(canonical);

var me = document.createElement('link');
me.setAttribute('rel', 'me');
me.setAttribute('href', location.protocol + '//' + location.host);
document.head.appendChild(me);

var preconnect = document.createElement('link');
preconnect.setAttribute('rel', 'preconnect');
preconnect.setAttribute('href', location.protocol + '//' + location.host);
document.head.appendChild(preconnect);

var dnsprefetch = document.createElement('link');
dnsprefetch.setAttribute('rel', 'dns-prefetch');
dnsprefetch.setAttribute('href', location.protocol + '//' + location.host);
document.head.appendChild(dnsprefetch);

var prerender = document.createElement('link');
prerender.setAttribute('rel', 'prerender');
prerender.setAttribute('href', location.protocol + '//' + location.host);
document.head.appendChild(prerender);

var publisher = document.createElement('link');
publisher.setAttribute('rel', 'publisher');
publisher.setAttribute('href', location.protocol + '//' + location.host);
document.head.appendChild(publisher);