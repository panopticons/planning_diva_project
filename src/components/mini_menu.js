import React from "react";
import styles from '../app/page.module.css'

export default function MiniMenu() {

    const checkKey = () => {
        login()
    }

    const sendMessage = () => {
        checkKey()
        //document.getElementById("serverStatus").value = localStorage.getItem("current_jwt")
    }

    async function getStatus() {
        login()
        //alert(localStorage.getItem('current_jwt'))

        const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/alive', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('current_jwt')}`
            },
          });


        const status = await response.text();
        return status
    }

    getStatus().then(status => {
        document.getElementById("serverStatus").value = status
    })

    async function login() {
        const response = await fetch('https://diva-challenge-ul4cm77qva-uc.a.run.app/login', {
            method: 'GET'
        });

        const token = await response.text();
        return token
    }

    login().then(token => {
        localStorage.setItem("current_jwt", token)
    });

    
  return (
    <main className={styles.MiniMenu}>
      <h1 className={styles.h1}> We are in MiniMenu.</h1>
      <h2>Get server status</h2>
      <button className={styles.button} onClick={getStatus}>Check</button>
      <textarea id="serverStatus"></textarea>

      <form onSubmit={sendMessage}>
      <h2>Send a message</h2>
      <input id = "messageToSend" placeholder="Enter a message:"></input>
      <button className={styles.button} type="submit">Send</button>

      </form>
      <h2>Response:</h2>
      <textarea></textarea>
    </main>
  );
}