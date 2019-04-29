(function() {
    var clock = document.getElementById('clock');
    setInterval(function() {
        var time = new Date().toString().split(' ')[4];
        clock.innerHTML = time;
    }, 13);
})();