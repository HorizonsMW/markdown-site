// This will listen for the fragment identifier(#) change

if (!location.hash) {
    location.hash = "#home";
}

function getContent(fragmentId, callback) {
    // lets do some custom content for each page of your website
    var page = `<md-block src="./docs/pages/${fragmentId}.md" id="md-block-app"></md-block>`;
    //console.log(page);

    if (fragmentId === "about") {
        callback(`<md-block src="./README.md" id="md-block-app"></md-block>`);
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

    currentPage.innerHTML = fragmentId.toString().charAt(0).toUpperCase() + fragmentId.substr(1);

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
});
function sendMessage() {
    var user = document.getElementById('name').value;//Get user input
    var userMessage = document.getElementById('message').value;//Get user input

    if (user === "" || userMessage === "") {
        alert("Fields are required");//Fields cannot be empty
    } else {
        var link = "https://api.whatsapp.com/send/?phone=254711990838&text=Hi,+I'm+" + user + "+and+I'm+texting+you+from+your+website+(bmulwa.netlify.app).+" + userMessage + "+&type=phone_number&app_absent=0";

        document.getElementById("yourName").innerHTML = "Name: " + user;
        document.getElementById("yourMessage").innerHTML = "Message: " + userMessage;

        document.getElementById("messageSender").classList.remove("d-none");//show confirmation popup, with sending link

        var text = "Send";
        var a = document.createElement('a'); //create link element
        a.appendChild(document.createTextNode(text));//Set the display text of the link
        a.href = link; //add the HTML href to the link
        a.target = "_blank";//link opens in new tab

        var link = document.getElementById("myLink");//get host
        link.appendChild(a);//put link on host

        console.log("Name: " + user + " Message: " + userMessage);
        console.log(link);
    }

    //document.body.appendChild(a);
}
function abortMessage() {
    /**Cancel sending message. Old link still remains, must clear old link */
    //console.log("abortMessage()");
    document.getElementById("messageSender").classList.add("d-none"); //Hide popup
    var link = document.getElementById("myLink"); //get host div to get tags in it

    var oldLink = link.getElementsByTagName("a");// get a tags under myLink div

    /**  var oldLink  = link.getElementsByTagName("a"); returns an HTMLCollection
     * HTMLCollection is an array-like collection (list) of HTML elements. The elements in a collection can be accessed by index (starts at 0). The length property returns the number of elements in the collection. HTMLCollection items can be accessed by their name, id, or index numberHTMLCollection is always a live collection - Source: https://sl.bing.net/iGayou6Khoa
     * To clear previous links on cancel, we need to iterate through the list removing each item
    */

    while (oldLink.length > 0) {
        oldLink[0].remove();//remove old links
    }

    console.log(oldLink);
}
function options() {
    console.log("Options in the house");
    document.getElementById("moreOptionsButtons").classList.remove("d-none");
}

function sharePage() {
    alert("Share function coming soon. Actually its all done, now I have to figure out why it does'nt work.")
    console.log("Share page");
        if (navigator.canShare()) {
            try {
                const url = window.location.href;
                const shareData = {
                    title: 'Brian Mulwa\'s website',
                    text: 'Check out this cool website!',
                    url: `${url}`
                };
                document.getElementById("moreOptionsButtons").classList.add("d-none");

                navigator.share(shareData);

                console.log("MDN shared successfully");

            } catch (err) {
                console.log(`Error: ${err}`);
            }
        } else {
            console.log("Sharing not supported");
        };
}
