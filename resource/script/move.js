$(document).ready(function() {
    $('#move-up').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
        return false;
    });
    $('#move-down').click(function() {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'fast');
        return false;
    });
});