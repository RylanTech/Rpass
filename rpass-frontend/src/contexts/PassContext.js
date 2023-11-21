import axios from "axios";
import { createContext, useState } from "react";

export const PassContext = createContext()
// let baseUrl = "http://localhost:3001/"
let baseUrl = "http://192.168.1.18:3002/"

export const PassProvider = (props) => {

    function getPasses() {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.get(baseUrl + "api/pass/", { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
            );
    }

    function searchPasses(query) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.get(baseUrl + "api/pass/search/" + query, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
            );
    }

    function getPass(passName, masterPass) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        const mstrPass = {
            masterPass: masterPass
        }

        return axios.post(baseUrl + "api/pass/" + passName, mstrPass, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
            );
    }

    function createPass(pass) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.post(baseUrl + "api/pass/", pass, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
            );
    }

    function deletePass(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.delete(baseUrl + "api/pass/delete/" + id, { headers: myHeaders })
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function editPass(pass, id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.put(baseUrl + "api/pass/edit/" + id, pass, { headers: myHeaders })
        .then(response => {
            console.log(response.data)
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    function resetPass(masterPass) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };

        return axios.post(baseUrl + "api/pass/user/reset", masterPass, { headers: myHeaders })
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        }
        );
    }

    return (
        <PassContext.Provider
            value={{
                getPasses,
                searchPasses,
                getPass,
                createPass,
                deletePass,
                editPass,
                resetPass
            }}
        >
            {props.children}
        </PassContext.Provider>
    )
}