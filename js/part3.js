$(document).ready(function () {
    $("#open_popup").hover(function () {
        $(".popup_altitude").css("display", "block");
    }, function () {
        $(".popup_altitude").css("display", "none");
    });
});