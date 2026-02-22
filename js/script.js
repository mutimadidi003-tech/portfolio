document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // ELEMENTS
    // ===============================
    const themeToggle = document.getElementById("themeToggle");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const currentYear = document.getElementById("currentYear");

    const addCourseBtn = document.getElementById("addCourse");
    const calculateGPABtn = document.getElementById("calculateGPA");
    const resetBtn = document.getElementById("resetCalculator");

    const courseInputs = document.getElementById("courseInputs");

    const gpaResult = document.getElementById("gpaResult");
    const gpaValue = document.getElementById("gpaValue");
    const gpaClassification = document.getElementById("gpaClassification");
    const gpaError = document.getElementById("gpaError");


    // ===============================
    // CURRENT YEAR
    // ===============================
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ===============================
    // THEME TOGGLE
    // ===============================
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const theme = document.documentElement.getAttribute("data-theme");

            if (theme === "dark") {

                document.documentElement.removeAttribute("data-theme");
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

            } else {

                document.documentElement.setAttribute("data-theme", "dark");
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';

            }

        });

    }


    // ===============================
    // HAMBURGER MENU
    // ===============================
    if (hamburger && navMenu) {

        hamburger.addEventListener("click", function () {

            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

        });

        document.querySelectorAll(".nav-menu a").forEach(link => {

            link.addEventListener("click", function () {

                hamburger.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });

    }


    // ===============================
    // ADD COURSE
    // ===============================
    if (addCourseBtn) {

        addCourseBtn.addEventListener("click", function () {

            const row = document.createElement("div");
            row.className = "course-row";

            row.innerHTML = `
                <input type="text" placeholder="Course Name" class="course-name" required>

                <input type="number" placeholder="Marks (0-100)" min="0" max="100" class="course-mark" required>

                <select class="course-credit">
                    <option value="3">3 Credits</option>
                    <option value="4">4 Credits</option>
                    <option value="5">5 Credits</option>
                </select>

                <button type="button" class="remove-course" onclick="removeCourse(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;

            courseInputs.appendChild(row);

        });

    }


    // ===============================
    // REMOVE COURSE (GLOBAL FUNCTION)
    // ===============================
    window.removeCourse = function(button) {

        if (courseInputs.children.length > 1) {

            button.parentElement.remove();

        } else {

            showError("At least one course is required");

        }

    };


    // ===============================
    // CALCULATE GPA
    // ===============================
    if (calculateGPABtn) {

        calculateGPABtn.addEventListener("click", function () {

            hideError();

            const rows = document.querySelectorAll(".course-row");

            let totalPoints = 0;
            let totalCredits = 0;

            for (let i = 0; i < rows.length; i++) {

                const name = rows[i].querySelector(".course-name").value.trim();
                const mark = parseFloat(rows[i].querySelector(".course-mark").value);
                const credit = parseFloat(rows[i].querySelector(".course-credit").value);

                if (!name) {
                    showError("Enter course name for course " + (i+1));
                    return;
                }

                if (isNaN(mark) || mark < 0 || mark > 100) {
                    showError("Enter valid marks (0–100) for course " + (i+1));
                    return;
                }

                let gradePoint = 0;

                if (mark >= 90) gradePoint = 4;
                else if (mark >= 80) gradePoint = 3;
                else if (mark >= 70) gradePoint = 2;
                else if (mark >= 60) gradePoint = 1;
                else gradePoint = 0;

                totalPoints += gradePoint * credit;
                totalCredits += credit;

            }

            const gpa = totalPoints / totalCredits;

            gpaValue.textContent = gpa.toFixed(2);

            if (gpa >= 3.5)
                gpaClassification.textContent = "Excellent";

            else if (gpa >= 3.0)
                gpaClassification.textContent = "Good";

            else if (gpa >= 2.5)
                gpaClassification.textContent = "Satisfactory";

            else
                gpaClassification.textContent = "Needs Improvement";


            gpaResult.classList.remove("hidden");

        });

    }


    // ===============================
    // RESET CALCULATOR
    // ===============================
    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            courseInputs.innerHTML = `
                <div class="course-row">
                    <input type="text" placeholder="Course Name" class="course-name" required>
                    <input type="number" placeholder="Marks (0-100)" min="0" max="100" class="course-mark" required>
                    <select class="course-credit">
                        <option value="3">3 Credits</option>
                        <option value="4">4 Credits</option>
                        <option value="5">5 Credits</option>
                    </select>
                    <button type="button" class="remove-course" onclick="removeCourse(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            gpaResult.classList.add("hidden");
            hideError();

        });

    }


    // ===============================
    // ERROR FUNCTIONS
    // ===============================
    function showError(message) {

        gpaError.textContent = message;
        gpaError.classList.remove("hidden");

    }

    function hideError() {

        gpaError.classList.add("hidden");

    }

});