$(document).ready(function() {
    $('#move-up').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });
    $('#move-down').click(function() {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow');
        return false;
    });
});