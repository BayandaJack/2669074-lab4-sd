const form = document.querySelector("#countryForm");
const countryInput = document.querySelector("#countryInput");

form.addEventListener("submit", function(event) {
    event.preventDefault(); //prevent page reload
    const countryName = countryInput.value.trim();
    if (countryName){
        getCountryData(countryName)
    } else{

    }
})


function getCountryData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            const countryInfo = data[0];
            const capital = document.createElement("li")
            capital.textContent = `Capital: ${countryInfo.capital[0]}`;
            ul.appendChild(capital);
            //
            const pop = document.createElement("li")
            pop.textContent = `Population: ${countryInfo.pop}`;
            ul.appendChild(pop);
            //
            const region = document.createElement("li")
            region.textContent = `Region: ${countryInfo.region}`;
            ul.appendChild(region);
            //
            const flag = document.createElement("li");
            const flagImg = document.createElement("img");
            flagImg.src = countryInfo.flags.png;
            //flagImg.alt = `Flag of ${countryInfo.name.common}`;
            flagImg.style.width = "100px"; // Set flag size
            flag.appendChild(flagImg);
            ul.appendChild(flag);
            //console.log(data.name);
        })
        .catch((error) => {
            throw new Error("An error occurred fetching the data")
        })
    }