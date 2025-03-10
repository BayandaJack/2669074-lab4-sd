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
            response.json()
        }).then((data) => {
            const capital = document.createElement("li")
            capital.textContent = `Capital: ${data.capital}`;
            ul.appendChild(capital);
            //
            const pop = document.createElement("li")
            pop.textContent = `Population: ${data.pop}`;
            ul.appendChild(pop);
            //
            const region = document.createElement("li")
            region.textContent = `Region: ${data.region}`;
            ul.appendChild(region);
            //
            const flag = document.createElement("li")
            capital.textContent = `Flag: ${data.flags.png}`;
            ul.appendChild(flag);
            //console.log(data.name);
        })
        .catch((error) => {
            throw new Error("An error occurred fetching the data")
        })
    }