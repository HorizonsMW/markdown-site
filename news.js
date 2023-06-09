async function news() {
  buildNewsUI();
  console.log("UI Complete");

  //Loading Status
  var listOfLinks_loading = document.getElementById("accordionArticleLinks");
  listOfLinks_loading.innerHTML = `<h3>Loading...</h3>`;
  newsDiv.innerHTML = ``;
  newsAuthorImg.innerHTML = "";
  newsTitle.innerHTML = "<h2>Fetching...</h2>";
  newsAuthor.innerHTML = "";
  newsDate.innerHTML = "";

  // Clear links first in the recent artircles section
  clearOldLInksInRecentArtircles();
  clearOldLinksInAllArtircles();

  try {
    // Fetch the news data and parse it as JSON
    const response = await fetch("news.json");
    const data = await response.json();

    // Get the length of the data object
    const length = Object.keys(data).length;

    //compute recents first to avoid totally blank page when an error occurs
    // populate recent articles section - with 3 of the most recent items
    for (var i = length; i > length - 3; i--) {
      // console.log(i); // print the current value of i
      // console.log(data[i]);
      if (data[i] == undefined) {
        // hide undefined links, by doing literally nothing, Ha! :)
        // var link = '';
      } else {
        let title = data[i].title;
        let slugTitle = slugify(title);

        var link = `#news-${slugTitle}`;
        // console.log(link);
        var linkBody = `
            <div class="accordion-item mb-2" style="border: 2px solid #ff480055;border-radius:26px; background: #fceed1cf;">
              <h2 class="accordion-header" id="heading-${title}">
                <button class="accordion-button bg-opacity-75 " style="color:#140e03f2; background:#ff480055;" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${slugTitle}" aria-expanded="true" aria-controls="collapse-${slugTitle}">
                  ${title}
                </button>
              </h2>
              <div id="collapse-${slugTitle}" class="accordion-collapse collapse" aria-labelledby="heading-${title}" data-bs-parent="#accordionArticleLinks">
                <div class="accordion-body">
                  <p>${data[i].summary}</p>
                  <a href="${link}">Read More</a>              
                </div>
              </div>
            </div>
            `;

        // console.log(linkBody);
        var accordionArticleLinksDiv = document.getElementById(
          "accordionArticleLinks"
        );
        accordionArticleLinksDiv.innerHTML += linkBody;
      }
    }
    // Create an empty object to store the slug-path mapping - the mapping will help in:
    // fetching the relevant article, and the article attributes based on the URL passed,
    // This is necessary to allow navigating to specific article easy, especially when sharing article link
    let slugPathMap = {};

    // Loop through the data object and create the slug-path pairs
    for (let key in data) {
      // Loop through the data and log each item's path - for development purposes
      // console.log(data[key].path);

      // Get the title, path, author and date from the current item
      let title = data[key].title;
      let path = data[key].path;
      let author = data[key].author;
      let date = data[key].date;
      let summary = data[key].summary;

      // Create the slug from the title using the slugify function
      let slug = slugify(title);

      // Assign the slug as a property name and the title, path, author and date as property values to the map object
      slugPathMap[slug] = { title, path, author, date, summary };
    }

    // Log the map object
    // console.log(slugPathMap);

    // Set the location hash and the news content
    // Get or set the initial location hash, use length value to set path to latest article by default
    if (window.location.hash == "#news") {
      window.location.hash = `#news-${slugify(data[length].title)}`; //default to the most recent item
      locationStr = location.hash;
      //console.log(locationStr);
    } else {
      window.location.hash =
        window.location.hash || `#news-${slugify(data[length].title)}`;
      locationStr = location.hash;
      //console.log(locationStr);
    }

    // Get the slug part of the location string by removing the #news- prefix
    let slug = locationStr.replace("#news-", "");

    // Get the attributes of the article based on the slug from the map object
    let pathToUse = slugPathMap[slug].path;
    let titleToUse = slugPathMap[slug].title;
    let pathDateToUse = slugPathMap[slug].date;
    let authorToUse = slugPathMap[slug].author;

    //Format the date to eg: July 2023
    var formattedDate = formatDateToString(pathDateToUse);

    // Update the news content using the path
    // newsDiv.innerHTML = `<md-block src="${pathToUse}"></md-block>`;
    // Use ternary operator to render a loading message or the news content
    newsDiv.innerHTML = data
      ? `<md-block src="${pathToUse}"></md-block>`
      : `<p>Loading...</p>`;
    // Use logical operator to render an error message if there is an error
    // newsDiv.innerHTML += error ? `<p>Error: ${error.message}</p>` : ""; // says error is undefined

    // append author profile image
    var img = document.createElement("img");
    img.setAttribute("src", "./assets/img/profile_image_small.jpg");
    newsAuthorImg.innerHTML = "";
    img.setAttribute("class", "rounded-circle m-1");
    img.setAttribute("height", "35px");
    newsAuthorImg.appendChild(img);

    newsTitle.innerHTML = titleToUse;
    newsTitle.innerHTML += " - " + formattedDate;
    newsAuthor.innerHTML += authorToUse.toUpperCase();
    newsDate.innerHTML = "(" + pathDateToUse + ")";

    btnShowAllArticles.addEventListener("click", () => {
      showAllArticles();
      //populate all articles section last
      allArticles(length, data);
    });
    btnHideAllArticles.addEventListener("click", () => {
      hideAllArticles();
    });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    var errorResponse = `The news item you are looking for does not exist, yet. Apologies for the incovenience.`;
    newsDiv.innerHTML += errorResponse;
    newsDiv.innerHTML += "<br>";
    newsDiv.innerHTML += "<br>";
    newsDiv.innerHTML += error;
    newsDiv.innerHTML += "<br>";
    newsDiv.innerHTML += "<br>";
  }
}

function buildNewsUI() {
  let appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  let newsUI = `<div class="row d-grid d-lg-flex">
        <div class="col">
          <div class="col" id="newsHeader">
            <div id="newsTitle" class="pt-3 h2">Title</div>
            <div class="col d-flex align-items-center">
              <div id="newsAuthorImg">newsAuthorImg</div>
              <span id="newsAuthor" class="m-2"></span><span id="newsDate">Date</span>
            </div>
          </div>
          <div class="col" id="newsDiv"></div>
          <div class="col pt-4 p-2 mb-3" id="recentArticles" style="border: 0px solid rgba(0, 0, 0, 0.568);border-radius:15px;">
            <h3>Recent Articles</h3>
            <div class="accordion" id="accordionArticleLinks">
              
            </div>
          </div>
          <div class="col p-2 mb-3 bg-light bg-opacity-75 " id="allArticles" style="border-radius:15px;">
            <div class="row p-1 m-1" style="border-radius:10px; border: 2px solid #ff480055;">
                <div class="col-10 d-flex justify-content-start">
                  <button class="" id="btnShowAllArticles"><h4 class="m-0">Show List of All Articles</h4></button>
                </div>
                <div class="col-2 d-flex justify-content-end">
                  <a class="btn-close bg-danger" id="btnHideAllArticles"></a>
                </div>
            </div>
            <div class="col">
              <div class="col accordion" id="accordionArticleLinksAll"></div>
            </div>
          </div>
        </div>
      </div>`;
  appDiv.innerHTML = newsUI;
}
function slugify(text) {
  // Convert text to lowercase
  text = text.toLowerCase();
  // Replace spaces and non-alphanumeric characters with hyphens
  text = text.replace(/ /g, "-").replace(/[^a-z0-9-]+/g, "");
  // Remove leading and trailing hyphens
  text = text.replace(/^-+|-+$/g, "");
  // Return the slug
  return text;
}

function formatDateToString(dateObject) {
  // Create a new Date object from the string
  var date = new Date(dateObject);

  // Get the month as a number
  var month = date.getMonth();

  // Map the number to the month name
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = months[month];

  // Get the year as a four-digit number
  var year = date.getFullYear();

  // Concatenate the month name and the year
  var formattedDate = monthName + " " + year;
  // Display the result
  // console.log(formattedDate); // July 2023
  return formattedDate;
}

function clearOldLInksInRecentArtircles() {
  // Clear recent links first in the recent artircles section
  // get list with links
  var listOfLinks = document.getElementById("accordionArticleLinks");
  listOfLinks.innerHTML = "";
  var oldLinks = listOfLinks.getElementsByClassName("accordion-item"); // get a tags under recentArticlesLinks ul
  // console.log(oldLinks); //html collection object
  while (oldLinks.length > 0) {
    oldLinks[0].remove(); //remove old links
  }
}
function clearOldLinksInAllArtircles() {
  // Clear links first in the all artircles section
  // get list with links
  var listOfLinks = document.getElementById("accordionArticleLinksAll");
  listOfLinks.innerHTML = "";
  var oldLinks = listOfLinks.getElementsByClassName("accordion-item"); // get a tags under recentArticlesLinks ul
  // console.log(oldLinks); //html collection object
  while (oldLinks.length > 0) {
    oldLinks[0].remove(); //remove old links
  }
}

function allArticles(lengthOfList, dataObject) {
  // populate all articles section
  for (var i = lengthOfList; i >= 0; i--) {
    // console.log(i); // print the current value of i
    // console.log(dataObject[i]);
    if (dataObject[i] == undefined) {
      // hide undefined links, by doing literally nothing, Ha! :)
      // var link = '';
    } else {
      let title = dataObject[i].title;
      let date = dataObject[i].date;
      let slugTitle = slugify(title);

      var link = `#news-${slugTitle}`;
      // console.log(link);
      var linkBody = `
            <div class="accordion-item mb-2" style="border: 2px solid #ff480055;border-radius:26px; background: #fceed1cf;">
              <h2 class="accordion-header" id="heading-${title}" style="background:#ff480055;">
                <button class="accordion-button bg-opacity-75 rounded-0 border-0" style="color:#140e03f2;" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${slugTitle}" aria-expanded="true" aria-controls="collapse-${slugTitle}">
                  ${title + " - " + formatDateToString(date)}
                </button>
              </h2>
              <div id="collapse-${slugTitle}" class="accordion-collapse collapse show" aria-labelledby="heading-${title}" data-bs-parent="#accordionArticleLinks">
                <div class="accordion-body">
                  <p>${dataObject[i].summary}</p>
                  <a href="${link}">Read More</a>              
                </div>
              </div>
            </div>
            `;

      // console.log(linkBody);
      var accordionArticleLinksDivAll = document.getElementById(
        "accordionArticleLinksAll"
      );
      accordionArticleLinksDivAll.innerHTML += linkBody;
    }
  }
}
function showAllArticles() {
  console.log("showAllArticles");
  window.newsDivsToHide = {}; // create an empty object
  var news1 = document.getElementById("newsDiv"); // get the element by its id
  var news2 = document.getElementById("newsHeader");
  var news3 = document.getElementById("recentArticles");
  var allArticlesDiv = document.getElementById("allArticles");
  newsDivsToHide[1] = news1; // add the element as a property and a value to the object
  // repeat for other elements
  newsDivsToHide[2] = news2;
  newsDivsToHide[3] = news3;
  //console.log(newsDivsToHide);
  var keys = Object.keys(newsDivsToHide); // get the keys of the object as an array
  keys.forEach(function (key) {
    //console.log(key, newsDivsToHide[key]); // use foreach on the keys array
    newsDivsToHide[key].classList.add("fadeOutClass");
    // Set a timeout function to hide the div after the animation ends
    setTimeout(function () {
      // Set the display property of the div to none
      newsDivsToHide[key].classList.add("d-none");
      // Or remove the div from the document
      //div.parentNode.removeChild(div);
    }, 1000); // The timeout should match the duration of the transition
  });
  allArticlesDiv.classList.add("allArticleFlowIn");
  clearOldLinksInAllArtircles();
}
function hideAllArticles() {
  console.log("Hide All Articles");
  var keys = Object.keys(newsDivsToHide); // get the keys of the object as an array
  keys.forEach(function (key) {
    console.log(key, newsDivsToHide[key]); // use foreach on the keys array
    newsDivsToHide[key].classList.remove("d-none");
    newsDivsToHide[key].classList.remove("fadeOutClass");
  });
  clearOldLinksInAllArtircles();
}
// console.log(`NEWS JS LOADED`);
console.log(`Hello, ${slugify("World")}!`); // hello-world
