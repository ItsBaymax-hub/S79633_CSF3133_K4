function checkMark(e) {
    if (e && e.preventDefault) e.preventDefault();   // tetap di halaman ini (tidak reload)
    /*Error 1 :  document.forms["gradeForm"]["name"] - cara ini salah
        (form["name"] adalah nama form, bukan inputnya); gunakan .elements["name"] atau getElementById. */
    let name = document.forms["gradeForm"].elements["name"].value;
    //Error 2 :  sama untuk document.forms["gradeForm"]["mark"] - pakai .elements["mark"].
    let mark = document.forms["gradeForm"].elements["mark"].value;   

    //Error 3 : if (name = "") - pakai assignment bukan perbandingan; harus (name === "").
    if (name === "") {                                   
        alert("Name must be filled out.");
        return false;
    }
    if (mark === "") {                                   
        alert("Mark field cannot be empty.");
        return false;
    }

    //Error 4 : isNan - typo, seharusnya isNaN (undefined -> tidak jalan saat klik).
    if (isNaN(mark)) {                                   
        alert("Please enter a valid numeric value.");
        return false;
    }
    mark = parseInt(mark);
    //Error 5 : if (mark < 0 && mark > 100) - logika salah; harus (mark < 0 || mark > 100).
    if (mark < 0 || mark > 100) {                        
        alert("Mark must be between 0 and 100.");
        return false;
    }
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Part 2 item 6: result colour according to the grade (green A/B, orange C, red F)
    const resultEl = document.getElementById("result");
    //Error 6 : document.getElementByID - typo, harus getElementById.
    resultEl.innerHTML = name + " got grade " + grade;
    if (grade === "A" || grade === "B") {
        resultEl.style.color = "green";
    } else if (grade === "C") {
        resultEl.style.color = "orange";
    } else {
        resultEl.style.color = "red";
    }

    // Part 2 item 8: date & time the grade was checked
    document.getElementById("checkTime").innerHTML = "Checked on: " + new Date().toLocaleString();

    return true;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table>";
    //Error 7 : for (let i = 1; ...) - mulai dari 1, baris A hilang; harus i = 0.
    for (let i = 0; i < grades.length; i++) {            
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] +
"</td></tr>";
    }
    tableHTML += "</table>";
    //Error 8 : document.getElementById("tableContainer").innerHtml - typo, harus innerHTML.
    document.getElementById("tableContainer").innerHTML = tableHTML; 
}

// Part 2 item 7: Random Mark button - random whole number 0..100 into the mark field
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}
