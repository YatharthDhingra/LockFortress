import React, { useEffect } from 'react'
import './Passgen.css';
import zxcvbn from 'zxcvbn'
import { useState } from 'react';

export default function Passcheck (prop) {
    const [handelText, setHandelText] = useState('');
    const [copied, setCopied] = useState(false);
    let info = zxcvbn(handelText)
    console.log(info)
    useEffect(() => {
        //Runs only on the first render
            setHandelText(prop.pswd)
      }, [prop]);


    const {score , feedback, guesses} = info
    let x = 0;

    let feedelem = feedback.suggestions.map(suggest => {
        x += 1
        return (<h5>{x}. {suggest}</h5>)
    })

    return(
            <div>
                <h2>Password Strength Checker</h2>
                <div className="password-box">
          <input
            type="text"
            value={handelText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandelText(e.target.value)}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>
        </div>
        <br />
        <br />
            <div>
            
                <span
                    className="strength-password"
                    data-score={score}
                />
                <br />
                <br />
                <div>
                    <h4>Password Score : {score}</h4>
                </div>
                <div>
                    <h4></h4>
                </div>
                <div>
                    <h2>Feedback</h2>
                    {feedback.suggestions.length === 0 ? "All good" : feedelem}
                </div>
            </div>
        </div>
    )
}