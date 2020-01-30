/*  Function: showHideMenu
    Parameters: NA
    Return: show-hide class
    Description: Hide or show menu when clicked */
function showHideMenu() {
    document.getElementById("mainMenu").classList.toggle("show-hide");  
}

/*  Function: showHideSearchArea
    Parameters: NA
    Return: show-hide class
    Description: Hide or show search area when clicked */
function showHideSearchArea() {
    document.getElementById("searchArea").classList.toggle("show-hide");  
}

// Load Event Listener
window.addEventListener('load', () => {
    //Click Event Listener
    document.getElementById('hamMenu').addEventListener('click', showHideMenu);
    document.getElementById('searchlens').addEventListener('click', showHideSearchArea);

});