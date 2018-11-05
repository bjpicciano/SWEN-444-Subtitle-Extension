
$(document).ready(function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    $("#date").text(today);
});

$("#profile-icon").on("click", function() {
    $('.home-screen').hide();
    $('.profile-screen').toggle("slide", {direction: "down"});
});

$("#settings-icon").on("click", function() {
    $('.home-screen').hide();
    $('.settings-screen').toggle("slide", {direction: "down"});
});


$(".back").on("click", function() {
    $('.home-screen').show();
    $(this).closest(".screen").toggle("slide", {direction: "up"});
});
