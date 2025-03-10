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
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => {
            response.json()
        }).then((data) => {
            
            //console.log(data);
        })
        .catch((error) => {
            throw new Error("An error occurred fetching the data")
        })
    }