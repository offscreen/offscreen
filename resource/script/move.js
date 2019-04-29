$(document).ready(function() {
    $('#move-up').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, '1500');
        return false;
    });
    $('#move-down').click(function() {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, '1500');
        return false;
    });
});