const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-modal-close]');
const overlayDiv = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        if (modal === null) { return }
        modal.classList.add('active');
        overlayDiv.classList.add('active');
    })
});
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
});

overlayDiv.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => closeModal(modal))
});

function closeModal(modal) {
    if (modal === null) { return }
    modal.classList.remove('active');
    overlayDiv.classList.remove('active');
};