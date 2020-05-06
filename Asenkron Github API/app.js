//elementleri seçme

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
        alert("Lütfen geçerli bir kullanıcı adı giriniz...");
    }
    else {
        github.getGithubData(userName)
        .then(response => {
            if (response.user.message === "Not Found"){
                //Hata
                ui.showError("Kullanıcı bulunamadı...");
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

    
    ui.clearInput();//input temizleme
    e.preventDefault();
}

function clearAllSearched(){
    
    //Tüm arananları temizle
    if (confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }

}

function getAllSearched(){
    //Arananları Storage'dan al ve UI'ye ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    });

    lastUsers.innerHTML = result;

}