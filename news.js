console.log("NEWS JS LOADED");
function news() {
  buildNewsUI();

  document.addEventListener("DOMContentLoaded", () => {
    getIDs();
  });
  window.addEventListener("hashchange", () => {
    if (this.location.hash == "#news") {
      getIDs();
    }
  });
}
function getIDs() {
  const newsDiv = document.getElementById("newsDiv");
  getNews((content) => {
    newsDiv.innerHTML = content;
  });
  const linksDiv = document.getElementById("linksDiv");

  const mdApp = document.getElementById("md-block-app");
  console.log(mdApp);
  console.log(mdApp.children);

  const showhthis = `<md-span>[Text](#)</md-span>`;
  linksDiv.innerHTML = showhthis;

  const ids = Array.from(mdApp.querySelectorAll("[id]")).map((el) => el.id);
  console.log(ids);
  ids.forEach((element) => {
    console.log(element);
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    linksDiv.append(a);
  });

  //////////////////////////////////////////////////////
}
function buildNewsUI() {
  const appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  var newsUI = `<div class="container">
    <div class="row p-2 d-grid d-md-flex">
      <div class="col-sm-3" id="linksDiv">
        links
      </div>
      <div class="col-sm-6">
        <div class="col" id="newsDiv">
        </div>
        <div class="col">
        <div class="d-flex justify-content-between">
          <button id="done" class="p-0 text-light rounded-circle m-1 border-0 " onclick="nextNews()"> <img src="./assets/img/icons/icons8-back-to-100.png" alt="previous-page" width="40px"></button>
          <button id="done" class="p-0 rounded-circle text-light m-1 border-0 " onclick="prevNews()"> <img src="./assets/img/icons/icons8-next-page-100.png" alt="next-page" width="40px" ></button>
        </div>
        </div>
      </div>
      <div class="col-sm-3">
        Ads
      </div>
    </div>
  </div>`;
  appDiv.innerHTML = newsUI;
}
function nextNews() {
  console.log("nextNews");
}
function prevNews() {
  console.log("prevNews");
}
function getNews(callback) {
  callback(`<md-block src="./docs/news/news.md" id="md-block-app"></md-block>`);
}
