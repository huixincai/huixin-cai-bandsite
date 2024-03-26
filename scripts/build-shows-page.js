const showsList = document.querySelector(".shows__list");

const showsTable = document.querySelector(".shows__table");
const showsTableBody = document.querySelector(".shows__table-body");

const apiKey = "854cd8c6-8cf9-4ba9-bc5d-4230f7932efb";
const baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";

const bandSiteApi = new BandSiteApi(apiKey, baseUrl);

let shows;

function addTableRowSelectListener() {
  const tableDataRows = document.querySelectorAll(".shows__table-data-row");

  tableDataRows.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName.toLowerCase() === "td") {
        const tableDataRow = e.target.parentElement;

        // remove existing active rows
        const activeRows = document.querySelectorAll(
          ".shows__table-data-row--active"
        );
        activeRows.forEach((rowEl) => {
          rowEl.classList.remove("shows__table-data-row--active");
        });

        tableDataRow.classList.add("shows__table-data-row--active");
      }
    });
  });
}

function addListItemSelectListener() {
  const listItems = document.querySelectorAll(".shows__item");

  listItems.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let listItemEl = e.target;
      if (listItemEl.parentElement.classList.contains("shows__item-field")) {
        listItemEl = listItemEl.parentElement;
      }
      if (listItemEl.classList.contains("shows__item-field")) {
        listItemEl = listItemEl.parentElement;
      }
      if (listItemEl.classList.contains("shows__item")) {
        // remove existing active items
        const activeItems = document.querySelectorAll(".shows__item--active");
        activeItems.forEach((itemEl) => {
          itemEl.classList.remove("shows__item--active");
        });
        listItemEl.classList.add("shows__item--active");
      }
    });
  });
}

function timestampToMMDDYYYY(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function addShowsTableRow(show) {
  const tableRowEl = document.createElement("tr");
  tableRowEl.classList.add("shows__table-data-row");

  const showDateEl = document.createElement("td");
  showDateEl.classList.add("shows__table-data-date");
  showDateEl.innerText = timestampToMMDDYYYY(show.date);

  const showVenueEl = document.createElement("td");
  showVenueEl.innerText = show.place;

  const showLocationEl = document.createElement("td");
  showLocationEl.innerText = show.location;

  const showBuyCellEl = document.createElement("td");
  showBuyCellEl.classList.add("shows__table-data-button");

  const showButtonEl = document.createElement("button");
  showButtonEl.innerText = "BUY TICKETS";

  showBuyCellEl.appendChild(showButtonEl);

  tableRowEl.appendChild(showDateEl);
  tableRowEl.appendChild(showVenueEl);
  tableRowEl.appendChild(showLocationEl);
  tableRowEl.appendChild(showBuyCellEl);

  showsTableBody.appendChild(tableRowEl);
}

function addShowsListItem(show) {
  const listItemEl = document.createElement("div");
  listItemEl.classList.add("shows__item");

  const listItemDateFieldEl = document.createElement("div");
  listItemDateFieldEl.classList.add("shows__item-field");

  const listItemDateLabel = document.createElement("div");
  listItemDateLabel.classList.add("shows__item-label");
  listItemDateLabel.innerText = "DATE";

  const listItemDateValue = document.createElement("div");
  listItemDateValue.classList.add("shows__item-value");
  listItemDateValue.classList.add("shows__item-date");
  listItemDateValue.innerText = timestampToMMDDYYYY(show.date);

  listItemDateFieldEl.appendChild(listItemDateLabel);
  listItemDateFieldEl.appendChild(listItemDateValue);

  const listItemVenueFieldEl = document.createElement("div");
  listItemVenueFieldEl.classList.add("shows__item-field");

  const listItemVenueLabel = document.createElement("div");
  listItemVenueLabel.classList.add("shows__item-label");
  listItemVenueLabel.innerText = "VENUE";

  const listItemVenueValue = document.createElement("div");
  listItemVenueValue.classList.add("shows__item-value");
  listItemVenueValue.innerText = show.place;

  listItemVenueFieldEl.appendChild(listItemVenueLabel);
  listItemVenueFieldEl.appendChild(listItemVenueValue);

  const listItemLocationFieldEl = document.createElement("div");
  listItemLocationFieldEl.classList.add("shows__item-field");

  const listItemLocationLabel = document.createElement("div");
  listItemLocationLabel.classList.add("shows__item-label");
  listItemLocationLabel.innerText = "LOCATION";

  const listItemLocationValue = document.createElement("div");
  listItemLocationValue.classList.add("shows__item-value");
  listItemLocationValue.innerText = show.location;

  listItemLocationFieldEl.appendChild(listItemLocationLabel);
  listItemLocationFieldEl.appendChild(listItemLocationValue);

  const listItemTicketFieldEl = document.createElement("div");
  listItemTicketFieldEl.classList.add("shows__item-field");

  const listItemTicketButton = document.createElement("button");
  listItemTicketButton.classList.add("shows__item-button");
  listItemTicketButton.innerText = "BUY TICKETS";

  listItemTicketFieldEl.appendChild(listItemTicketButton);

  listItemEl.appendChild(listItemDateFieldEl);
  listItemEl.appendChild(listItemVenueFieldEl);
  listItemEl.appendChild(listItemLocationFieldEl);
  listItemEl.appendChild(listItemTicketFieldEl);

  showsList.appendChild(listItemEl);

  const divider = document.createElement("div");
  divider.classList.add("divider");
  showsList.appendChild(divider);
}

function renderShows() {
  if (window.innerWidth >= 768) {
    showsTable.classList.remove("shows__table--hide");
    shows.forEach(addShowsTableRow);
    addTableRowSelectListener();
  } else {
    showsTable.classList.add("shows__table--hide");
    shows.forEach(addShowsListItem);
    addListItemSelectListener();
  }
}

window.addEventListener("resize", function () {
  showsTableBody.innerHTML = "";
  showsList.innerHTML = "";

  renderShows();
});

async function init() {
  shows = await bandSiteApi.getShows();
  renderShows();
}

init();
