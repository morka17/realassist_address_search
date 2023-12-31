// const axios = require("axios");

const searchField = document.querySelector('input[name="search"]');
const dropdownList = document.querySelector("#dropdown-list");

async function searchAddresses(searchQuery) {
  try {
    const response = await axios.get(
      "https://api.bhr.fyi/api/address/search/",
      {
        params: {
          search: searchQuery,
        },
      }
    );

    console.log(response.data.data.results)

    return response.data.data.results;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Update the dropdown list with the list of addresses.
function updateDropdownList(addresses) {
  dropdownList.innerHTML = "";

  for (const address of addresses) {
    const option = document.createElement("option");
    option.value = address.zipcode;
    option.textContent = address.displayAddress;

    dropdownList.appendChild(option);
  }
}

// Update the dropdown list when the user edits the text search field.
searchField.addEventListener("input", async (event) => {
  const searchQuery = event.target.value;

  const addresses = await searchAddresses(searchQuery);

  updateDropdownList(addresses);
});

// async function fetchData(searchQuery) {
//   const addresses = await searchAddresses(searchQuery);
//   console.log(addresses)

//   // updateDropdownList(addresses);
// //   try {
// //     const response = await axios.get(
// //       "https://api.bhr.fyi/api/address/search/?search=123"
// //     );
// //     console.log(response.data.data.results[0].displayAddress);
// //   } catch (error) {
// //     console.error("Error:", error);
// //   }
// }

// fetchData("123");
