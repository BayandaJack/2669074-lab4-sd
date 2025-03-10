document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("#countryForm");
    const countryInput = document.querySelector("#countryInput");
    const ul = document.querySelector("#countryDetails");
    const borderUl = document.querySelector("#borderDetails"); // For bordering countries

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload
        const countryName = countryInput.value.trim();
        if (countryName) {
            getCountryData(countryName);
        } else {
            alert("Enter a country name!");
        }
    });

    function getCountryData(country) {
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const countryInfo = data[0];

                    // Clear any previous results
                    ul.innerHTML = '';
                    borderUl.innerHTML = ''; // Clear bordering countries list

                    // Capital
                    const capital = document.createElement("li");
                    capital.textContent = `Capital: ${countryInfo.capital ? countryInfo.capital[0] : "N/A"}`;
                    ul.appendChild(capital);

                    // Population
                    const pop = document.createElement("li");
                    pop.textContent = `Population: ${countryInfo.population}`;
                    ul.appendChild(pop);

                    // Region
                    const region = document.createElement("li");
                    region.textContent = `Region: ${countryInfo.region}`;
                    ul.appendChild(region);

                    // Flag
                    const flag = document.createElement("li");
                    const flagImg = document.createElement("img");

                    if (countryInfo.flags && countryInfo.flags.png) {
                        flagImg.src = countryInfo.flags.png;
                        flagImg.alt = `Flag of ${countryInfo.name.common}`;
                        flagImg.style.width = "100px"; // Set flag size
                        flag.appendChild(flagImg);
                        ul.appendChild(flag);
                    } else {
                        flag.textContent = "Flag: Not available";
                        ul.appendChild(flag);
                    }

                    // Bordering countries - Loop through `borders`
                    if (countryInfo.borders && countryInfo.borders.length > 0) {
                        countryInfo.borders.forEach(borderCode => {
                            // Fetch details for each bordering country by country code
                            fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                                .then(response => response.json())
                                .then(borderData => {
                                    const borderCountry = borderData[0];

                                    // Create list item for each border country flag and name
                                    const borderLi = document.createElement("li");

                                    // Get the flag image
                                    const borderFlagImg = document.createElement("img");
                                    if (borderCountry.flags && borderCountry.flags.png) {
                                        borderFlagImg.src = borderCountry.flags.png;
                                        borderFlagImg.alt = `Flag of ${borderCountry.name.common}`;
                                        borderFlagImg.style.width = "50px"; // Set border flag size
                                    }

                                    // Add the country name as text content to the list item
                                    borderLi.textContent = borderCountry.name.common; // Full country name

                                    borderLi.appendChild(borderFlagImg);

                                    // Append the border country list item to the border details list
                                    borderUl.appendChild(borderLi);
                                })
                                .catch(error => {
                                    console.error("Error fetching bordering country data", error);
                                });
                        });
                    } else {
                        const noBorders = document.createElement("li");
                        noBorders.textContent = "No bordering countries.";
                        borderUl.appendChild(noBorders);
                    }
                } else {
                    alert("Country not found!");
                }
            })
            .catch(error => {
                console.error("An error occurred fetching the data", error);
            });
    }
});
