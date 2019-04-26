(function() {
    var obf = document.getElementById('ob');
    obf.onclick = function() {
        window.open('/' + document.getElementById('ab').value + '/' + document.getElementById('tb').value + '/');
        return true;
    };
})();