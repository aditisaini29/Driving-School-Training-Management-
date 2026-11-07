// ===============================
// DRIVE PRO - BASIC JAVASCRIPT
// ===============================


// 1. PAGE NAVIGATION
// ===============================

var pages = document.querySelectorAll(".page");
var links = document.querySelectorAll(".nav-links a");

function showPage(pageId) {

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    document.getElementById(pageId).classList.add("active");
}

for (var i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function () {

        var pageId = this.getAttribute("href").replace("#", "");

        showPage(pageId);
    });
}


// Register Learner button
var registerButton = document.querySelector(".button.yellow");

registerButton.addEventListener("click", function () {
    showPage("learners");
});


// Explore Courses button
var exploreButton = document.querySelector(".button.outline-light");

exploreButton.addEventListener("click", function () {
    showPage("courses");
});



// 2. LEARNER REGISTRATION
// ===============================

var learnerForm = document.getElementById("learnerForm");

var learnerTable = document.getElementById("learnerTable");


// Get learners from Local Storage
var learners = JSON.parse(localStorage.getItem("learners")) || [];


// Function to show learners
function displayLearners() {

    var learnerCount = document.querySelector(".count-bar li strong");
learnerCount.innerText = learners.length;

    learnerTable.innerHTML = "";

    if (learners.length == 0) {

        learnerTable.innerHTML =
            "<tr>" +
            "<td colspan='5'>No learners found.</td>" +
            "</tr>";

        return;
    }


    for (var i = 0; i < learners.length; i++) {

        learnerTable.innerHTML +=
            "<tr>" +
            "<td>" + learners[i].name + "</td>" +

            "<td>" +
            learners[i].phone +
            "<br>" +
            learners[i].email +
            "</td>" +

            "<td>" +
            learners[i].theory +
            " / 5" +
            "</td>" +

            "<td>" +
            learners[i].practical +
            " / 8" +
            "</td>" +

            "<td>" +
            "<button onclick='viewLearner(" + i + ")'>View</button> " +
            "<button onclick='deleteLearner(" + i + ")'>Delete</button>" +
            "</td>" +

            "</tr>";
    }
}


// When learner form is submitted
learnerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    var name = document.getElementById("1Name").value;
    var phone = document.getElementById("1Phone").value;
    var email = document.getElementById("1Email").value;
    var age = document.getElementById("1Age").value;


    // Check empty fields
    if (name == "" || phone == "" || email == "" || age == "") {

        alert("Please fill all the details.");

        return;
    }


    // Create learner
    var learner = {

        name: name,
        phone: phone,
        email: email,
        age: age,

        theory: 0,
        practical: 0
    };


    // Add learner to array
    learners.push(learner);


    // Save learner
    localStorage.setItem("learners", JSON.stringify(learners));


    // Show success message
    alert("Learner registered successfully!");


    // Clear form
    learnerForm.reset();


    // Show learner in table
    displayLearners();

});



// View learner
function viewLearner(number) {

    var learner = learners[number];

    alert(
        "Learner Details\n\n" +
        "Name: " + learner.name + "\n" +
        "Phone: " + learner.phone + "\n" +
        "Email: " + learner.email + "\n" +
        "Age: " + learner.age + "\n\n" +
        "Theory Classes: " + learner.theory + " / 5\n" +
        "Practical Sessions: " + learner.practical + " / 8"
    );
}
//delete learner
function deleteLearner(number) {

    if (confirm("Are you sure you want to delete this learner?")) {

        learners.splice(number, 1);

        localStorage.setItem("learners", JSON.stringify(learners));

        displayLearners();
        displayProgress();
        loadSessionOptions();
    }
}


// Show saved learners when page opens
displayLearners();



// 3. SEARCH LEARNER
// ===============================

var searchLearner = document.getElementById("searchLearner");


searchLearner.addEventListener("keyup", function () {

    var searchText = searchLearner.value.toLowerCase();

    var rows = learnerTable.getElementsByTagName("tr");


    for (var i = 0; i < rows.length; i++) {

        var rowText = rows[i].innerText.toLowerCase();

        if (rowText.includes(searchText)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";
        }
    }

});

// ===============================
// 4. INSTRUCTOR REGISTRATION
// ===============================

var instructorForm = document.getElementById("instructorForm");
var instructorCards = document.getElementById("instructorCards");

var instructors = JSON.parse(localStorage.getItem("instructors")) || [];


// Show instructors
function displayInstructors() {

    var instructorCount = document.querySelectorAll(".count-bar li strong")[1];
instructorCount.innerText = instructors.length;

    instructorCards.innerHTML = "";

    for (var i = 0; i < instructors.length; i++) {

        instructorCards.innerHTML +=
            "<div class='card'>" +
            "<h3>" + instructors[i].name + "</h3>" +
            "<p>Phone: " + instructors[i].phone + "</p>" +
            "<p>Experience: " + instructors[i].experience + " years</p>" +
            "<p>Specialty: " + instructors[i].skill + "</p>" +
            "<button onclick='deleteInstructor(" + i + ")'>Delete</button>" +
            "</div>";  
    }
}


// Add instructor
instructorForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var name = document.getElementById("iName").value;
    var phone = document.getElementById("iPhone").value;
    var experience = document.getElementById("iExp").value;
    var skill = document.getElementById("iSkill").value;


    if (name == "" || phone == "" || experience == "") {

        alert("Please fill all the details.");

        return;
    }


    var instructor = {

        name: name,
        phone: phone,
        experience: experience,
        skill: skill
    };


    instructors.push(instructor);

    localStorage.setItem(
        "instructors",
        JSON.stringify(instructors)
    );


    alert("Instructor added successfully!");

    instructorForm.reset();

    displayInstructors();
    loadInstructorOptions();
    loadSessionOptions();

});

// Show saved instructors
displayInstructors();

//delete instructor
function deleteInstructor(number) {

    if (confirm("Are you sure you want to delete this instructor?")) {

        instructors.splice(number, 1);

        localStorage.setItem("instructors", JSON.stringify(instructors));

        displayInstructors();
        loadInstructorOptions();
        loadSessionOptions();
    }
}

// ===============================
// 5. HAMBURGER MENU
// ===============================

var menuButton = document.getElementById("menuButton");
var navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {

    if (navLinks.style.display == "flex") {

        navLinks.style.display = "none";

    } else {

        navLinks.style.display = "flex";
    }

});

// ===============================
// 5. VEHICLE MANAGEMENT
// ===============================

var vehicleForm = document.getElementById("vehicleForm");
var vehicleCards = document.getElementById("vehicleCards");

var vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];


// Show vehicles
function displayVehicles() {

    vehicleCards.innerHTML = "";

    var vehicleCount = document.querySelectorAll(".count-bar li strong")[2];
    vehicleCount.innerText = vehicles.length;


    for (var i = 0; i < vehicles.length; i++) {

        vehicleCards.innerHTML +=
        "<div class='card'>" +
"<h3>" + vehicles[i].number + "</h3>" +
"<p>Model: " + vehicles[i].model + "</p>" +
"<p>Type: " + vehicles[i].type + "</p>" +
"<p>Status: " + vehicles[i].status + "</p>" +
"<button onclick='deleteVehicle(" + i + ")'>Delete</button>" +
"</div>";    
    }
}


// Add vehicle
vehicleForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var number = document.getElementById("vNumber").value;
    var model = document.getElementById("vModel").value;
    var type = document.getElementById("vType").value;
    var status = document.getElementById("vStatus").value;


    if (number == "" || model == "" || type == "" || status == "") {

        alert("Please fill all the vehicle details.");

        return;
    }


    var vehicle = {

        number: number,
        model: model,
        type: type,
        status: status
    };


    vehicles.push(vehicle);

    localStorage.setItem(
        "vehicles",
        JSON.stringify(vehicles)
    );


    alert("Vehicle added successfully!");

    vehicleForm.reset();

    displayVehicles();
    loadSessionOptions();

});



// Show saved vehicles when page opens
displayVehicles();

// DELETE VEHICLE
function deleteVehicle(number) {

    if (confirm("Are you sure you want to delete this vehicle?")) {

        vehicles.splice(number, 1);

        localStorage.setItem("vehicles", JSON.stringify(vehicles));

        displayVehicles();
        loadSessionOptions();
    }
}

// ===============================
// 6. THEORY CLASSES
// ===============================

var theoryForm = document.getElementById("theoryForm");
var theoryTable = document.getElementById("theoryTable");

var theoryClasses = JSON.parse(localStorage.getItem("theoryClasses")) || [];

function displayTheoryClasses() {

    theoryTable.innerHTML = "";

    for (var i = 0; i < theoryClasses.length; i++) {
    theoryTable.innerHTML +=
        "<tr>" +
        "<td>" + theoryClasses[i].topic + "</td>" +
        "<td>" + theoryClasses[i].date + "</td>" +
        "<td>" + theoryClasses[i].instructor + "</td>" +
        "<td>Scheduled</td>" +
        "<td><button onclick='deleteTheory(" + i + ")'>Delete</button></td>" +
        "</tr>";
    }
}


theoryForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var topic = document.getElementById("tTopic").value;
    var date = document.getElementById("tDate").value;
    var instructor = document.getElementById("tInstructor").value;


    if (topic == "" || date == "" || instructor == "") {

        alert("Please fill all theory class details.");

        return;
    }


    var theory = {

        topic: topic,
        date: date,
        instructor: instructor
    };


    theoryClasses.push(theory);

    localStorage.setItem(
        "theoryClasses",
        JSON.stringify(theoryClasses)
    );


    alert("Theory class added successfully!");

    theoryForm.reset();

    displayTheoryClasses();

    displayProgress();

});


displayTheoryClasses();

// DELETE THEORY CLASS
function deleteTheory(number) {

    if (confirm("Are you sure you want to delete this theory class?")) {

        theoryClasses.splice(number, 1);

        localStorage.setItem("theoryClasses", JSON.stringify(theoryClasses));

        displayTheoryClasses();
        displayProgress();
        
    }
}

// Add saved instructors to the Theory Class dropdown

var theoryInstructor = document.getElementById("tInstructor");

function loadInstructorOptions() {

    theoryInstructor.innerHTML =
        "<option value=''>Select Instructor</option>";

    for (var i = 0; i < instructors.length; i++) {

        theoryInstructor.innerHTML +=
            "<option value='" +
            instructors[i].name +
            "'>" +
            instructors[i].name +
            "</option>";
    }
}

loadInstructorOptions();



// ===============================
// 7. DRIVING SESSIONS
// ===============================

var sessionForm = document.getElementById("sessionForm");
var sessionTable = document.getElementById("sessionTable");

var sessions = JSON.parse(localStorage.getItem("sessions")) || [];


// Show saved sessions
function displaySessions() {

    sessionTable.innerHTML = "";

    for (var i = 0; i < sessions.length; i++) {

        sessionTable.innerHTML +=
            "<tr>" +
            "<td>" + sessions[i].learner + "</td>" +
            "<td>" + sessions[i].date + "</td>" +
            "<td>" + sessions[i].vehicle + "</td>" +
            "<td>" + sessions[i].instructor + "</td>" +
            "<td>Scheduled</td>" +
            "<td><button onclick='deleteSession(" + i + ")'>Delete</button></td>" +
            "</tr>";
    }
}


// Add driving session
sessionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var learner = document.getElementById("sLearner").value;
    var date = document.getElementById("sDate").value;
    var vehicle = document.getElementById("sVehicle").value;
    var instructor = document.getElementById("sInstructor").value;


    if (learner == "" || date == "" || vehicle == "" || instructor == "") {

        alert("Please fill all session details.");

        return;
    }


    var session = {

        learner: learner,
        date: date,
        vehicle: vehicle,
        instructor: instructor
    };


    sessions.push(session);

    localStorage.setItem(
        "sessions",
        JSON.stringify(sessions)
    );


    alert("Driving session added successfully!");

    sessionForm.reset();

    displaySessions();

    displayProgress();

});


displaySessions();

// DELETE DRIVING SESSION
function deleteSession(number) {

    if (confirm("Are you sure you want to delete this driving session?")) {

        sessions.splice(number, 1);

        localStorage.setItem("sessions", JSON.stringify(sessions));

        displaySessions();
        displayProgress();
        
    }
}

// Load saved data into Driving Session dropdowns

var sessionLearner = document.getElementById("sLearner");
var sessionVehicle = document.getElementById("sVehicle");
var sessionInstructor = document.getElementById("sInstructor");


function loadSessionOptions() {

    // Learners
    sessionLearner.innerHTML =
        "<option value=''>Select Learner</option>";

    for (var i = 0; i < learners.length; i++) {

        sessionLearner.innerHTML +=
            "<option value='" +
            learners[i].name +
            "'>" +
            learners[i].name +
            "</option>";
    }


    // Vehicles
    sessionVehicle.innerHTML =
        "<option value=''>Select Vehicle</option>";

    for (var i = 0; i < vehicles.length; i++) {

        sessionVehicle.innerHTML +=
            "<option value='" +
            vehicles[i].number +
            "'>" +
            vehicles[i].number +
            "</option>";
    }


    // Instructors
    sessionInstructor.innerHTML =
        "<option value=''>Select Instructor</option>";

    for (var i = 0; i < instructors.length; i++) {

        sessionInstructor.innerHTML +=
            "<option value='" +
            instructors[i].name +
            "'>" +
            instructors[i].name +
            "</option>";
    }
}


loadSessionOptions();


// ===============================
// 8. LEARNER PROGRESS
// ===============================

var progressCards = document.getElementById("progressCards");


// Show learner progress
function displayProgress() {

    progressCards.innerHTML = "";

    var testReadyCount = 0;

    for (var i = 0; i < learners.length; i++) {

        var learnerName = learners[i].name;

        // Count practical sessions for this learner
        var practicalCount = 0;

        for (var j = 0; j < sessions.length; j++) {

            if (sessions[j].learner == learnerName) {

                practicalCount++;
            }
        }


        // Count theory classes
        // Your theory form is not linked to a particular learner,
        // so theory classes are counted as overall theory classes.
        var theoryCount = theoryClasses.length;


        // Maximum values
        if (theoryCount > 5) {
            theoryCount = 5;
        }

        if (practicalCount > 8) {
            practicalCount = 8;
        }


        // Test Ready
        var ready = false;

        if (theoryCount >= 5 && practicalCount >= 8) {

            ready = true;
            testReadyCount++;
        }


        var status = "In Progress";

        if (ready == true) {

            status = "Test Ready";
        }


        progressCards.innerHTML +=

            "<div class='card'>" +

            "<h3>" + learnerName + "</h3>" +

            "<p>Theory Classes: " +
            theoryCount +
            " / 5</p>" +

            "<p>Practical Sessions: " +
            practicalCount +
            " / 8</p>" +

            "<p>Status: " +
            status +
            "</p>" +

            "</div>";
    }


    // Update Test Ready counter on Home page

    var countBoxes =
        document.querySelectorAll(".count-bar li strong");

    if (countBoxes.length >= 4) {

        countBoxes[3].innerText = testReadyCount;
    }
}


// Show progress when page loads
displayProgress();