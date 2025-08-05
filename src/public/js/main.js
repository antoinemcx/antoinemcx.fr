const allSkeleton = document.querySelectorAll('.skeleton');
// THEMES
const dayNight = document.querySelectorAll('.day-night');

window.addEventListener('load', () => {
    if (getCookie('theme') === 'dark') {
        dayNight.forEach(daynight => daynight.querySelector('i').classList.toggle("fa-sun") );
        document.body.classList.toggle("light")
    }

    if (document.body.classList.contains('light')) {
        dayNight.forEach(daynight => daynight.querySelector('i').classList.add('fa-moon') );
        if (getCookie("acceptCookies")) { cookie('theme', 'light') }
    } else {
        dayNight.forEach(daynight => daynight.querySelector('i').classList.add('fa-sun') );
        if (getCookie("acceptCookies")) { cookie('theme', 'dark') }
    }

    // SKELETON LOADING
    allSkeleton.forEach(item => {
        item.classList.remove('skeleton');
    })

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

dayNight.forEach(daynight => daynight.addEventListener('click', () => {
    dayNight.forEach(daynight => daynight.querySelector('i').classList.toggle("fa-moon") );
    dayNight.forEach(daynight => daynight.querySelector('i').classList.toggle("fa-sun") );

    document.body.classList.toggle("light")
    if (document.body.classList.contains('light')) {
        if (getCookie("acceptCookies")) { cookie('theme', 'light') }
    } else {
        if (getCookie("acceptCookies")) { cookie('theme', 'dark') }
    }
}))


function cookie(name, value) {
    let date = new Date();
    date.setTime(date.getTime()+(365*24*60*60*1000));

    document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=/; domain=${window.location.hostname}`;
}

function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(var i=0; i<cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(`${name}=`) == 0) {
            return c.substring(`${name}=`.length, c.length);
        }
    }
    return null
}


// MOBILE NAV
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// SCROLL DOWN
$(function() {
    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        if (['#projects', '#contact'].includes(e.currentTarget.hash) && e.currentTarget.baseURI.split('/').pop('/').length > 1) {
            console.log('e')
            window.location.href = window.location.origin + e.currentTarget.hash
        } else {
            if ($($(this).attr('href')).offset() === undefined) { return }
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear').catch(() => {});
        }
    });
});

// BACK TO TOP
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        if (navMenu.classList.contains('active') === true) { closeMenu() }
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});


// REVEAL EFFECT
const handleIntersect = function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > .1) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    })
}
const observer = new IntersectionObserver(handleIntersect, { root: null, rootMargin: '0px', threshold: .1 });
document.querySelectorAll('[class*="reveal"]').forEach(function(r) { observer.observe(r) });


// LOGIN SHOW/HIDE PASSWORD
const showPassword = $('#showPassword');
const passwordField = $('.password');
showPassword.click(function() {
    if (passwordField.attr('type') === "password") {
        passwordField.attr('type', 'text')
        showPassword.addClass('fa-eye').removeClass('fa-eye-slash')
    } else {
        passwordField.attr('type', 'password')
        showPassword.addClass('fa-eye-slash').removeClass('fa-eye')
    }
})