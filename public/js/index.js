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

/*  Function: validateLoginCredentials
    Parameters: NA
    Return: Error message or bollean
    Description: Validates login details when login button is clicked */
function validateLoginCredentials() {
    let emailAddress = document.getElementById("loginEmailAddress").value;
    let psd = document.getElementById("loginPassword").value;

    if((emailAddress == null) || (emailAddress == "")){
        document.getElementById(`login-message`).innerHTML = `Please enter login details.`;
    }else if((psd == null) || (psd == "")){
        document.getElementById(`login-message`).innerHTML = `Please enter your password.`;
    }else{
        document.getElementById(`login-message`).innerHTML = ``;
        return true;
    }
}

// Load Event Listener
window.addEventListener('load', () => {
    //Click Event Listener
    document.getElementById('hamMenu').addEventListener('click', showHideMenu);
    document.getElementById('searchlens').addEventListener('click', showHideSearchArea);
    document.getElementById('loginButton').addEventListener('click', validateLoginCredentials);

});