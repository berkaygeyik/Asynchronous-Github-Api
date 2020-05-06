//choosing elements

const githubForm = document.getElementById("github-form");
const nameImput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){
    let userName = nameImput.value.trim();

    if (userName === ""){
        alert("Please enter a valid username...");
    }
    else {
        github.getGithubData(userName)
        .then(response => {
            if (response.user.message === "Not Found"){
                //errior
                ui.showError("User not found...");
            }
            else {

                ui.addSearchedUserToUI(userName);
                Storage.addSearchedUserToStorage(userName);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    
    //Clear all searched
    if (confirm("Are you sure?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }

}

function getAllSearched(){
    //Get searched users and add to UI

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    });

    lastUsers.innerHTML = result;

}