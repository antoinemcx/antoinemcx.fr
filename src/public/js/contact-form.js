$(document).ready(function() {
    $('#contact-form').submit(function(event) {
        var name = $('#inputName')
        var email = $('#inputEmail')
        var subject = $('#inputSubject')
        var message = $('#inputMessage')

        if(name.val().length > 3) { 
            name.css('border-color', 'green')
        } else {
            event.preventDefault()
            name.css('border-color', 'red')
        }

        if(email.val().length > 5 && email.val().includes('@') && email.val().includes('.')) { 
            email.css('border-color', 'green')
        } else {
            event.preventDefault()
            email.css('border-color', 'red')
        }

        if(subject.val().length >= 5) {
            subject.css('border-color', 'green')
        } else {
            event.preventDefault()
            subject.css('border-color', 'red')
        }

        if(message.val().length >= 25) {
            message.css('border-color', 'green')
        } else {
            event.preventDefault()
            message.css('border-color', 'red')
        }

        if(name.val().length > 3
           && email.val().length > 5
           && email.val().includes('@')
           && email.val().includes('.')
           && subject.val().length >= 5
           && message.val().length >= 25) {
            window.location.href = '/';
        }
    });
});