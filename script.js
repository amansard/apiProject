//set a const variable for your API's url string
const baseURL = "https://ghibliapi.herokuapp.com/people";
let url;

//set a const variable for the section of the html you wish to query select to manifest your displayed elements
const submitBtn = document.querySelector(".submit");
const section = document.querySelector(".searchResults");

//begin your fetch and pass it your url 
submitBtn.addEventListener("click", fetchResults);

function fetchResults(e) {
    e.preventDefault();
    console.log(e);
    url = `${baseURL}`;
    console.log(url);

    //create your first .then promise resolver which is going to grab results from our database
    fetch(url)
        .then(function(results) {
            console.log(results);
            return results.json();
        })


    //create the second .then that's going to pass the json/json variable object to our display function, a good place to console.log our object 
    .then(function(json) {
        console.log(json);
        displayResults(json);
    })
}

//optional catch error on the end of the fetch


//declare a display function, (called in fetch) and passed it the json object(can give new/same variable name)
function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    // console.log your object variable that is passed into the display function 
    console.log("DisplayResults", json);
    let people = json;

    //build a forEach to display each object in the array 
    if (people.length === 0) {
        console.log("No Results");
    } else {
        //build and create the html tags
        let randomValue = Math.floor(Math.random() * (people.length - 0) + 0);
        let current = people[randomValue];

        let article = document.createElement("article");
        let name = document.createElement("h1")
        let heading = document.createElement("h2");
        let gender = document.createElement("p");
        let ageInfo = document.createElement("p")
        let eyecolorInfo = document.createElement("p");

        // set.attribute will give new elements id's or classes
        name.textContent = "Name: " + current.name;
        gender.innerText = "Gender: " + current.gender;

        if (current.age) {
            ageInfo.innerText = "Age: " + current.age;
        } else {
            ageInfo.innertext = "Age: Unknown";
        }

        //set the elements and object paths to one another, ex set img src to objects url string
        eyecolorInfo.innerText = "Eye Color: " + current.eye_color;

        //appendChild items to where they belong in the html or other created elements
        article.appendChild(heading);
        heading.appendChild(name);
        heading.appendChild(gender);
        heading.appendChild(ageInfo);
        heading.appendChild(eyecolorInfo);
        section.appendChild(article);
    }
}