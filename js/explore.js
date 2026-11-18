
// Workspace data
const spaces = [
    {
        id: 1,
        name: "WeWork Business Centre",
        location: "Hitech City, Hyderabad",
        type: "Coworking",
        price: 250,
        facilities: "Wi-Fi, AC, Coffee, Power Backup",
        image: "../img/spacework6.jpg"
    },
    {
        id: 2,
        name: "Premium Private Office",
        location: "Gachibowli, Hyderabad",
        type: "Private Office",
        price: 500,
        facilities: "Wi-Fi, AC, Parking, Reception",
        image: "../img/spacework4.jpg"
    },
    {
        id: 3,
        name: "Creative Meeting Room",
        location: "Madhapur, Hyderabad",
        type: "Meeting Room",
        price: 800,
        facilities: "Projector, Wi-Fi, AC, Whiteboard",
        image: "../img/meeting-room.jpg"
    },
    {
        id: 4,
        name: "Focus Study Space",
        location: "Kukatpally, Hyderabad",
        type: "Study Space",
        price: 150,
        facilities: "Wi-Fi, Quiet Zone, Charging Points",
        image: "../img/workspace3.jpg"
    },
    {
        id: 5,
        name: "Modern Coworking Hub",
        location: "Kondapur, Hyderabad",
        type: "Coworking",
        price: 300,
        facilities: "Wi-Fi, AC, Cafeteria, Lounge",
        image: "../img/office2.jpg"
    },
    {
        id: 6,
        name: "Executive Meeting Room",
        location: "Banjara Hills, Hyderabad",
        type: "Meeting Room",
        price: 1000,
        facilities: "Projector, Video Conferencing, Wi-Fi",
        image: "../img/spacework5.jpg"
    }
];

// Get HTML elements
const spacesContainer = document.getElementById("spacesContainer");
const locationSearch = document.getElementById("locationSearch");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

// Display workspace cards
function displaySpaces(workspaceList) {

    spacesContainer.innerHTML = "";

    resultCount.textContent =
        `${workspaceList.length} workspace(s) found`;

    if (workspaceList.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    workspaceList.forEach(function(space) {

        const card = document.createElement("div");
        card.className = "space-card";

        card.innerHTML = `
            <img src="${space.image}" alt="${space.name}">

            <div class="space-info">

                <h3>${space.name}</h3>

                <p class="space-location">
                    📍 ${space.location}
                </p>

                <span class="space-type">
                    ${space.type}
                </span>

                <p class="facilities">
                    ${space.facilities}
                </p>

                <div class="card-bottom">

                    <p class="price">
                        ₹${space.price}
                        <span>/ hour</span>
                    </p>

                    <button class="book-btn" data-id="${space.id}">
                        Book Now
                    </button>

                </div>

            </div>
        `;

        spacesContainer.appendChild(card);
    });
}

// Search and filter workspaces
function filterSpaces() {

    const location = locationSearch.value.trim().toLowerCase();
    const type = typeFilter.value;
    const maxPrice = priceFilter.value;

    const filteredSpaces = spaces.filter(function(space) {

        const matchesLocation =
            space.location.toLowerCase().includes(location);

        const matchesType =
            type === "all" || space.type === type;

        const matchesPrice =
            maxPrice === "all" || space.price <= Number(maxPrice);

        return matchesLocation && matchesType && matchesPrice;
    });

    displaySpaces(filteredSpaces);
}

// Search button
searchBtn.addEventListener("click", filterSpaces);

// Reset filters
resetBtn.addEventListener("click", function() {

    locationSearch.value = "";
    typeFilter.value = "all";
    priceFilter.value = "all";

    displaySpaces(spaces);
});

// Book Now button using event delegation
spacesContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("book-btn")) {

        const selectedId = Number(event.target.dataset.id);

        const selectedSpace = spaces.find(function(space) {
            return space.id === selectedId;
        });

        localStorage.setItem(
            "selectedSpace",
            JSON.stringify(selectedSpace)
        );

        window.location.href = "booking.html";
    }
});

// Read search values passed from the Home page
const params = new URLSearchParams(window.location.search);

const locationFromHome = params.get("location");
const typeFromHome = params.get("type");

if (locationFromHome) {
    locationSearch.value = locationFromHome;
}

if (typeFromHome) {
    const typeMap = {
        coworking: "Coworking",
        private: "Private Office",
        meeting: "Meeting Room"
    };

    typeFilter.value = typeMap[typeFromHome] || "all";
}

// Initial display
filterSpaces();
