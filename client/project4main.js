console.log("Hello, JS");

var favRestauraunts = [];
var LOCATIONID = -1;

var acc = document.getElementsByClassName("accordion");
var i;

var image = document.createElement("img");
image.src = "images/fishing_guide.jpg";
var src = document.getElementById("fishing_guide");
src.appendChild(image);


var locationDiv = document.querySelector("#location_list");
locationDiv.style.display = "none";
var locationtable = document.querySelector("#location_table");
locationtable.style.display = "none";

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
var login_user = document.querySelector('#sign_in_button');
login_user.onclick = function(){
    var email_input = document.querySelector('#login_email');
    var password_input = document.querySelector('#login_pass_word');
    var email = email_input.value;
    var password = password_input.value;
    email_input.value = "";
    password_input.value = "";
    loginUser(email,password);
} 

var add_user = document.querySelector('#user_sign_up');
add_user.onclick = function(){
    var first_name_input = document.querySelector('#first_name');
    var last_name_input = document.querySelector('#last_name');
    var email_input = document.querySelector('#email');
    var password_input = document.querySelector('#pass_word');
    var fav_locations_input = document.querySelector('#fav_locations');
    var first_name = first_name_input.value;
    var last_name = last_name_input.value;
    var email = email_input.value;
    var password = password_input.value;
    var fav_locations = fav_locations_input.value;
    first_name_input.value = "";
    last_name_input.value = "";
    email_input.value = "";
    password_input.value = "";
    fav_locations_input.value = "";

    createNewUser(first_name,last_name,email,password,fav_locations);
} 


function createNewUser(first_name,last_name,email,password,fav_locations){
    var data = "first_name=" + encodeURIComponent(first_name);
    data += "&last_name=" + encodeURIComponent(last_name);
    data += "&email="     + encodeURIComponent(email);
    data += "&pass_word="  + encodeURIComponent(password);
    data += "&fav_locations=" + encodeURIComponent(fav_locations);
    fetch("https://utah-fishing-locations.herokuapp.com/users",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: data,
        credentials: "include"
    }).then(function(response){
        if (response.status == 422){
            var errormessage = document.querySelector("#errormessage")
            errormessage.style.display = "flex"
        }
        else {
            var correctmessage = document.querySelector("#correctmessage")
            correctmessage.style.display = "flex"
            var locationDiv = document.querySelector("#sign_up")
            locationDiv.style.display = "none"
        }
        var locationDiv = document.querySelector("sign_up")
        locationDiv.style.display = "none"

    
    });

};

function loginUser(email,pass_word){
    var data = "&email="     + encodeURIComponent(email);
    data += "&pass_word="  + encodeURIComponent(pass_word);
    fetch(" https://utah-fishing-locations.herokuapp.com/sessions",
    {   method:"POST",
        headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body: data,
    credentials: "include"})
    .then(function(response){

    if (response.status == 201){
        loadLocations()

    }
    else{
        var signinDiv = document.querySelector("#sign_in")
        signinDiv.style.border = "1px solid red"
        var errormessage2 = document.querySelector("#errormessage2")
        errormessage2.style.display = "flex"
    }
    });
}


//add champion button
var addbutton = document.querySelector("#location");
console.log("Button query:",addbutton);
addbutton.onclick = function(){
    // call a function to create a new restauraunt on the server api
    //step 1 query the input field
    var locationNameInput = document.querySelector("#location_name");
    //step 2 capture the text
    var locationName = locationNameInput.value;
    locationNameInput.value = "";
    //water_classification
    var waterInput = document.querySelector("#water");
    var waterClassification = waterInput.value;
    waterInput.value = "";
    //most_common_species
    var speciesInput = document.querySelector("#species");
    var locationSpecies = speciesInput.value;
    speciesInput.value = "";
    //fishing_methods
    var methodsInput = document.querySelector("#methods");
    var methods = methodsInput.value;
    methodsInput.value = "";
    //cs 
    var yearRoundInput = document.querySelector("#year_round");
    var yearRound = yearRoundInput.value;
    yearRoundInput.value = "";
    //step 3 call the createrestauraunt functions,passing the text value
    createLocation(locationName,waterClassification,locationSpecies,methods,yearRound);
};
//create a new restaraunt on the server
function createLocation(locationName,waterClassification,locationSpecies,methods,yearRound){
    var data = 'name=' + encodeURIComponent(locationName);
    data += '&water_classification=' + encodeURIComponent(waterClassification);
    data += '&most_common_species=' + encodeURIComponent(locationSpecies);
    data += '&fishing_methods=' + encodeURIComponent(methods);
    data += '&open_year_round=' + encodeURIComponent(yearRound);
    console.log("this is the data im going to send to the server:",data);
    fetch(" https://utah-fishing-locations.herokuapp.com/locations" ,{
        method: 'POST',
        credentials: 'include',
        body: data , 
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(function(response){
    //here, the server has responded/
        loadLocations();
        //slight bug: the list of restauraunts gets duplicated
    });
    //here, the server has responded
}

var updateLocation = function (locationName,waterClassification,locationSpecies,methods,yearRound,locationID) {
    var data = 'name=' + encodeURIComponent(locationName);
    data += '&water_classification=' + encodeURIComponent(waterClassification);
    data += '&most_common_species=' + encodeURIComponent(locationSpecies);
    data += '&fishing_methods=' + encodeURIComponent(methods);
    data += '&open_year_round=' + encodeURIComponent(yearRound);
    console.log("this is the updated champion",data);  
    fetch(" https://utah-fishing-locations.herokuapp.com/locations/" + locationID,{
        method: "PUT",
        body: data,
        credentials: 'include',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log("updated the champ list")
        loadLocations();
    });
}
function deleteLocationFromServer(locationID){
    fetch(" https://utah-fishing-locations.herokuapp.com/locations/" + champID,{
        method: "DELETE",
        credentials:'include'
    }).then(function(response){
        console.log("deleted location with id: ", locationID)
        loadLocations();
    });
}
function loadOneLocation(location) {
    fetch(" https://utah-fishing-locations.herokuapp.com/locations/" + location.id, {
        method:"GET",
        credentials: 'include'
    }).then(function(response) {
        console.log('retrieve one location: ', location)
    });
}


//load favRestauraunts from a server as JSON data
function loadLocations(){
    fetch(" https://utah-fishing-locations.herokuapp.com/locations",{credentials: "include"}).then(function(response){
        if (response.status == 401){
            // hide ui
            var locationDiv = document.querySelector("#location_list");
            locationDiv.style.display = "none";
            var locationtable = document.querySelector("#location_table");
            locationtable.style.display = "none";
            // show login and/or register ui
            return;
        }
        var locationDiv = document.querySelector("#sign_up")
        locationDiv.style.display = "none"
        var signinDiv = document.querySelector("#sign_in")
        signinDiv.style.display = "none"
        console.log(response);
        response.json().then(function (data){
            console.log("from the server:" , data);
            Locations = data; // this is a list
            //step 1:query the parent  element
            var locationtable = document.querySelector("#location_table");
            locationtable.style.display = ""
            var locationList = document.querySelector("#location_list");
            locationList.style.display = "";
            console.log("Location List Query:", locationList);
            locationList.innerHTML = "";
            Locations.forEach(function (location) {
                var newListItem = document.createElement("li");
                //display location name
                var nameDiv = document.createElement("div");
                nameDiv.innerHTML = "Name--> " + location.name;
                nameDiv.classList.add("location-name");
                newListItem.appendChild(nameDiv);
                //display water classification 
                var waterDiv = document.createElement("div");
                waterDiv.innerHTML ="Classification of water--> " + location.water_classification;
                waterDiv.classList.add("water-classification")
                newListItem.appendChild(waterDiv);
                // most common species
                var speciesDiv = document.createElement("div");
                speciesDiv.innerHTML ="Most common type of species--> " + location.most_common_species;
                newListItem.appendChild(speciesDiv);
                // fishing methods
                var methodsDiv = document.createElement("div");
                methodsDiv.innerHTML ="Most common fishing methods used.--> " + location.fishing_methods;
                newListItem.appendChild(methodsDiv);
                //open year round
                var yearroundDiv = document.createElement("div")
                yearroundDiv.innerHTML ="Is it open year round?--> " +  location.open_year_round;
                newListItem.appendChild(yearroundDiv);
                //one button element for delete
                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    console.log("delete button clicked",location.id);
                    if (confirm("Are you sure?")) {
                        deleteLocationFromServer(location.id);
                    }
                };
                newListItem.appendChild(deleteButton);
                //edit button
                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.onclick = function () {
                    console.log("edit button clicked",location.id);
                    //to do call editchampfromserver function(champ.id,champ.name...)
                    var locationNameInput = document.querySelector("#location_name");
                    //step 2 capture the text
                    locationNameInput.value = location.name;
                    // water classification
                    var waterInput = document.querySelector("#water");
                    waterInput.value = location.water_classification;
                    //most common species
                    var speciesInput = document.querySelector("#species");
                    speciesInput.value = location.most_common_species;
                    //fishing methods
                    var methodsInput = document.querySelector("#methods");
                    methodsInput.value = location.fishing_methods;
                    //open year round
                    var yearRoundInput = document.querySelector("#year_round");
                    yearRoundInput.value = location.open_year_round;
                    LOCATIONID = location.id;

                    var secondeditbutton = document.createElement("button");
                    secondeditbutton.innerHTML = "Edit";
                    secondeditbutton.onclick = function () {
                            // call a function to create a new restauraunt on the server api
                            //step 1 query the input field
                            //step 2 capture the text.name
                            var locationName = locationNameInput.value;
                            locationNameInput.value = ""; 
                            //water classification
                            
                            var waterClassification = waterInput.value;
                            waterInput.value = "";
                            //most common species
                            
                            var commonSpecies = speciesInput.value;
                            speciesInput.value = "";
                            //methods 
                            
                            var methods = methodsInput.value;
                            methodsInput.value = "";
                            //open year round
                            
                            var openYearRound = yearRoundInput.value;
                            yearRoundInput.value = "";

                            //step 3 call the createrestauraunt functions,passing the text value
                            updateLocation(locationName,waterClassification,commonSpecies,methods,openYearRound,LOCATIONID);
                            secondeditbutton.parentNode.removeChild(secondeditbutton);
                    }
                    document.querySelector("#location_table").appendChild(secondeditbutton);

                    // updateChamp(champ.name,champ.role,champ.win,champ.champ_played_against,champ.cs,champ.kills,champ.deaths,champ.assists,champ.id);
                };
                newListItem.appendChild(editButton);
                
                //step 3 append the child to the parent
                locationList.appendChild(newListItem);
            });
        });
 
   });
}

//immediately when the page loads
loadLocations();