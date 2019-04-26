(function() {
    var obf = document.getElementById('ob');
    obf.onclick = function() {
        window.open(document.getElementById('slash-i').value + document.getElementById('ab').value + document.getElementById('slash-ii').value + document.getElementById('tb').value + document.getElementById('slash-iii').value + document.getElementById('cb').value + document.getElementById('slash-iv').value);
        return true;
    };
})();