##### What really happens when you click on the news link from home or the menu?

Well, let's get into it:

As mentioned, the site solely depends on the Location.hash attribute to render pages. For all the pages, except news, a specific markdown file is fetched and rendered on hashchange - when you click on a link refering to content in the same web document.

Here's a code snippet to showcase the link click event

```javascript
window.addEventListener("hashchange", function () {
  /**
   * When you click on a link, this funtion is called:
   * loadContent()
   * This is where the magic happens
   */
  loadContent();

  if (this.location.hash == "#home") {
    //If the landing page is home, do a bunch of stuff...
  }
});
```

But what does `loadContent()` really do? Let's take a look.

```javascript
function loadContent() {
  /**
   * This function appends whatever we need to display on the screen
   * via the app div - contentDiv.
   * Notice that only the middle of the page changes,
   * the navgation bar on top and the footer remain the same.
   */
  var contentDiv = document.getElementById("app");
  var currentPage = document.getElementById("currentPage");
  /**
   * currentPage on the navogation bar
   * that shows the current page you're accessing.
   */

  // get the current location hash
  // then get rid of the first character(#) of the string
  fragmentId = location.hash.substr(1);

  if (fragmentId.charAt(0) === "n") {
    /**
     * Notice that for news, to keep the currentPage text short,
     * (links will get long here),
     * I had to assign the text value personally in the code.
     */
    currentPage.innerHTML = "News";
  } else {
    /**
     * the rest of the pages are pretty straight forward,
     * the code sets the value for currentPage.
     */
    currentPage.innerHTML =
      fragmentId.toString().charAt(0).toUpperCase() + fragmentId.substr(1);
  }
  /**
   * loadContent() then calls getContent()
   * to give it something to show : )
   * getContent() needs two things to be up and running,
   * the fragmentId which is just the location hash, minus #
   * and a callback function which takes an md-block element
   * the md-block element loads a .md file from its src(source) attribute.
   */
  getContent(fragmentId, (content) => {
    try {
      contentDiv.innerHTML = content;
    } catch (error) {
      console.log(error);
    }
  });
}
```

Here is `getContent()` doing his own magic:

```javascript
function getContent(fragmentId, callback) {
  // lets do some custom content for each page
  var page = `<md-block src="./docs/pages/${fragmentId}.md" id="md-block-app">
  </md-block>`;
  /**
   * remember fragmentId, this guy is just a word,
   * corresponding to the name of a .md file
   * md-block gets the .md file and converts it to static html
   */

  if (fragmentId === "about") {
    /**
     * For some pages like about which relies on the README.md file
     * in the root directory,
     * a special process is employed to get the file, see code on GitHub
     */
  } else if (fragmentId.charAt(0) === "n") {
    /**
     * Moving on,
     * Here we are, when the URL starts with #news-...
     * remember # is substracted from the fragmentId,
     * so now, at index 0, we have n
     * when this happens, the news() fuction on the new.js file is called.
     * Notice that I do not need to do imports or anything,
     * to call functions in other js files apart from the main one.
     * this is because this is still a single page website and
     * all the js files are attached on the main index.html file
     * thus all the functions in all the files are globally accessible.
     */
    news();
  } else {
    /**
     * This is the default option and caters for pages like
     * home and contact which do not need any special treatment.
     */
    callback(page);
  }
}
```

The `news()` fuction is in the `news.js` file in the root directory. Next up, we will see what `news()` does. `news()`, essentially, has three main parts, as you will see below. The first part is setting up the UI, building a blank canvas, `buildNewsUI()` does exactly that. The second part is clearing any links that may be in the Recents section, I do this to avoid duplicates that may appear as you navigate through the pages - the function name is pretty straight forward - `clearOldLInksInRecentArtircles()`. The third and pretty much the most crucial part is decidimg on what to render on your blank canvas. This section is surrounded by a `try..catch` to catch errors that may occur in process and streamline the development process. A lot happens in here.

```JS
async function news() {
  buildNewsUI();// build UI
  console.log("UI Complete");
  // Clear links first in the recent artircles section
  clearOldLInksInRecentArtircles();
  try {
    /**
     * What do we do first? Well, we need data, don't we?
     * To simplify the process, a json file holds;
     * the Title, Author, Date, and most importantly,
     * the file path to an article.
     * I use the Fetch API to get my JSON file.
    */
    // Fetch the news data and parse it as JSON
    const response = await fetch("news.json");
    const data = await response.json();
    /**
     * When I get this data, the first thing computed is the
     * recent articles section using a countdown for loop.
    */
    // Get the length of the data object
    const length = Object.keys(data).length;
    for (var i = length; i > length - 3; i--) {
    // ...compute three of the most recent articles
    }

    /**
     * This gives way to the final step of the process
     * Each article will need to have a link associated with it
     * the link will be a slug text string derived from the title
     * each link will map to its own path,
     * hence the ability to have as many articles under news as possible
     * I Create an empty object to store the slug-path mapping
     * the mapping will help in:
     * fetching the relevant article,
     * and the fetching article attributes based on the URL passed,
     * This is necessary to allow:
     *  navigating to specific article easy,
     * especially when sharing article link
    */

    let slugPathMap = {};
    // Loop through the data object and create the slug-path pairs
    for (let key in data) {
      // Get the title, path, author and date from the current item
      let title = data[key].title;
      let path = data[key].path;
      let author = data[key].author;
      let date = data[key].date;
      let summary = data[key].summary;

      // Create the slug from the title using the slugify function
      let slug = slugify(title);

      // Assign the slug as a property name and,
      // the title, path, author and date as property values to the map object
      slugPathMap[slug] = { title, path, author, date, summary };
    }

    /**
     * With slug-path map containing info for each link (slug)
     * I simply use the map to send an article based on the URL
     * slug = URL minus the '#news-' characters
    */

    // Get the slug part of the location string by removing the #news- prefix
    let slug = locationStr.replace("#news-", "");
    // Get the attributes of the article based on the slug from the map object
    let pathToUse = slugPathMap[slug].path;
    let titleToUse = slugPathMap[slug].title;
    let pathDateToUse = slugPathMap[slug].date;
    let authorToUse = slugPathMap[slug].author;

    //then

    // Update the news content using the path
    // Use ternary operator to render a loading message or the news content
    newsDiv.innerHTML = data
      ? `<md-block src="${pathToUse}"></md-block>`
      : `<p>Loading...</p>`;

    /**
     * Voila! That is it. The rest of the attributes are essentially
     * computed the same way as the newsDiv content.
    */

  }catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
}
```
##### I hope you find this article illuminating. Feel free to check out the code on GitHub, link in [About](#about) page. I would appreciate some questions.

TAKE CARE : )

<br>