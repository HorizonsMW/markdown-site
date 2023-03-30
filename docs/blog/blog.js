console.log("BLOG JS LOADED");
if (location.hash == "#blog") {
    console.log("Lets do this");
    showBlog()
}

window.addEventListener("hashchange", function () {
    if (this.location.hash == "#blog") {
        showBlog()
    }
});

function showBlog() {
    if (location.hash === "#blog") {
        const BLOG = document.getElementById("blogView");
        
    }
}