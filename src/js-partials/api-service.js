const BASE_URL = 'https://restcountries.eu/rest/v2/name'
function fetchCountryByName (countryName) {
    const url = `${BASE_URL}/${countryName}`
    return fetch(url)
     .then(response => {
        if(response.ok) return response.json();
        throw new Error('it`s new error');         
       })
       .catch(error => {console.error(error)      
       })
       
       }
    
  
 

 export default {fetchCountryByName}


