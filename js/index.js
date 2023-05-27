let hamburgerIsOpen = false;

function openHamburger() {
    let hamburgerNavContainer = document.getElementById("hamburger-nav-container");
    if (!hamburgerIsOpen) {
        hamburgerNavContainer.style.display = 'block';
        hamburgerIsOpen = true;
    } else {
        hamburgerNavContainer.style.display = 'none';
        hamburgerIsOpen = false;
    }
}

function onWidthChange() {
    let width = document.documentElement.clientWidth;
    if (width>900 && hamburgerIsOpen) {
        hamburgerIsOpen = false;
        document.getElementById("hamburger-nav-container").style.display = 'none';
    }
}

window.addEventListener("resize", onWidthChange);

onWidthChange();