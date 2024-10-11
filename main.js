// This will listen for the fragment identifier(#) change

if (!location.hash) {
  location.hash = "#home";
}

function getContent(fragmentId, callback) {
  // lets do some custom content for each page of the website
  var page = `<md-block src="./docs/pages/${fragmentId}.md" id="md-block-app"></md-block>`;
  //console.log(page);

  if (fragmentId === "about") {
    callback(`<md-block src="./README.md" id="md-block-app"></md-block>`);
  } else if (fragmentId === "blog") {
    console.log("blog town");
    callback(
      `<md-block src="./docs/blog/${fragmentId}.md" id="md-block-app"></md-block>`
    );
  } else if (fragmentId.charAt(0) === "g") {
    console.log("Gems town");
    callback(
      `<md-block src="./docs/gems/${fragmentId}.md" id="md-block-app"></md-block>`
    );
  } else if (fragmentId.charAt(0) === "n") {
    //callback(`<md-block src="./docs/news/${fragmentId}.md" id="md-block-app"></md-block>`);
    news();
  } else {
    callback(page);
  }
  //callback(pages[fragmentId]);
}

function loadContent() {
  var contentDiv = document.getElementById("app");
  var currentPage = document.getElementById("currentPage");
  // This gets rid of the first character of the string
  fragmentId = location.hash.substr(1);

  if (fragmentId.charAt(0)==="n") {
    currentPage.innerHTML ="News";
  } else {
    currentPage.innerHTML =
    fragmentId.toString().charAt(0).toUpperCase() + fragmentId.substr(1);
  }

  // console.log(fragmentId);

  getContent(fragmentId, (content) => {
    try {
      contentDiv.innerHTML = content;
    } catch (error) {
      console.log(error);
    }
  });
}
loadContent();

window.addEventListener("hashchange", function () {
  console.log("Location: " + location.hash);
  loadContent();
  if (this.location.hash == "#home") {
    fetch("updates.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        lengthOfJson = Object.keys(data).length;
        showUpdates(lengthOfJson);
      });
  }
});

function sendMessage() {
  var user = document.getElementById("name").value; //Get user input
  var userMessage = document.getElementById("message").value; //Get user input

  /////////////// clean links on repeated clicks

  var link = document.getElementById("myLink"); //get host div to get tags in it
  var oldLink = link.getElementsByTagName("a"); // get a tags under myLink div

  /**  var oldLink  = link.getElementsByTagName("a"); returns an HTMLCollection
   * HTMLCollection is an array-like collection (list) of HTML elements. The elements in a collection can be accessed by index (starts at 0). The length property returns the number of elements in the collection. HTMLCollection items can be accessed by their name, id, or index numberHTMLCollection is always a live collection - Source: https://sl.bing.net/iGayou6Khoa
   * To clear previous links on cancel, we need to iterate through the list removing each item
   */

  while (oldLink.length > 0) {
    oldLink[0].remove(); //remove old links
  }
  //////////////////////////

  if (user === "" || userMessage === "") {
    alert("Fields are required"); //Fields cannot be empty
  } else {
    var link =
      "https://api.whatsapp.com/send/?phone=254711990838&text=Hi,+I'm+" +
      user +
      "+and+I'm+texting+you+from+your+website+(bmulwa.netlify.app).+" +
      userMessage +
      "+&type=phone_number&app_absent=0";

    document.getElementById("yourName").innerHTML = "Name: " + user;
    document.getElementById("yourMessage").innerHTML =
      "Message: " + userMessage;

    document.getElementById("messageSender").classList.remove("d-none"); //show confirmation popup, with sending link
    //WhatsApp message
    var text = "Send";
    var aWhatsApp = document.createElement("a"); //create link element
    //aWhatsApp.appendChild(document.createTextNode(text));//Set the display text of the link
    aWhatsApp.href = link; //add the HTML href to the link
    aWhatsApp.target = "_blank"; //link opens in new tab
    aWhatsApp.setAttribute("alt", "WhatsApp");

    var WhatsAppIcon = document.createElement("img");
    WhatsAppIcon.setAttribute("src", "./assets/img/icons/icons8-whatsapp.svg");
    WhatsAppIcon.setAttribute("height", "40px");
    aWhatsApp.appendChild(WhatsAppIcon); //Set the display text of the link

    var link = document.getElementById("myLink"); //get host
    link.appendChild(aWhatsApp); //put link on host

    // console.log("Name: " + user + " Message: " + userMessage); //development info purposes
    // console.log(link);

    //Gmail message
    var emailSubject = "bmulwa.netlify.app";
    var subjectEncoded = encodeURIComponent(emailSubject);

    var emailBody =
      "Greetings, " + userMessage + " %0D%0A%0D%0ARegards,%0D%0A" + user; // %0D%0A - You can also use the URL encoding %0D%0A for line breaks in mailto links. - Bing

    var gmailLink =
      "mailto:bmulwa766@gmail.com?subject=" +
      subjectEncoded +
      "&body=" +
      emailBody;
    var text = "eMail";
    var aGmail = document.createElement("a"); //create link element
    // a.appendChild(document.createTextNode(text));//Set the display text of the link
    aGmail.href = gmailLink; //add the HTML href to the link
    aGmail.target = "_blank"; //link opens in new tab
    aGmail.setAttribute("alt", "email");

    var gmailIcon = document.createElement("img");
    gmailIcon.setAttribute("src", "./assets/img/icons/icons8-gmail-logo.svg");
    gmailIcon.setAttribute("height", "40px");
    aGmail.appendChild(gmailIcon); //Set the display text of the link

    var link = document.getElementById("myLink"); //get host
    link.appendChild(aGmail); //put link on host

    // console.log("Name: " + user + " Message: " + userMessage); //development info purposes
    // console.log(gmailLink);
  }

  //document.body.appendChild(a);
}
function abortMessage() {
  /**Cancel sending message. Old link still remains, must clear old link */
  //console.log("abortMessage()");
  document.getElementById("messageSender").classList.add("d-none"); //Hide popup
  var link = document.getElementById("myLink"); //get host div to get tags in it

  var oldLink = link.getElementsByTagName("a"); // get a tags under myLink div

  /**  var oldLink  = link.getElementsByTagName("a"); returns an HTMLCollection
   * HTMLCollection is an array-like collection (list) of HTML elements. The elements in a collection can be accessed by index (starts at 0). The length property returns the number of elements in the collection. HTMLCollection items can be accessed by their name, id, or index numberHTMLCollection is always a live collection - Source: https://sl.bing.net/iGayou6Khoa
   * To clear previous links on cancel, we need to iterate through the list removing each item
   */

  while (oldLink.length > 0) {
    oldLink[0].remove(); //remove old links
  }

  console.log(oldLink);
}
function options() {
  console.log("Options in the house"); //when plus button is activated
  document.getElementById("moreOptionsButtons").classList.remove("d-none");
}

function sharePage() {
  document.getElementById("moreOptionsButtons").classList.add("d-none");
  // alert("Share function coming soon. Actually its all done, now I have to figure out why it does'nt work.")
  console.log("Share page");

  if (navigator.canShare()) {
    try {
      const url = window.location.href;
      const shareData = {
        title: "Brian Mulwa's website",
        text: "Check out this cool website!",
        url: `${url}`,
      };

      navigator.share(shareData);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  } else {
    console.log("Sharing not supported");
  }
}
window.itemToShow = 0; //Declare global variable itemToShow

function showUpdates(itemToShow) {
  console.log("Item to show is " + itemToShow);

  const titleOnDocument = document.getElementById("title"); //fetch ids of HTML elements
  const dateOnDocument = document.getElementById("updateDate");
  const updateOnDocument = document.getElementById("update");
  const linkOnDocument = document.getElementById("link");

  fetch("updates.json")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);

      window.lengthOfJson = Object.keys(data).length;

      console.log("Length is " + lengthOfJson);

      if (itemToShow >= lengthOfJson) {
        //when passed key is greater than length of updates json
        this.itemToShow = lengthOfJson;

        const titleData = data[itemToShow].title; //assign fetched data to variables
        const updateData = data[itemToShow].update;
        const linkData = data[itemToShow].link;
        const dateData = data[itemToShow].date;

        /**console.log(titleData);
                console.log(updateData);
                console.log(linkData);*/ // for dev info purposes only

        viewLink = generateUpdateLink(linkData); //use generateUpdateLink() function to create new link using data from json

        if (
          titleOnDocument &&
          updateOnDocument &&
          linkOnDocument &&
          dateOnDocument
        ) {
          titleOnDocument.innerHTML = titleData; //append values to html elememnts if they're found
          updateOnDocument.innerHTML = updateData;
          dateOnDocument.innerHTML = dateData;
          while (linkOnDocument.firstChild) {
            //remove children before appending new child
            linkOnDocument.firstChild.remove();
          }
          linkOnDocument.append(viewLink);
        } else {
          console.log("Title and update body not found");
          //when HTML elements have not been found, run the fuction again if location is home
          if (location.hash == "#home") {
            showUpdates(itemToShow);
          }
        }
      } else if (itemToShow <= 0) {
        this.itemToShow = 1;
      } else {
        const titleData = data[itemToShow].title;
        const updateData = data[itemToShow].update;
        const linkData = data[itemToShow].link;
        const dateData = data[itemToShow].date;

        //console.log(titleData);
        //console.log(updateData);
        //console.log(linkData);

        viewLink = generateUpdateLink(linkData);

        if (
          titleOnDocument &&
          updateOnDocument &&
          linkOnDocument &&
          dateOnDocument
        ) {
          titleOnDocument.innerHTML = titleData;
          updateOnDocument.innerHTML = updateData;
          dateOnDocument.innerHTML = dateData;

          while (linkOnDocument.firstChild) {
            //remove children before appending new child
            linkOnDocument.firstChild.remove();
          }
          linkOnDocument.append(viewLink);
        } else {
          console.log("Title and update body not found");
          if (location.hash == "#home") {
            showUpdates(itemToShow);
          }
        }
      }
    });
  console.log("Showing " + itemToShow);
  return itemToShow;
}

/*document.addEventListener("DOMContentLoaded", function() {
    showUpdates();
});*/

window.onload = function () {
  //when the page loads
  //do this...
  if (location.hash == "#home") {
    fetch("updates.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        lengthOfJson = Object.keys(data).length;
        showUpdates(lengthOfJson); //show the latest update
      });
  } else {
    console.log("Hey there, not home.");
  }

};

function nextUpdate() {
  console.log("Next Update");

  this.itemToShow = itemToShow + 1;

  console.log("New item " + itemToShow);
  showUpdates(itemToShow);
}
function prevUpdate() {
  console.log("Previous Update");
  this.itemToShow = itemToShow - 1;

  console.log("New item " + itemToShow);
  showUpdates(itemToShow);
}

function generateUpdateLink(itemlink) {
  //this fuction creates a link
  var generatedUpdateLink = document.createElement("a");
  generatedUpdateLink.setAttribute("href", itemlink);
  generatedUpdateLink.innerHTML = "View";
  generatedUpdateLink.classList.add("bg-light", "rounded-3", "p-2");

  if (itemlink == undefined) {
    // if no link is passed via itemLink, then dont show link
    console.log("Blank link passed");
    generatedUpdateLink.classList.add("d-none");
  }
  return generatedUpdateLink;
}
