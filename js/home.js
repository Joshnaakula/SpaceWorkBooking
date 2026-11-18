
// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});


// WORKSPACE SEARCH

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const location = document.getElementById("location").value.trim();

    const spaceType = document.getElementById("spaceType").value;

    // Validate location
    if (location === "") {
        alert("Please enter a location!");
        return;
    }

    // Pass search details to Explore page
    const searchParams = new URLSearchParams();

    searchParams.set("location", location);
    searchParams.set("type", spaceType);

    window.location.href =
        "explore.html?" + searchParams.toString();

});
