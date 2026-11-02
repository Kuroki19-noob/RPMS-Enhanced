
let slides = document.querySelectorAll(".slide");
// Get all dots
let dots = document.querySelectorAll(".dot");
// Keep track of which slide is showing
let currentIndex = 0;

function showSlide(index) {
    // If we go past the last slide,
    // return to the first slide
    if (index >= slides.length) {
        currentIndex = 0;
    }
    // If we go before the first slide,
    // go to the last slide
    else if (index < 0) {
        currentIndex = slides.length - 1;
    }
    // Otherwise use the selected slide
    else {
        currentIndex = index;
    }
    // Remove active from every slide
    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });
    // Remove active from every dot
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });
    // Show current slide
    slides[currentIndex].classList.add("active");
    // Highlight current dot
    dots[currentIndex].classList.add("active");

}


function changeSlide(direction) {

    showSlide(currentIndex + direction);

}


function currentSlide(index) {

    showSlide(index);

}


setInterval(function() {

    changeSlide(1);

}, 5000);


function simulatePayment(apartment, amount) {
    const payment = {
        apartmentName: apartment,
        amount: amount,
        method: "GCash (Demo)",
        status: "Paid - Simulation",
        reference: "DEMO-" + Date.now(),
        date: new Date().toLocaleString()
    };

    // Get existing demo payments
    const payments = JSON.parse(
        localStorage.getItem("demoPayments") || "[]"
    );

    // Add the new payment
    payments.push(payment);

    // Save the payments in this browser
    localStorage.setItem(
        "demoPayments",
        JSON.stringify(payments)
    );

    return payment;
}


// Get the elements from payment.html
const payButton = document.getElementById("payButton");
const receipt = document.getElementById("receipt");
const printButton = document.getElementById("printButton");

// Get apartment information from the page
const apartmentNameElement =
    document.getElementById("apartmentName");

const apartmentPriceElement =
    document.getElementById("apartmentPrice");


// When the renter clicks Confirm Demo Payment
payButton.addEventListener("click", function () {

    const apartment = apartmentNameElement.textContent.trim();

    // Example price: ₱5,000
    const amountText = apartmentPriceElement.textContent
        .replace(/[₱,\s]/g, "");

    const amount = Number(amountText);

    // Basic validation
    if (!apartment || !Number.isFinite(amount) || amount <= 0) {
        alert("Please check the apartment name and rental amount.");
        return;
    }

    // Simulate the payment
    const payment = simulatePayment(apartment, amount);

    // Display the receipt information
    document.getElementById("receiptApartment").textContent =
        payment.apartmentName;

    document.getElementById("receiptAmount").textContent =
        "₱" + payment.amount.toLocaleString("en-PH");

    document.getElementById("receiptMethod").textContent =
        payment.method;

    document.getElementById("receiptStatus").textContent =
        payment.status;

    document.getElementById("receiptReference").textContent =
        payment.reference;

    document.getElementById("receiptDate").textContent =
        payment.date;

    // Show the receipt
    receipt.classList.remove("hidden");

    // Update the button
    payButton.textContent = "Demo Payment Completed";
    payButton.disabled = true;
    payButton.style.background = "#64748b";

    // Bring the receipt into view
    receipt.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// Print the simulated receipt
printButton.addEventListener("click", function () {
    window.print();
});


function displayDemoPayments() {
    const payments = JSON.parse(
        localStorage.getItem("demoPayments") || "[]"
    );

    const paymentList = document.getElementById("paymentList");

    paymentList.innerHTML = "";

    if (payments.length === 0) {
        paymentList.innerHTML = "<p>No demo payments yet.</p>";
        return;
    }

    payments.forEach(payment => {
        const item = document.createElement("div");

        item.innerHTML = `
            <h3>${payment.apartmentName}</h3>
            <p>Amount: ₱${payment.amount}</p>
            <p>Method: ${payment.method}</p>
            <p>Status: ${payment.status}</p>
            <p>Reference: ${payment.reference}</p>
            <p>Date: ${payment.date}</p>
            <hr>
        `;

        paymentList.appendChild(item);
    });
}

displayDemoPayments();