// HORIZONTAL NAVIGATION
function active(el) {
    let active = $('.current');
    let element = $(`#${el}`);

    if (element.hasClass('current') === true) { return }
    else {
        element.addClass('current');
        active.removeClass('current');
    }
}

window.onscroll = function() {
    var scroll_x = window.pageYOffset;
    var skillsYOffset = document.getElementById('skills').offsetParent.offsetTop + (document.getElementById('skills').offsetHeight + 225);
    var projectsYOffset = skillsYOffset + (document.getElementById('projects').offsetHeight + 225);
    if (scroll_x < skillsYOffset) {
        active('one')
    } else if (scroll_x > skillsYOffset && scroll_x < projectsYOffset) {
        active('two')
    } else if (scroll_x > projectsYOffset) { active('three') }
}