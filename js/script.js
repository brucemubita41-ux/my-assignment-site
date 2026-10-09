/* ==========================================================================
   ICT251 Web Technologies - Activity 3 JavaScript Logic
   Student: Bruce Mubita Inambao
   Institution: Mulungushi University
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all interactive features once the DOM layout loads fully
    initContactForm();
    initStudyCalculator();
    initThemeSwitch();
    initExpandableContent();
});

/**
 * 1. COMPULSORY FEATURE: Contact Form Validation and Local Preview
 * Intercepts submission, checks parameters, and safely outputs data on-screen.
 */
function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    const preview = document.getElementById("formPreview");

    if (!form || !feedback || !preview) return;

    form.addEventListener("submit", (event) => {
        // Halt submission using preventDefault to keep everything local
        event.preventDefault();

        // Retrieve and trim inputs to completely block whitespace-only text
        const nameVal = document.getElementById("name").value.trim();
        const emailVal = document.getElementById("email").value.trim();
        const messageVal = document.getElementById("message").value.trim();

        // Clear out any old notifications or displays
        feedback.textContent = "";
        feedback.style.color = "red";
        preview.style.display = "none";
        preview.innerHTML = "";

        // Check for empty or space-only content
        if (nameVal === "" || messageVal === "") {
            feedback.textContent = "Error: Name and Message fields cannot be left empty or just spaces.";
            return;
        }

        // Validate formatting layout using standard regex layout
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
        if (!emailPattern.test(emailVal)) {
            feedback.textContent = "Error: Please enter a valid email address layout (e.g., name@domain.com).";
            return;
        }

        // Print local validation confirmation layout
        feedback.style.color = "green";
        feedback.textContent = "Data successfully validated locally! (Browser demonstration only — no message is sent)";

        // Safely construct submission summary using textContent to prevent script injections
        const summaryHeading = document.createElement("h3");
        summaryHeading.textContent = "Submission Summary Preview";
        preview.appendChild(summaryHeading);

        const pName = document.createElement("p");
        pName.innerHTML = "<strong>Name:</strong> ";
        const spanName = document.createElement("span");
        spanName.textContent = nameVal;
        pName.appendChild(spanName);

        const pEmail = document.createElement("p");
        pEmail.innerHTML = "<strong>Email:</strong> ";
        const spanEmail = document.createElement("span");
        spanEmail.textContent = emailVal;
        pEmail.appendChild(spanEmail);

        const pMsg = document.createElement("p");
        pMsg.innerHTML = "<strong>Message:</strong> ";
        const spanMsg = document.createElement("span");
        spanMsg.textContent = messageVal;
        pMsg.appendChild(spanMsg);

        preview.appendChild(pName);
        preview.appendChild(pEmail);
        preview.appendChild(pMsg);
        
        // Unhide summary window container
        preview.style.display = "block";
    });
}

/**
 * 2. CHOSEN FEATURE 1: Study Hours Calculator
 * Multiplies daily inputs over weekly targets and implements constraints.
 */
function initStudyCalculator() {
    const calcBtn = document.getElementById("calcBtn");
    const resultElement = document.getElementById("calcResult");

    if (!calcBtn || !resultElement) return;

    calcBtn.addEventListener("click", () => {
        const hoursInput = document.getElementById("hoursPerDay").value;
        const daysInput = document.getElementById("daysPerWeek").value;

        const hours = parseFloat(hoursInput);
        const days = parseInt(daysInput, 10);

        // Validation against blank inputs
        if (hoursInput === "" || daysInput === "" || isNaN(hours) || isNaN(days)) {
            resultElement.textContent = "Error: Please fill in both study fields with numeric inputs.";
            resultElement.style.color = "red";
            return;
        }

        // Enforce safe numeric boundary bounds
        if (hours < 0 || days < 1 || days > 7) {
            resultElement.textContent = "Error: Days must be between 1 and 7. Study hours cannot be negative values.";
            resultElement.style.color = "red";
            return;
        }

        // Compute runtime parameters
        const totalHours = hours * days;
        resultElement.style.color = "#3182ce";
        resultElement.textContent = `Estimated study runtime: ${totalHours} total hours this week!`;
    });
}

/**
 * 3. CHOSEN FEATURE 2: Light / Dark Theme Switch
 * Toggles global canvas styles on command while maintaining high contrast.
 */
function initThemeSwitch() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const body = document.body;
        
        // Alternate document colors directly
        if (body.style.backgroundColor === "rgb(45, 55, 72)") {
            body.style.backgroundColor = "#f7fafc";
            body.style.color = "#2d3748";
            toggleBtn.textContent = "Switch Theme (Dark)";
        } else {
            body.style.backgroundColor = "#2d3748";
            body.style.color = "#f7fafc";
            toggleBtn.textContent = "Switch Theme (Light)";
        }
    });
}

/**
 * 4. CHOSEN FEATURE 3: Expandable Panels
 * Reveals layout updates interactively when buttons are toggled.
 */
function initExpandableContent() {
    const toggleBtn = document.getElementById("expandDetailsBtn");
    const detailsPanel = document.getElementById("hiddenDetailsPanel");

    if (!toggleBtn || !detailsPanel) return;

    toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        
        if (detailsPanel.style.display === "none" || detailsPanel.style.display === "") {
            detailsPanel.style.display = "block";
            toggleBtn.textContent = "Hide Assignment Overview [-]";
        } else {
            detailsPanel.style.display = "none";
            toggleBtn.textContent = "Show Assignment Overview [+]";
        }
    });
}
