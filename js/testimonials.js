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

class Testimonial {
    #quote;
    #image;
    #rating;

    constructor(quote, image, rating) {
        this.#quote = quote;
        this.#image = image;
        this.#rating = rating;
    }

    get quote() {
        return this.#quote;
    }

    get image() {
        return this.#image;
    }

    get rating() {
        return this.#rating;
    }

    get author() {
        throw new Error("getAuthor() method must be implemented");
    }

    get testimonialHTML() {
        return `
            <div class="testi">
                <img
                    src="${this.#image}"
                    alt=""
                    class="profile-testi"
                />
                <p class="quote">"${this.#quote}"</p>
                <p class="author-rating">- ${this.author}</p>
                <p class="author-rating">${this.#rating} <i class="fa-solid fa-star"></i></p>
            </div>
        `;
    }
}

class AuthorTestimonials extends Testimonial {
    #author = "";

    constructor(author, quote, image, rating) {
        super(quote, image, rating);
        this.#author = author;
    }

    get author() {
        return this.#author;
    }
}

class CompanyTestimonials extends Testimonial {
    #company = "";

    constructor(company, quote, image, rating) {
        super(quote, image, rating);
        this.#company = company;
    }

    get author() {
        return this.#company + " Company";
    }
}

function allTestimonials() {
    let s = "";
    testimonialData.forEach(function (item) {
        s += `
            <div class="testi">
                <img
                    src="${item.image}"
                    alt="photo"
                    class="profile-testi"
                />
                <p class="quote">
                    "${item.quote}"
                </p>
                <p class="author-rating">- ${item.author}</p>
                <p class="author-rating">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
        `;
    });
    document.getElementById("testimonials").innerHTML = s;
}

function filterTestimonials(rating) {
    let s = ""
    const filtered = testimonialData.filter(function (item) {
        return item.rating == rating;
    });

    if (filtered.length == 0) {
        s = `<h1>Data not found</h1>`;
    } else {
        filtered.forEach(function (item) {
            s += `
                <div class="testi">
                    <img
                        src="${item.image}"
                        alt="photo"
                        class="profile-testi"
                    />
                    <p class="quote">
                        "${item.quote}"
                    </p>
                    <p class="author-rating">- ${item.author}</p>
                    <p class="author-rating">${item.rating} <i class="fa-solid fa-star"></i></p>
                </div>
            `;
        });
    }

    document.getElementById("testimonials").innerHTML = s;
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

// Testimonials data creation

const t1 = new AuthorTestimonials(
    "Surya Elidanto",
    "Mantap sekali jasanya!",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    5
);

const t2 = new AuthorTestimonials(
    "Surya Elz",
    "Keren lah pokoknya!",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    4
);

const t3 = new CompanyTestimonials(
    "ABC",
    "Wuhuu keren lah!",
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    4
);

const t4 = new AuthorTestimonials(
    "Surya Gans",
    "The best pelayanannya!",
    "https://images.squarespace-cdn.com/content/v1/600bbfebf983552f0a54b390/1613024328002-LRMTSZAYI76W9ZUTDQXE/image-asset.jpeg?format=1000w",
    4
);

const t5 = new AuthorTestimonials(
    "Suryaaaa",
    "Oke lah!",
    "https://alliancetutoring.com/wp-content/uploads/2022/06/Alliance-Tutoring-Greenwich.jpg",
    3
);

const t6 = new AuthorTestimonials(
    "Suryeah",
    "Apa apaan ini!",
    "https://imgx.sonora.id/crop/0x1322:3647x4042/700x465/photo/2022/12/21/pria-charlie-green-unsplashjpg-20221221035629.jpg",
    1
);

const t7 = new CompanyTestimonials(
    "Surya Semua",
    "Meragukan",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
    1
);

let testimonialData = [t1, t2, t3, t4, t5, t6, t7];

allTestimonials();