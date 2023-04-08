console.log("NEWS COPY JS LOADED");
console.log("Netlify config");
function getFiles() {
  const xmlReq = new XMLHttpRequest();
  const path = "./docs/news/";
  var files = [];
  xmlReq.open("GET", path, true);
  xmlReq.onreadystatechange = function () {
    console.log(xmlReq.status);
    if (xmlReq.readyState == 4 && xmlReq.status == 200) {
      files = xmlReq.responseText.split("\n");
      for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
      }
    }
  };
  xmlReq.send();
}

getFiles();
