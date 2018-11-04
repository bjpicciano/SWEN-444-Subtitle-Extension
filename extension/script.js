
$("#profile-icon").on("click", function() {
    $('.home-screen').hide();
    $('.profile-screen').toggle("slide", {direction: "down"});
});

$("#settings-icon").on("click", function() {
    $('.home-screen').hide();
    $('.settings-screen').toggle("slide", {direction: "down"});
});

$("#transcribe-icon").on("click", function() {
});

$(".back").on("click", function() {
    $('.home-screen').show();
    $(this).closest(".screen").toggle("slide", {direction: "up"});
});
