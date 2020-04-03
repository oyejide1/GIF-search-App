// DOM Variables
let gifBoxes = document.querySelectorAll("div.gif-box");
let gifImgs = document.getElementsByTagName("img");
let loaderIcon = document.getElementById("loader");
    loaderIcon.style.display = "none";
let searchForm = document.forms["fname"];
let searchInput = searchForm["search-name"];
let errorParagraph = document.getElementById("error-message");

// API URL
let giphyAPI = searchQuery => `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=ZOEonCGqKG0RpUfUGZOigxO8ZOOqxzjf&limit=6`;

// Search Control Functions
let getSearchValue = () => {
        let searchValue =  searchInput.value;
            searchValue = searchValue.replace(/ /g, "+");
        if (!searchValue) return undefined;

        return searchValue;
}

let createAnElement = (element) => {
        return document.createElement(element);
}

let appendElement = (parent, child) => {
        return parent.appendChild(child);
}

let displayGifs = (gifObj) => {
        let gifData = gifObj.data;
        for (let x=0; x < gifBoxes.length; x++){
                for (let i=0; i < gifData.length; i++){
                        if (x == i){
                                let img = createAnElement("img");
                                img.src = gifData[i].images.fixed_width_small.url;
                                appendElement(gifBoxes[x], img);
                        } 
                }
        }
        loaderIcon.style.display = "none";
}

let clearGifBoxes = () => {
        for (let x=0; x < gifImgs.length; x++){
                for (let i=0; i < gifBoxes.length; i++){
                        gifBoxes[i].removeChild(gifBoxes[i].firstChild);  
                }
        }
}

searchForm.addEventListener("submit",(even) => {
        
        even.preventDefault();
        if(gifImgs) { clearGifBoxes(); }
      
        let searchValue = getSearchValue();
        let url = giphyAPI(searchValue);
        loaderIcon.style.display = "inline";

        fetch(url)
        .then((response) => {
                if (response.ok) return response;

                return Promise.reject(error)
        })
        .then( response => response.json() )
        .then( result => displayGifs(result) )
        .catch((error) => {
                errorParagraph.innerHTML= `Sorry an error occurred!  Error: ${error.message}`;
                loaderIcon.style.display = "none";
        });
});




