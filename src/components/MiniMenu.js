'use client'
import React, { useEffect } from "react";
import styles from '../app/page.module.css'

export default function MiniMenu() {

    async function alive() {
      login()
      var result = localStorage.getItem("jwttoken")
      //alert("TO BE USED: " + result)
      console.log(`Bearer ${result}`)
      const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/alive', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${result}`
        },
      });

        const status = await response.text();
        document.getElementById("serverStatus").value = status
        return status
    }

    // TBD
  async function sendMessage() {
    login()
    var result = localStorage.getItem("jwttoken")
    var message = document.getElementById("messageToSend").value
    //alert("TO BE USED: " + result)
    console.log(`Bearer ${result}`)
    const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/alive', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${result}`
      },
      body: "body"
    });

    const received = await response.text();
    document.getElementById("messageResponse").value = received.status
    return received
  }

  async function login() {
    //alert("IN LOGIN")
    var response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/login', {
      method: 'GET'
    });

    var token = await response.text();
    //alert("THE REAL !!!!!!!!!!! " + token)
    localStorage.setItem("jwttoken", token)
    //alert(localStorage.getItem("jwttoken") + " ___ current" )

    return token
  }

  login().then(token => {
    console.log(token)
  });

  return (
    <main className={styles.MiniMenu}>
      <h1 className={styles.h1}> We are in MiniMenu.</h1>
      <h2>Get server status</h2>
      <button className={styles.button} onClick={alive}>Check</button>
      <textarea id="serverStatus"></textarea>

      <form onSubmit={sendMessage}>
      <h2>Send a message</h2>
      <input id = "messageToSend" placeholder="Enter a message:"></input>
      <button className={styles.button} type="submit">Send</button>

      </form>
      <h2>Response:</h2>
      <textarea id = "messageResponse"></textarea>
    </main>
  );
}