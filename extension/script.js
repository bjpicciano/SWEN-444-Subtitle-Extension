$(document).ready(function() {
    chrome.storage.sync.get('isOn', function(data) {
        // this is called after the retrieve.
        $("#onoffswitch").prop("checked", data['isOn']);
        checkCaptionsState();
    });

    chrome.storage.sync.get('data', function(data) {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, data.data);
        });
    });

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

$("#help").on("click", function() {
    $('.help-screen').show();
    $(this).closest(".screen").toggle("slide", {direction: "up"});
});

$("#transcribe-icon").on("click", function() {
    window.open('http://localhost:8080/editor.html', '_blank');
});

$("#save-customization").on("click", function() {
    let fontColor = document.getElementById("font-color-picker").value;
    let bkgdColor = document.getElementById("background-color-picker").value;
    // let fontSize = document.getElementById("font-size").options[this.selectedIndex].value;
    // let transparency = document.getElementById("transparency").value;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        var data = {"message": "customize-subs", "fontColor": fontColor, "bkgdColor": bkgdColor};
        chrome.storage.sync.set({'data': data});

        chrome.tabs.sendMessage(activeTab.id, data);
    });
});

function checkCaptionsState() {

    let on = $("#onoffswitch").is(':checked');
    chrome.storage.sync.set({"isOn": on});
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "toggle", "value":  on});
    });
};


document.addEventListener("DOMContentLoaded", function() {
    $("#onoffswitch").change(checkCaptionsState);
});
