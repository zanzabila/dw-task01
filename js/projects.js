let col = 3;
let hamburgerIsOpen = false;
const mediaQuery = window.matchMedia('(max-width: 900px)');
let dataDummy = true;
let projectData = [];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des"
];

createDummyData();

function handleScreenChange(e) {
    if (e.matches) {
        col = 2;
        renderProjects();
    } else {
        col = 3;
        renderProjects();
    }
}

mediaQuery.addListener(handleScreenChange);
handleScreenChange(mediaQuery);

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


function addProject(event) {
    event.preventDefault();
    project = getProjectData();
    if (project == "Data incomplete") {
        alert("Mohon lengkapi data project");
        return;
    } else if (project == "Invalid dates") {
        alert("Tanggal mulai dan selesai tidak valid");
        return;
    }
    if (dataDummy) {
        projectData = [];
        dataDummy = false;
    }
    projectData.push(project);
    renderProjects();
}

function getProjectData() {
    let name = document.getElementById("project-name").value;
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let desc = document.getElementById("desc").value;
    let nodeJs = document.getElementById("node-js").checked;
    let reactJs = document.getElementById("react-js").checked;
    let nextJs = document.getElementById("next-js").checked;
    let typescript = document.getElementById("typescript").checked;
    let image = document.getElementById("upload-image").files;

    if (
        name.length == 0 ||
        startDate.length == 0 ||
        endDate.length == 0 ||
        desc.length == 0 ||
        image.length == 0
    ) {
        return "Data incomplete";
    } else if (invalidDate(startDate, endDate)) {
        return "Invalid dates";
    }

    let img = URL.createObjectURL(image[0]);

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let duration = calculateDuration(startDate, endDate);
    
    let project = {
        name,
        startDate,
        endDate,
        desc,
        nodeJs,
        reactJs,
        nextJs,
        typescript,
        img,
        duration
    };

    return project;
}

function convertDate(date) { // untuk project-detail.html
    // Format awal tipe date
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    // Format akhir string "d mon yyyy"
    return d + " " + months[m] + " " + y;
}

function renderProjects() {
    let s = `<h1>MY PROJECT</h1><div class="grid-container">`;

    for (let i=0; i<projectData.length; ++i) {
        s += `
            <div class="project-item" id="item-${i}">
                <img class="item-img" src="${projectData[i].img}"/>
                <div class="project-item-title"><a href="project-detail.html" target="_blank">${projectData[i].name}</a></div>
                <div class="project-item-duration">durasi: ${projectData[i].duration}</div>
                <p>${projectData[i].desc}</p>
                <div class="tech-list">
        `;

        if (projectData[i].nodeJs) s+= `<img src="assets/images/node-js.svg" alt="nodejs-logo"/>`;
        if (projectData[i].reactJs) s+= `<img src="assets/images/react.svg" alt="reactjs-logo"/>`;
        if (projectData[i].nextJs) s+= `<img src="assets/images/nextjs.svg" alt="nextjs-logo"/>`;
        if (projectData[i].typescript) s+= `<img src="assets/images/typescript.svg" alt="typescript-logo"/>`;

        s += `
                </div>
                <div class="edit-delete-button">
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </div>
        `;
    }

    if (col==3){
        if (projectData.length == 1) {
            s += `
                <div class="project-item-empty" style="grid-column: 2/3;"></div>
                <div class="project-item-empty" style="grid-column: 3/4;"></div>
            `;
        } else if (projectData.length == 2) {
            s += `
                <div class="project-item-empty" style="grid-column: 3/4;"></div>
            `;
        }
    } else if (col==2 && projectData.length==1) {
        s += `
            <div class="project-item-empty" style="grid-column: 2/3;"></div>
        `;
    }

    s += `</div>`;
    document.getElementById("contents").innerHTML = s;
    
    changeGridCol();
}

function getFileName() {
    document.getElementById("filename").innerHTML = document.getElementById("upload-image").value;
}

function calculateDuration(date1, date2) {
    let days = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24;
    let months = Math.floor(days/30);
    let weeks = Math.floor(days/7);
    
    if (months>11) return Math.floor(months/12) + " tahun";
    if (months>0) return months + " bulan";
    if (weeks>0) return weeks + " minggu";
    return days + " hari";
}

function invalidDate(date1, date2) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    return d1 > d2;
}

function changeGridCol() {
    for (let i=0; i<projectData.length; ++i) {
        item = document.getElementById(`item-${i}`);
        item.style.gridRow = `${Math.floor((i+1)/col)+1} / ${Math.floor((i+1)/col)+2}`;
        item.style.gridColumn = `${(i%col)+1} / ${(i%col)+2}`;
        
        if ((i+1)%col == 0) {
            item.style.gridRow = `${Math.floor((i+1)/col)} / ${Math.floor((i+1)/col)+1}`;
        }
    }
}

function createDummyData() {
    const project1 = {
        name: "Dumbways Mobile App - 2021",
        desc: "App that is used by dumbways student, it was deployed and can be downloaded on playstore. Happy download",
        nodeJs: false,
        reactJs: false,
        nextJs: false,
        typescript: false,
        img: "assets/images/img2.png",
        duration: "3 bulan"
    };

    const project2 = {
        name: "Dumbways Mobile App - 2021",
        desc: "App that is used by dumbways student, it was deployed and can be downloaded on playstore. Happy download",
        nodeJs: false,
        reactJs: false,
        nextJs: false,
        typescript: false,
        img: "assets/images/img3.png",
        duration: "3 bulan"
    };

    const project3 = {
        name: "Dumbways Mobile App - 2021",
        desc: "App that is used by dumbways student, it was deployed and can be downloaded on playstore. Happy download",
        nodeJs: false,
        reactJs: false,
        nextJs: false,
        typescript: false,
        img: "assets/images/img4.png",
        duration: "3 bulan"
    };

    const project4 = {
        name: "Dumbways Mobile App - 2021",
        desc: "App that is used by dumbways student, it was deployed and can be downloaded on playstore. Happy download",
        nodeJs: false,
        reactJs: false,
        nextJs: false,
        typescript: false,
        img: "assets/images/img5.png",
        duration: "3 bulan"
    };

    const project5 = {
        name: "Dumbways Mobile App - 2021",
        desc: "App that is used by dumbways student, it was deployed and can be downloaded on playstore. Happy download",
        nodeJs: false,
        reactJs: false,
        nextJs: false,
        typescript: false,
        img: "assets/images/img6.png",
        duration: "1 bulan"
    };

    projectData.push(project1);
    projectData.push(project2);
    projectData.push(project3);
    projectData.push(project4);
    projectData.push(project5);
}