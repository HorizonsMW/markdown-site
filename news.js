async function news() {
  buildNewsUI();

  // Clear links first in the recent artircles section
  clearOldLInksInRecentArtircles();

  try {
    // Fetch the news data and parse it as JSON
    const response = await fetch("news.json");
    const data = await response.json();

    // Get the length and keys of the data object
    const length = Object.keys(data).length;

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

      // Assign the slug as a property name and the title, path, author and date as property valuee to the map object
      slugPathMap[slug] = { title, path, author, date, summary};
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

    // Update the news content using the path
    // newsDiv.innerHTML = `<md-block src="${pathToUse}"></md-block>`;
    // Use ternary operator to render a loading message or the news content
    newsDiv.innerHTML = data
      ? `<md-block src="${pathToUse}"></md-block>`
      : `<p>Loading...</p>`;
    // Use logical operator to render an error message if there is an error
    // newsDiv.innerHTML += error ? `<p>Error: ${error.message}</p>` : ""; // says error is undefined

    newsTitle.innerHTML = titleToUse;
    newsAuthor.innerHTML = authorToUse;
    newsDate.innerHTML = pathDateToUse;

    // populate recent articles section - with 3 of the most recent items
    var keys = Object.keys(slugPathMap);
    for (var i = keys.length; i >= keys.length - 3; i--) {
      console.log(i); // print the current value of i
      // console.log(keys[i]);
      if (keys[i] == undefined) {
        // hide undefined links, by doing literally doing nothing, Ha! :)
        // var link = '';
      } else {
        var link = `#news-${keys[i]}`;
        // console.log(link);

        var linkBody = `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${keys[i]}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${keys[i]}" aria-expanded="false" aria-controls="collapse-${keys[i]}">
              ${slugPathMap[keys[i]].title}
            </button>
          </h2>
          <div id="collapse-${keys[i]}" class="accordion-collapse collapse" aria-labelledby="heading-${keys[i]}" data-bs-parent="#accordionArticleLinks">
            <div class="accordion-body">
              <p>${slugPathMap[keys[i]].summary}</p>
              <a href="${link}">Read More</a>              
            </div>
          </div>
        </div>
        `;

       // console.log(linkBody);
        var accordionArticleLinksDiv = document.getElementById("accordionArticleLinks");
        accordionArticleLinksDiv.innerHTML += linkBody;
      }
    }
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    newsDiv.innerHTML += error;
  }
}

function buildNewsUI() {
  let appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  let newsUI = `<div class="container"><div class="row p-2 d-grid d-md-flex"><div class="col-sm-3" id="linksDiv">links</div><div class="col-sm-6"><div class="col" id="newsHeader"><div id="newsTitle" class="pt-3 h2">Title</div><div class="col d-flex"><div id="newsAuthor" class="p-3" >Author</div><div id="newsDate" class="p-3" >Date</div> </div></div> <div class="col" id="newsDiv"> </div><div class="col" id="recentArticles"><h3>Recent Articles</h3> <div class="accordion" id="accordionArticleLinks"><div></div></div></div></div>
  <div class="col-sm-3">
    Ads
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

function clearOldLInksInRecentArtircles() {
  // Clear recent links first in the recent artircles section
  // get list with links
  var listOfLinks = document.getElementById("accordionArticleLinks");
  var oldLinks = listOfLinks.getElementsByClassName("accordion-item"); // get a tags under recentArticlesLinks ul
  // console.log(oldLinks); //html collection object
  while (oldLinks.length > 0) {
    oldLinks[0].remove(); //remove old links
  }
}

console.log(`NEWS JS LOADED`);
console.log(`Hello, ${slugify("World")}!`); // hello-world
