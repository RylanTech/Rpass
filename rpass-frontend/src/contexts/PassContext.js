import axios from "axios";
import { createContext } from "react";

export const PassContext = createContext()
let baseUrl = "http://localhost:3001/"
// let baseUrl = "http://192.168.1.2:3001/"

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

    return (
        <PassContext.Provider
            value={{
                getPasses,
                searchPasses
            }}
        >
            {props.children}
        </PassContext.Provider>
    )
}