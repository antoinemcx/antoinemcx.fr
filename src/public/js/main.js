// THEMES
const dayNight = document.querySelector('.day-night');

dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle("fa-moon");
    dayNight.querySelector('i').classList.toggle("fa-sun");

    document.body.classList.toggle("light")
    if(document.body.classList.contains('light')) {
        if (getCookie("acceptCookies")) { cookie('theme', 'light') }
    } else {
        if (getCookie("acceptCookies")) { cookie('theme', 'dark') }
    }
})

window.addEventListener('load', () => {
    if(getCookie('theme') === 'light') {
        dayNight.querySelector('i').classList.toggle("fa-moon");
        document.body.classList.toggle("light")
    }

    if(document.body.classList.contains('light')) {
        dayNight.querySelector('i').classList.add('fa-moon');
        if (getCookie("acceptCookies")) { cookie('theme', 'light') }
    } else {
        dayNight.querySelector('i').classList.add('fa-sun');
        if (getCookie("acceptCookies")) { cookie('theme', 'dark') }
    }

    // COOKIES ALERT
    "use strict";
    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");
    
    if (!cookieAlert) { return; }
    cookieAlert.offsetHeight;
    
    if (!getCookie("acceptCookies")) { cookieAlert.classList.add("show"); }
    
    acceptCookies.addEventListener("click", function () {
        cookie("acceptCookies", true);
        cookieAlert.classList.remove("show");
    
        window.dispatchEvent(new Event("cookieAlertAccept"))
    });
})


function cookie(name, value) {
    let date = new Date();
    date.setTime(date.getTime()+(365*24*60*60*1000));

    document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=/`;
}

function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(var i=0; i<cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if(c.indexOf(`${name}=`) == 0) {
            return c.substring(`${name}=`.length, c.length);
        }
    }
    return null
}