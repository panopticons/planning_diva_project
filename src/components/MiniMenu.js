'use client'
import React from "react";
import styles from '../app/page.module.css'

export default function MiniMenu() {
  async function alive() {
    login().then(token => {
      localStorage.setItem("jwttoken", token)
    });
    var result = localStorage.getItem("jwttoken")
    var trimmedResult = result.substring(8, result.lastIndexOf("\""));
    console.log(`Bearer ${trimmedResult}`)
    const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/alive', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${trimmedResult}`
      },
    });

    const status = await response.text();
    document.getElementById("serverStatus").value = status
    return status
  }

    // TBD
  async function sendMessage() {
    login().then(token => {
      localStorage.setItem("jwttoken", token)
    });
    var result = localStorage.getItem("jwttoken")
    var trimmedResult = result.substring(8, result.lastIndexOf("\""));
    var message = {text: String(document.getElementById("messageToSend").value)}
    //alert("TO BE USED: " + result)
   
    console.log(`Bearer ${trimmedResult}`)
    const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/slack', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${trimmedResult}`
      },
      body: JSON.stringify(message)
    });

    const received = await response;
    //console.log("MESSAGE RESPONSE: " + received.status)
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
    //--localStorage.setItem("jwttoken", token)
    //alert(localStorage.getItem("jwttoken") + " ___ current" )
    //console.log("FIRST TOKEN: " + token)
    return token
  }

  return (
    <main className={styles.MiniMenu}>
      <h1 className={styles.h1}> We are in MiniMenu.</h1>

      <h2>Get server status</h2>
      <button className={styles.button} onClick={alive}>Check</button>
      <h3>Status right now:</h3>
      <textarea id="serverStatus"></textarea>

=     <h2>Send a message</h2>
      <input id = "messageToSend" placeholder="Enter a message:"></input>
      <button className={styles.button} onClick={sendMessage}>Send</button>

      <h2>Response:</h2>
      <textarea id = "messageResponse"></textarea>
    </main>
  );
}