/*!
 * slideshow v1.0.0
 * http://marcmateos.blogspot.com/2011/11/crear-un-slideshow-de-fotografias-con.html
 *
 * Copyright 2011, Marc Mateos
 * Released under the GPL Licenses.
 *
 * Date: Thu Nov 15 19:32:60 2011 +0100
 */

function changeRapidLink() {
    rapidLinkAnterior = rapidLinkActual;
    if(rapidLinkActual < totalRapidLinks-1) {
        rapidLinkActual++;
    } else {
        rapidLinkActual = 0;
    }
    animateChangeRapidLink();
}

function animateChangeRapidLink() {
    $(imgDIV+rapidLinkAnterior).fadeTo(secsOfTrans*1000,0,function() { evalRapidLinks(); });
}

function evalRapidLinks() {
    $(imgDIV+rapidLinkActual).fadeTo(secsOfTrans*1000,1);
    $(rapidLnkDIV+rapidLinkAnterior).attr("class","rapidlink");
    $(rapidLnkDIV+rapidLinkActual).attr("class","rapidlink-selected");
}

function initRapidLinks() {
    if(totalRapidLinks > 0) animationInterval = setInterval("changeRapidLink()",secsOfDelay*1000);
}

function userChangeRapidLink(selectedRapidLink) {
    rapidLinkAnterior = rapidLinkActual;
    rapidLinkActual = selectedRapidLink;
    
    clearInterval(animationInterval);
    animationInterval = setInterval("changeRapidLink()",secsOfDelay*1000);
    animateChangeRapidLink();
}

function initItem() {
    itemsLoaded++;
    if(itemsLoaded == totalRapidLinks) {
        $(imgDIV+rapidLinkActual).fadeTo(secsOfTrans*1000,1,function() { initRapidLinks(); });
    }
}

var secsOfDelay = 5;
var secsOfTrans = 1;
var contDIV = "#slideshow";
var imgDIV = contDIV+" #img-";
var rapidLnkDIV = contDIV+" #rapidlinks-btns #rapidlink-";

var animationInterval;
var rapidLinkAnterior = 0;
var rapidLinkActual = 0;
var totalRapidLinks = 4;
var itemsLoaded = 0;

$(imgDIV+rapidLinkActual).ready(function() {
    for(var i = 0;i < totalRapidLinks;i++) {
        $(imgDIV+i).fadeTo(1,0,function() {
            $(this).css("visibility","visible");
            initItem();
        });
    }
});