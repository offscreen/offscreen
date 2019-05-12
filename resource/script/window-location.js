window.onload = function() {
    document.getElementById('gturl').value = window.location.href;
    document.getElementById('hash').value = window.location.hash;
    document.getElementById('host').value = window.location.host;
    document.getElementById('hostname').value = window.location.hostname;
    document.getElementById('href').value = window.location.href;
    document.getElementById('origin').value = window.location.origin;
    document.getElementById('pathname').value = window.location.pathname;
    document.getElementById('port').value = window.location.port;
    document.getElementById('protocol').value = window.location.protocol;
    document.getElementById('search').value = window.location.search;
    document.getElementById('source').value = 'view-source:'+window.location.search;
}
