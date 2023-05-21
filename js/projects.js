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

    let duration = calculateDuration(startDate, endDate);
    startDate = convertDate(startDate);
    endDate = convertDate(endDate);
    
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

function convertDate(date) {
    // Format awal yyyy-mm-dd
    let d = parseInt(date.substring(8, 10));
    let m = parseInt(date.substring(5, 7));
    let y = parseInt(date.substring(0, 4));
    // Format akhir d mon yyyy
    return d + " " + months[m-1] + " " + y;
}

function renderProjects() {
    let s = `<h1>MY PROJECT</h1>`;

    for (let i=0; i<projectData.length; i+=3) {
        s += `<div class="project-row">`;

        for (let j=0; j<3; ++j) {
            if (i+j >= projectData.length) {
                s += `<div class="project-item-empty"></div>`;
                continue;
            }
            
            s += `
                <div class="project-item">
                    <img class="item-img" src="${projectData[i+j].img}"/>
                    <div class="project-item-title"><a href="project-detail.html" target="_blank">${projectData[i+j].name}</a></div>
                    <div class="project-item-duration">durasi: ${projectData[i+j].duration} bulan</div>
                    <p>${projectData[i+j].desc}</p>
                    <div class="tech-list">
            `;

            if (projectData[i+j].nodeJs) s+= `<img src="assets/images/node-js.svg" alt="nodejs-logo"/>`;
            if (projectData[i+j].reactJs) s+= `<img src="assets/images/react.svg" alt="reactjs-logo"/>`;
            if (projectData[i+j].nextJs) s+= `<img src="assets/images/nextjs.svg" alt="nextjs-logo"/>`;
            if (projectData[i+j].typescript) s+= `<img src="assets/images/typescript.svg" alt="typescript-logo"/>`;

            s += `
                    </div>
                    <div class="edit-delete-button">
                        <button>edit</button>
                        <button>delete</button>
                    </div>
                </div>
            `;
        }

        s += `</div>`;
    }

    document.getElementById("contents").innerHTML = s;
}

function getFileName() {
    document.getElementById("filename").innerHTML = document.getElementById("upload-image").value;
}

function calculateDuration(date1, date2) {
    let d1 = new Date(
        date1.substring(0, 4),
        date1.substring(5, 7)-1,
        date1.substring(8, 10)
    );
    let d2 = new Date(
        date2.substring(0, 4),
        date2.substring(5, 7)-1,
        date2.substring(8, 10)
    );

    let diff = (d2.getTime() - d1.getTime()) / 1000;
    diff /= (60*60*24*7*4);
    return Math.round(diff);
}

function invalidDate(date1, date2) {
    let d1 = new Date(
        date1.substring(0, 4),
        date1.substring(5, 7)-1,
        date1.substring(8, 10)
    );
    let d2 = new Date(
        date2.substring(0, 4),
        date2.substring(5, 7)-1,
        date2.substring(8, 10)
    );

    return d1 > d2;
}