const showsTable = document.querySelector(".shows__table");
const showsTableBody = document.querySelector(".shows__table-body");

const tableDataRows = document.querySelectorAll(".shows__table-data-row");

const shows = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    }, {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    }, {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA"
    }, {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    }, {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    }, {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];

tableDataRows.forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === "td") {
            const tableDataRow = e.target.parentNode;

            // remove existing active rows
            const activeRows = document.querySelectorAll(".shows__table-data-row--active");
            activeRows.forEach(rowEl => {
                rowEl.classList.remove("shows__table-data-row--active");
            });

            // make clicked row active
            // tableDataRow.classList.remove("shows__table-data-row");
            tableDataRow.classList.add("shows__table-data-row--active");
        }
    })
});

function addShowsTableRow(show) {
    const tableRowEl = document.createElement("tr");
    tableRowEl.classList.add("shows__table-data-row");

    const showDateEl = document.createElement("td");
    showDateEl.classList.add("shows__table-data-date");
    showDateEl.innerText = show.date;

    const showVenueEl = document.createElement("td");
    showVenueEl.innerText = show.venue;

    const showLocationEl = document.createElement("td");
    showLocationEl.innerText = show.location;

    const showBuyCellEl = document.createElement("td");
    const showButtonEl = document.createElement("button");
    showButtonEl.innerText = "BUY TICKETS";
    showBuyCellEl.appendChild(showButtonEl);

    tableRowEl.appendChild(showDateEl);
    tableRowEl.appendChild(showVenueEl);
    tableRowEl.appendChild(showLocationEl);
    tableRowEl.appendChild(showBuyCellEl);

    showsTableBody.appendChild(tableRowEl);
}

function renderShows() {
    if (window.innerWidth >= 768) {
        showsTable.classList.remove("shows__table--hide");
        shows.forEach(addShowsTableRow);
    } else {
        showsTable.classList.add("shows__table--hide");
    }
}

window.addEventListener("resize", function() {
    while (showsTableBody.firstChild) {
        showsTableBody.removeChild(showsTableBody.firstChild);
    }
    renderShows();
});

renderShows();
