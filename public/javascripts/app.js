const tabs = document.querySelectorAll(".filters span");
tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const active_tab = document.querySelector("span.active");
        const active_content = document.querySelector('#content-' + active_tab.id);
        active_tab.classList.remove("active");
        active_content.style.display = 'none';

        tab.classList.add("active");
        const content = document.querySelector('#content-' + tab.id);
        content.style.display = 'block';
    });
});

function showMenu(selectedTask) {

    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function hideQueryMessage() {

    const contentMesage = document.querySelector('.has-alert');
    if (contentMesage) {

        setTimeout(() => {

            contentMesage.style.display = 'none';
        }, 3000);
    }
}

hideQueryMessage();