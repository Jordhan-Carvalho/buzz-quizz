"use strict";
function firstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function isLoading() {
    loadingScreen.classList.toggle("display-none");
}
