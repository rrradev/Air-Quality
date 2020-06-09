const DBsecrets = {  
    username: "",  
    password: "", 
    name: "" 
}

module.exports = {
    requestDB: (secret) => {
        return DBsecrets[secret];
    }
}