import axios from "axios";
import { createContext } from "react";

export const UserContext = createContext()
let baseUrl = "http://localhost:3001/"
// let baseUrl = "http://192.168.1.2:3001/"

export const UserProvider = (props) => {

  function login(credentials) {

    return axios.post(baseUrl + "api/user/signin", credentials)
      .then(response => {
        localStorage.setItem('rpassToken', response.data)
        return new Promise(resolve => resolve(response));
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

  function createAccount(newUser) {
    return axios.post(baseUrl + "api/user/create-account", newUser).then(response => {
      return new Promise(resolve => resolve(response.data));
    })
  }

  function twoFactorStatus() {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
    };
    return axios.get(baseUrl + "api/user/twofactorstatus", {
      headers: myHeaders
    }).then(response => {
      return new Promise(resolve => resolve(response.data));
    })
  }

  function deleteTwoFactor(masterPass) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
    };
    return axios.post(baseUrl + "api/user/removetwofactor", masterPass, {
      headers: myHeaders
    }).then(response => {
      return new Promise(resolve => resolve(response.data));
    })
  }

  function addTwoFactor(masterPass) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
    };
    return axios.post(baseUrl + "api/user/addtwofactor", masterPass, {
      headers: myHeaders
    }).then(response => {
      return new Promise(resolve => resolve(response.data));
    })
  }

  function testTwoFactor(token) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('rpassToken')}`
    };
    return axios.post(baseUrl + "api/user/testtwofactor", token, {
      headers: myHeaders
    }).then(response => {
      return new Promise(resolve => resolve(response.data));
    })
  }

  return (
    <UserContext.Provider
      value={{
        login,
        verify,
        twoFactorStatus,
        deleteTwoFactor,
        addTwoFactor,
        testTwoFactor,
        createAccount
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}