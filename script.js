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
            capital.textContent = `Capital: ${countryInfo.capital}`;
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
            const flag = document.createElement("li")
            flag.textContent = `Flag: ${countryInfo.flags.png}`;
            ul.appendChild(flag);
            //console.log(data.name);
        })
        .catch((error) => {
            throw new Error("An error occurred fetching the data")
        })
    }