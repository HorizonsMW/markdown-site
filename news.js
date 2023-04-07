console.log("NEWS JS LOADED");
function news() {
  buildNewsUI();
}
window.onload = function () {
  const div = document.getElementById("newsDiv");
  const ids = Array.from(div.querySelectorAll("[id]")).map((el) => el.id);
  console.log(ids);
};
function buildNewsUI() {
  const appDiv = document.getElementById("app");
  appDiv.replaceChildren();
  var newsUI = `<div class="container">
    <div class="row p-2 d-grid d-md-flex">
      <div class="col-sm-3">
        links
      </div>
      <div class="col-sm-6">
        <div class="col" id="newsDiv">
          <md-block src="./docs/news/news.md"></md-block>
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
