url = "https://developer.nps.gov/api/v1/parks?fields=addresses,images&api_key=3LhqCwQOIwJ1sMOeSRMVmNGbzCjhDXWtyTx6s96l&"

function displayParks(data){
    $(".result").html("");
    console.log(data);
    console.log(data.data.length);
    for(i=0;i<data.data.length;i++){
        $(".result").append(`<h2>${data.data[i].name}</h2><h3><a href="${data.data[i].url}">link</a>
        </h3><p>${data.data[i].addresses[0].line1} ${data.data[i].addresses[0].line2} ${data.data[i].addresses[0].line3}
         ${data.data[i].addresses[0].city}, ${data.data[i].addresses[0].stateCode} ${data.data[i].addresses[0].postalCode}
        </p><p>${data.data[i].description}</p>
        <img src="${data.data[i].images[0].url}" alt="${data.data[i].images[0].altText}"/>`);
    }
}

function getParks(terms){
    newUrl = url;
    newUrl+= renderTerms(terms);
    console.log(newUrl);

    fetch(newUrl)
    
    .then(response =>{ if(response.ok){
        return response.json();
    }
    throw new error(response.statusText);
})
    .then(responseJson => displayParks(responseJson))
    .catch(error => alert("something wrong!"));
}

function renderTerms(terms){
    newTerms = Object.keys(terms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(terms[key])}`)
    return newTerms.join('&');
}

function pressButton(){
    $(".input").on("submit",event => {
    event.preventDefault();
    state = document.getElementById("state").value;
    searchTerm = document.getElementById("search").value;
    max = document.getElementById("max").value;
    console.log(state,searchTerm,max);
    const terms = {
        stateCode: state,
        q: searchTerm,
        limit: max
    };
    getParks(terms);
    })
}

$(pressButton);