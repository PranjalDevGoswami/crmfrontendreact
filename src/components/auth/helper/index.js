import {API} from "../helper/backend"

export const signin = (user) => {
    const formData = new FormData()

    for (const name in user){
        console.log(user[name]);
        formData.append(name, user[name])
    }

    // const {email, password} = user;
    // const formData = new FormData();
    // formData.append('email', email)
    // formData.append('password', password)

    for (var key of formData.keys()) {
        console.log("MYKEY: ", key);
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("SUCCESS", response);
        return response.json();
    })
    .catch(err => console.log(err));
};


export const authenticate = (data, next) => {
    if (typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};


export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
        //TODO: compare JWT with database json token
    }else{
        return false;
    }
};
