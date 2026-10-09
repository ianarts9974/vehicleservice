document.addEventListener("DOMContentLoaded", function() {
    
    // Select DOM Elements
    const form = document.getElementById("serviceForm");
    const errorBox = document.getElementById("error-box");
    const serviceCheckboxes = document.querySelectorAll('input[name="services[]"]');
    const yearInput = document.getElementById("year");
    const ageWarning = document.getElementById("age-warning");
    const totalCostSpan = document.getElementById("total-cost");
    const selectedList = document.getElementById("selected-list");
    const serviceCountSpan = document.getElementById("service-count");

    // EVENT 1: 'submit' for Validation (Tasks 2 & 5)
    form.addEventListener("submit", validateServiceForm);

    // EVENT 2: 'change' for dynamic cost calculation (Tasks 3, 4 & 5)
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", calculateServiceCost);
    });

    // EVENT 3: 'input' to check vehicle age dynamically (Tasks 3 & 5)
    yearInput.addEventListener("input", checkVehicleAge);

    // Function 1: Form Validation
    function validateServiceForm(event) {
        let errors = [];
        
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const regNo = document.getElementById("reg_no").value.trim();
        const year = document.getElementById("year").value;
        const currentYear = new Date().getFullYear();
        
        // 1. Check Name
        if (name === "") errors.push("Customer name is required.");
        
        // 2. Check Phone (exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) errors.push("Phone number must contain exactly 10 digits.");
        
        // 3. Check Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) errors.push("A valid email address is required.");
        
        // 4. Check Registration
        if (regNo === "") errors.push("Vehicle registration number is required.");
        
        // 5. Check Year of Manufacture (Reasonable logic: between 1970 and current year)
        if (year === "" || year < 1970 || year > currentYear) {
            errors.push(`Year of manufacture must be between 1970 and ${currentYear}.`);
        }
        
        // 6. Check Services (at least one)
        let serviceChecked = false;
        serviceCheckboxes.forEach(cb => { if (cb.checked) serviceChecked = true; });
        if (!serviceChecked) errors.push("At least one service must be selected.");

        // 7. Display errors or allow submission
        if (errors.length > 0) {
            event.preventDefault(); // Stop form submission
            errorBox.style.display = "block";
            errorBox.innerHTML = "<strong>Please fix the following errors:</strong><br>" + errors.join("<br>");
            window.scrollTo(0, 0); // Scroll to top to see errors
        } else {
            errorBox.style.display = "none";
        }
    }

    // Function 2: Calculate Service Cost and Update UI
    function calculateServiceCost() {
        let total = 0;
        let selectedNames = [];

        serviceCheckboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.getAttribute("data-price"));
                selectedNames.push(cb.value);
            }
        });

        // Update Total
        totalCostSpan.textContent = total.toLocaleString();

        // Update Dynamic UI list and counter
        serviceCountSpan.textContent = selectedNames.length;
        if (selectedNames.length === 0) {
            selectedList.innerHTML = "<li>None selected</li>";
        } else {
            selectedList.innerHTML = "";
            selectedNames.forEach(name => {
                let li = document.createElement("li");
                li.textContent = name;
                selectedList.appendChild(li);
            });
        }
    }

    // Function 3: Check Vehicle Age for Dynamic Warning
    function checkVehicleAge() {
        const year = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();
        
        if (year && (currentYear - year) > 15) {
            ageWarning.style.display = "block"; // Show warning for older vehicles
        } else {
            ageWarning.style.display = "none";
        }
    }
});