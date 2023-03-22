// This will listen for the fragment identifier(#) change

if (!location.hash) {
    location.hash = "#home";
}

function getContent(fragmentId, callback) {
    // lets do some custom content for each page of your website
    var pages = {
        home: `<md-block src="./docs/pages/home.md" id="md-block-app"></md-block>`,
        about: `<md-block src="./README.md" id="md-block-app"></md-block>`,
        contact: "Contact me on this page if you have any questions",
        crispy: `<md-block src="./docs/pages/crispy.md" id="md-block-app"></md-block>`,
    };
    // look up what fragment you are searching for in the object


    ///
    var page = `<md-block src="./docs/pages/${fragmentId}.md" id="md-block-app"></md-block>`;
    if (fragmentId === "about") {
        callback(`<md-block src="./README.md" id="md-block-app"></md-block>`);
    } else {
        callback(page);
        
        if (undefined) {
            callback(`<md-block src="./docs/pages/missing_file.md" id="md-block-app"></md-block>`);
        }
    }
    ///


    //callback(pages[fragmentId]);
}

function loadContent() {
    var contentDiv = document.getElementById("app");
    var currentPage = document.getElementById("currentPage");
    // This gets rid of the first character of the string
    fragmentId = location.hash.substr(1);
    currentPage.innerHTML = fragmentId.toString().charAt(0).toUpperCase()+fragmentId.substr(1);

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