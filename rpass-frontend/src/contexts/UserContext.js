import axios from "axios";
import { createContext } from "react";

export const UserContext = createContext()
// let baseUrl = "http://localhost:3001/"
let baseUrl = "http://192.168.1.18:3002/"

export const UserProvider = (props) => {

    function login(credentials) {

        return axios.post(baseUrl + "api/user/signin", credentials)
        .then(response => {
            localStorage.setItem('rpassToken', response.data)
            return new Promise(resolve => resolve(response.data));
          }
        );
    }

    function verify() {
        let myHeaders = {
          Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
        };
        return axios.post(baseUrl + "api/user/verify", null, {
          headers: myHeaders
        }).then(response => {
            return new Promise(resolve => resolve(response.data));
          })
      }

    return (
        <UserContext.Provider
            value={{
                login,
                verify
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}