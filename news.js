console.log("NEWS JS LOADED");

if (location.hash === "#news") {
  console.log("news section snodlscknj");
  news();
}

window.addEventListener("hashchange", () => {
  if (location.hash === "#news") {
    console.log("news section snodlscknj");
    news();
  }
});


function news() {
  const folderPath = "./docs/news/";
  const folderPath2 = "https://github.com/HorizonsMW/markdown-site/tree/main/docs/news/";

  const files = [];
  const xhr = new XMLHttpRequest();
  xhr.open("GET", folderPath || "GET",folderPath2);
  

  xhr.onload = function () {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(xhr.responseText, "text/html");
    const links = htmlDoc.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.endsWith(".md")) {
        files.push(links[i].href);
      }
    }
    //files in an array
    console.log(files);
    window.files = files;

    console.log("File 1 " + files[0]);
    console.log("Lenght is " + files.length);

    var mostRecentNewsPost = files.length - 1;
    window.itemPosition = mostRecentNewsPost;

    var pathToNews = files[mostRecentNewsPost];
    getHTMLElements(pathToNews);

  };
  xhr.send();
}

function getHTMLElements(pathToFile) {
  const appDiv = document.getElementById("app");
  // console.log(appDiv);
  appDiv.replaceChildren();
  //host container
  const container = document.createElement("div");
  container.classList.add("container", "p-2");
  //host row
  const row = document.createElement("div");
  row.classList.add("row", "d-grid", "d-md-flex");

  //links on the left
  const links = document.createElement("div");
  links.classList.add("col-md-3");
  links.append("Links column");
  //news in the middle
  const newsContent = document.createElement("div");
  newsContent.classList.add("col-md-6");
  const mdBlock = document.createElement("md-block");
  mdBlock.setAttribute("src", pathToFile);
  newsContent.appendChild(mdBlock);
  //news navigation buttons
  const newsNav = document.createElement("div");
  newsNav.classList.add("row", "d-flex", "justify-content-between");
  const nextContent = document.createElement("button");
  nextContent.append("Next");
  const prevContent = document.createElement("button");
  prevContent.append("Prev");

  nextContent.addEventListener("click", () => {
    nextNews();
  });
  prevContent.addEventListener("click", () => {
    prevNews();
  });

  newsNav.appendChild(nextContent);
  newsNav.appendChild(prevContent);

  newsContent.appendChild(newsNav);

  //ads on the right
  const adsContent = document.createElement("div");
  adsContent.classList.add("col-md-3");
  adsContent.append("Ads column");

  row.appendChild(links);
  row.appendChild(newsContent);
  row.appendChild(adsContent);
  container.appendChild(row);
  appDiv.appendChild(container);
}

function nextNews() {
  console.log("Next news");
  this.itemPosition = itemPosition + 1;
  //console.log(this.itemPosition);
  //console.log(files);
  latestItem = files.length - 1;

  if (this.itemPosition >= latestItem) {
    var pathToNews = files[latestItem];
    getHTMLElements(pathToNews);
    this.itemPosition = latestItem;
  } else {
    var pathToNews = files[this.itemPosition];
    getHTMLElements(pathToNews);
  }

}

function prevNews() {
  console.log("Prev news");
  this.itemPosition = itemPosition - 1;
  //console.log(this.itemPosition);
  //console.log(files);

  if (this.itemPosition <= 0) {
    var pathToNews = files[0];
    console.log("path is " + pathToNews);
    getHTMLElements(pathToNews);
    this.itemPosition = 0;
  } else {
    var pathToNews = files[this.itemPosition];
    console.log("path is " + pathToNews);
    getHTMLElements(pathToNews);
  }

}

