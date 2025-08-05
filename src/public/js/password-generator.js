$(document).ready(function() { generatePassword() })
$("#generate").click(function() { generatePassword() })
$("#result").click(function() { copyPassword() })
$("#clipboard").click(function() { copyPassword() })

const allRanges = document.querySelector(".range-wrap");
const range = allRanges.querySelector(".range");
const bubble = allRanges.querySelector(".bubble");
range.addEventListener("input", () => {
    setBubble(range, bubble);
});
setBubble(range, bubble);

function generatePassword() {
    const length = $('#length').val();
    const hasUpper = $("#uppercase").prop('checked');
    const hasNumbers = $("#numbers").prop('checked');
    const hasSymbols = $("#symbols").prop('checked');

    let values = `abcdefghijklmnopqrstuvwxyz`;
    if (hasUpper) { values = values + `ABCDEFGHIJKLMNOPQRSTUVWXYZ` }
    if (hasNumbers) { values = values + `0123456789` }
    if (hasSymbols) { values = values + `@*&$!?#%^()` }

    let password = '';
    for (let _length = 0; _length < length; _length++) password += values[Math.floor(Math.random() * values.length)];
    $("#result").text(password)
};

function copyPassword() {
    let actualPassword = $("#result").text();
    navigator.clipboard.writeText(actualPassword)
    createNotif (`Mot de passe copié !`, 'success')
};

function setBubble(range, bubble) {
    const val = range.value;
    bubble.innerHTML = `Longueur : ${val}`;
};

function createNotif (msg, status) {
    const parent = document.getElementsByTagName('app-notification').item(0);
    let inc = 0;
    inc++
    
    const notif = document.createElement('div');
    notif.innerHTML = msg;
    notif.id = `notif-${inc}`;
    notif._timeout = setTimeout(() => {
        setTimeout(() => {
            notif.remove();
        }, 1000);
        notif.style.animation = '.2s ease-in slideout';
        notif.style.opacity = 0;
    }, 3*1000);
    notif.style.backgroundColor = status === 'error' ? '#ed4245' : '#28a745';

    parent.appendChild(notif);
};