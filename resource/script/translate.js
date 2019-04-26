(function() {
    var b = document.getElementById('gt');
    b.onclick = function() {
        window.open('https://translate.google.com/translate?hl=en&sl=' + document.getElementById('sl').value + '&tl=' + document.getElementById('tl').value + '&u=' + encodeURIComponent(location.href) + '');
        return false;
    };
})();