console.log("NEWS JS LOADED");
function news() {
  buildNewsUI();
  fetch("news.json")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      length = Object.keys(data).length;
      console.log(length);

      var jsonArray = Object.keys(data)//JSON.parse(data);
      console.log(jsonArray);

      for (let index = 0; index <= jsonArray.length; index++) {
       console.log(data[index]); 
      }

      Location.hash  = "#news-"+slugify(data[length].title);
      locationStr = Location.hash;
      console.log(locationStr);


      newsDiv.innerHTML = `<md-block src="${data[length].path}"></md-block>`
      newsTitle.innerHTML = data[length].title;
      newsAuthor.innerHTML = data[length].author;
      newsDate.innerHTML = data[length].date;

     
    });
}
window.newsToShow = 0;

function buildNewsUI() {
  const appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  var newsUI = `<div class="container">
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
        <div class="col">
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
  text = text.replace(/ /g, '-').replace(/[^a-z0-9-]+/g, '');
  // Remove leading and trailing hyphens
  text = text.replace(/^-+|-+$/g, '');
  // Return the slug
  return text;
}

