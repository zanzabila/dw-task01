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

function submitData() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-phone").value;
    let subject = document.getElementById("input-subject").value;
    let message = document.getElementById("input-message").value;
    
    if (name == "") {return alert("Nama harus diisi!");}
    else if (email == "") {return alert("Email harus diisi!");}
    else if (phone == "") {return alert("Phone harus diisi!");}
    else if (subject == "") {return alert("Subject harus dipilih!");}
    else if (message == "") {return alert("Message harus diisi!");}
    
    let emailReceiver = "zanzabila.rayhan@gmail.com"
    let a = document.createElement('a');
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}. Silakan kontak saya di nomor ${phone}, terima kasih.`;
    a.click();
}

function onWidthChange() {
    let width = document.documentElement.clientWidth;
    if (width > 900 && hamburgerIsOpen) {
        hamburgerIsOpen = false;
        document.getElementById("hamburger-nav-container").style.display = 'none';
    }
}

window.addEventListener("resize", onWidthChange);

onWidthChange();