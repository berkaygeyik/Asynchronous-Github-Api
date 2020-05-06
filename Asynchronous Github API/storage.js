class Storage {

    static getSearchedUsersFromStorage(){
        // Take all users

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        
        return users;
    }

    static addSearchedUserToStorage(username){
        // add a user
        let users = this.getSearchedUsersFromStorage();

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));
        
    }

    static clearAllSearchedUsersFromStorage(){
        // clear all users

        localStorage.removeItem("searched");
        
    }

}