
// Get HTML elements
const selectedSpaceContainer =
    document.getElementById("selectedSpace");

const bookingForm =
    document.getElementById("bookingForm");

const bookingDate =
    document.getElementById("bookingDate");

const startTime =
    document.getElementById("startTime");

const duration =
    document.getElementById("duration");

const hourlyPrice =
    document.getElementById("hourlyPrice");

const selectedDuration =
    document.getElementById("selectedDuration");

const totalPrice =
    document.getElementById("totalPrice");

const bookingError =
    document.getElementById("bookingError");

const myBookings =
    document.getElementById("myBookings");

const emptyBookings =
    document.getElementById("emptyBookings");

const confirmBtn =
    document.getElementById("confirmBtn");


// Get selected workspace from LocalStorage
let selectedSpace = JSON.parse(
    localStorage.getItem("selectedSpace")
);


// Set minimum booking date to today
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayString = `${year}-${month}-${day}`;

bookingDate.min = todayString;


// Display selected workspace
function displaySelectedSpace() {

    if (selectedSpace === null) {

        selectedSpaceContainer.innerHTML =
            "<p>Please select a workspace from the Explore Spaces page.</p>";

        bookingForm.style.display = "none";

        return;
    }

    bookingForm.style.display = "block";

    selectedSpaceContainer.innerHTML = `
        <img src="${selectedSpace.image}" alt="${selectedSpace.name}">

        <div>
            <h3>${selectedSpace.name}</h3>

            <p>📍 ${selectedSpace.location}</p>

            <p>Type: ${selectedSpace.type}</p>

            <p class="space-price">
                ₹${selectedSpace.price} / hour
            </p>
        </div>
    `;

    hourlyPrice.textContent = `₹${selectedSpace.price}`;

    calculateTotal();
}


// Calculate booking price
function calculateTotal() {

    if (!selectedSpace) {
        return;
    }

    const hours = Number(duration.value);

    const total = selectedSpace.price * hours;

    selectedDuration.textContent =
        `${hours} Hour(s)`;

    totalPrice.textContent = `₹${total}`;
}


// Update price when duration changes
duration.addEventListener("change", calculateTotal);


// Confirm booking
bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    bookingError.textContent = "";

    if (!selectedSpace) {
        bookingError.textContent =
            "Please select a workspace first.";
        return;
    }

    const date = bookingDate.value;
    const time = startTime.value;
    const hours = Number(duration.value);

    if (!date || !time) {
        bookingError.textContent =
            "Please select a date and start time.";
        return;
    }

    if (date < todayString) {
        bookingError.textContent =
            "Please select today or a future date.";
        return;
    }

    // Calculate end time
    const startMinutes = Number(time.split(":")[0]) * 60
        + Number(time.split(":")[1]);

    const endMinutes = startMinutes + hours * 60;

    if (endMinutes > 24 * 60) {
        bookingError.textContent =
            "The booking cannot extend beyond midnight.";
        return;
    }

    const total = selectedSpace.price * hours;

    // Create booking object
    const newBooking = {

        bookingId: Date.now(),

        spaceName: selectedSpace.name,

        location: selectedSpace.location,

        type: selectedSpace.type,

        date: date,

        startTime: time,

        duration: hours,

        price: total,

        status: "Confirmed"

    };


    // Get existing bookings
    let bookings = JSON.parse(
        localStorage.getItem("spacebookBookings")
    ) || [];


    // Add new booking
    bookings.push(newBooking);


    // Save bookings
    localStorage.setItem(
        "spacebookBookings",
        JSON.stringify(bookings)
    );


    alert("Your workspace has been booked successfully!");


    // Clear selected workspace
    localStorage.removeItem("selectedSpace");

    selectedSpace = null;

    bookingForm.reset();

    displaySelectedSpace();

    displayBookings();

});


// Display all bookings
function displayBookings() {

    const bookings = JSON.parse(
        localStorage.getItem("spacebookBookings")
    ) || [];

    myBookings.innerHTML = "";

    if (bookings.length === 0) {

        emptyBookings.style.display = "block";

        return;
    }

    emptyBookings.style.display = "none";


    bookings.forEach(function(booking) {

        const bookingCard = document.createElement("div");

        bookingCard.className = "booking-card";

        bookingCard.innerHTML = `

            <h3>${booking.spaceName}</h3>

            <p>📍 ${booking.location}</p>

            <p>Type: ${booking.type}</p>

            <p>Date: ${booking.date}</p>

            <p>Start Time: ${booking.startTime}</p>

            <p>Duration: ${booking.duration} hour(s)</p>

            <p>Total Amount: ₹${booking.price}</p>

            <p class="booking-status">
                Status: ${booking.status}
            </p>

            ${
                booking.status === "Confirmed"
                ? `<button class="cancel-btn"
                    data-id="${booking.bookingId}">
                    Cancel Booking
                   </button>`
                : ""
            }

        `;

        myBookings.appendChild(bookingCard);

    });

}


// Cancel booking using event delegation
myBookings.addEventListener("click", function(event) {

    if (event.target.classList.contains("cancel-btn")) {

        const bookingId = Number(event.target.dataset.id);

        const confirmCancel = confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        let bookings = JSON.parse(
            localStorage.getItem("spacebookBookings")
        ) || [];


        // Find and update the selected booking
        bookings = bookings.map(function(booking) {

            if (booking.bookingId === bookingId) {

                booking.status = "Cancelled";

            }

            return booking;

        });


        // Save updated bookings
        localStorage.setItem(
            "spacebookBookings",
            JSON.stringify(bookings)
        );


        displayBookings();

        alert("Booking cancelled successfully!");

    }

});


// Initial page display
displaySelectedSpace();

displayBookings();
