/*  Function: showHideMenu
    Parameters: NA
    Return: show-hide class
    Description: Hide or show menu when clicked */
function showHideMenu() {
    document.getElementById("mainMenu").classList.toggle("show-hide");  
}

function showHideSearchArea() {
    document.getElementById("searchArea").classList.toggle("show-hide");  
}

function showHideC() {
    document.getElementById("createRoomForm").classList.toggle("show-hide");  
}
function showHideU() {
    document.getElementById("modifyRoomForm").classList.toggle("show-hide");  
}
function showHideD() {
    document.getElementById("deleteRoomForm").classList.toggle("show-hide");  
}

// Load Event Listener
window.addEventListener('load', () => {
    //Click Event Listener
    document.getElementById('hamMenu').addEventListener('click', showHideMenu);
    document.getElementById('searchlens').addEventListener('click', showHideSearchArea);
    document.getElementById('createRoom').addEventListener('click', showHideC);
    document.getElementById('modifyRoom').addEventListener('click', showHideU);
    document.getElementById('deleteRoom').addEventListener('click', showHideD);

});