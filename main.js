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
    } else if (fragmentId === "blog") {
        console.log("blog town");
        callback(`<md-block src="./docs/blog/${fragmentId}.md" id="md-block-app"></md-block>`);
    } else if (fragmentId.charAt(0) === "g") {
        console.log("Gems town");
        callback(`<md-block src="./docs/gems/${fragmentId}.md" id="md-block-app"></md-block>`);
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

    if (this.location.hash == "#home") {
        fetch('updates.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                lengthOfJson = Object.keys(data).length;
                showUpdates(lengthOfJson);
            });
    }
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
    document.getElementById("moreOptionsButtons").classList.add("d-none");
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


            navigator.share(shareData);

            console.log("MDN shared successfully");

        } catch (err) {
            console.log(`Error: ${err}`);
        }
    } else {
        console.log("Sharing not supported");
    };

}
window.itemToShow = 0;

function showUpdates(itemToShow) {
    console.log("Item to show is " + itemToShow);

    const titleOnDocument = document.getElementById("title");
    const updateOnDocument = document.getElementById("update");
    const linkOnDocument = document.getElementById("link");

    fetch('updates.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            window.lengthOfJson = Object.keys(data).length;

            console.log("Length is " + lengthOfJson);

            if (itemToShow >= lengthOfJson) {
                this.itemToShow = lengthOfJson;

                const titleData = data[itemToShow].title;
                const updateData = data[itemToShow].update;
                const linkData = data[itemToShow].link;

                console.log(titleData);
                console.log(updateData);
                console.log(linkData);

                const titleOnDocument = document.getElementById("title");
                const updateOnDocument = document.getElementById("update");
                const linkOnDocument = document.getElementById("link");

                viewLink = generateUpdateLink(linkData);

                if (titleOnDocument && updateOnDocument && linkOnDocument) {
                    titleOnDocument.innerHTML = titleData;
                    updateOnDocument.innerHTML = updateData;
                    linkOnDocument.append(viewLink);
                } else {
                    console.log("Title and update body not found");
                    if (location.hash == "#home") { showUpdates(itemToShow); }
                }

            } else if (itemToShow <= 0) {
                this.itemToShow = 1;
            } else {
                const titleData = data[itemToShow].title;
                const updateData = data[itemToShow].update;
                const linkData = data[itemToShow].link;

                console.log(titleData);
                console.log(updateData);
                console.log(linkData);

                const titleOnDocument = document.getElementById("title");
                const updateOnDocument = document.getElementById("update");
                const linkOnDocument = document.getElementById("link");

                viewLink = generateUpdateLink(linkData);

                if (titleOnDocument && updateOnDocument && linkOnDocument) {
                    titleOnDocument.innerHTML = titleData;
                    updateOnDocument.innerHTML = updateData;
                    linkOnDocument.append(viewLink);
                } else {
                    console.log("Title and update body not found");
                    if (location.hash == "#home") { showUpdates(itemToShow); }
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
    fetch('updates.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            lengthOfJson = Object.keys(data).length;
            showUpdates(lengthOfJson);
        });
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
    var generatedUpdateLink = document.createElement("a");
    generatedUpdateLink.setAttribute("href", itemlink);
    generatedUpdateLink.innerHTML = "View";
    return generatedUpdateLink;
}
