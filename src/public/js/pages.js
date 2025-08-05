let projects = document.getElementById("projects");
let userinfo = document.getElementById("userinfo");
let contact = document.getElementById("contact");
let userinfoContent = document.getElementById("userinfoContent");
let projectsContent = document.getElementById("projectsContent");
let contactContent = document.getElementById("contactContent");

userinfo.addEventListener("click", function(e) {
    if(!e.target.className) {
        userinfo.classList.add("active")
        userinfoContent.style.display = "block"

        projects.classList.remove("active")
        contact.classList.remove("active")
        projectsContent.style.display = "none"
        contactContent.style.display = "none"
    }
})
projects.addEventListener("click", function(e) {
    if(!e.target.className) { 
        projects.classList.add("active")
        projectsContent.style.display = "block"

        userinfo.classList.remove("active")
        contact.classList.remove("active")
        userinfoContent.style.display = "none"
        contactContent.style.display = "none"
    }
})
contact.addEventListener("click", function(e) {
    if(!e.target.className) { 
        contact.classList.add("active")
        contactContent.style.display = "block"

        userinfo.classList.remove("active")
        projects.classList.remove("active")
        userinfoContent.style.display = "none"
        projectsContent.style.display = "none"
    }
})