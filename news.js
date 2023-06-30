async function news() {
  buildNewsUI();

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

      // Create the slug from the title using the slugify function
      let slug = slugify(title);

      // Assign the slug as a property name and the title, path, author and date as property valuee to the map object
      slugPathMap[slug] = { title, path, author, date };
    }

    // Log the map object
    // console.log(slugPathMap);

    // Set the location hash and the news content
    // Get or set the initial location hash, use length value to set path to latest article by default
    if (window.location.hash == "#news") {
      window.location.hash = `#news-${slugify(data[length].title)}`;
      locationStr = location.hash;
      console.log(locationStr);
    } else {
      window.location.hash =
        window.location.hash || `#news-${slugify(data[length].title)}`;
      locationStr = location.hash;
      console.log(locationStr);
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
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    newsDiv.innerHTML = error;
  }
}

function buildNewsUI() {
  let appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  let newsUI = `<div class="container">
    <div class="row p-2 d-grid d-md-flex">
      <div class="col-sm-3" id="linksDiv">
        links
      </div>
      <div class="col-sm-6">
      <div class="col" id="newsHeader">
      <div id="newsTitle" class="pt-3 h2">Title</div>
      <div class="col d-flex">
        <div id="newsAuthor" class="p-3" >Author</div>
        <div id="newsDate" class="p-3" >Date</div>
      </div>
      
      </div>
      <div class="col" id="newsDiv">
        </div>
        <div class="col" id="recentArticles">
          Recent Articles
        </div>
      </div>
      <div class="col-sm-3">
        Ads
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

console.log(`NEWS JS LOADED`);
console.log(`Hello, ${slugify("World")}!`); // hello-world
