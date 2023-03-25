import { useState } from 'react';
import selectarr from '../data';
import Passcheck from './Passcheck';

export default function Passgen() {
  const [passwordGen, setPasswordGen] = useState({
    customtext : "John_Doe",
    length: 10,
    underscrs: false,
    numbers: false,
    symbols: false,
    difficulty: 1,
    customchoice: "",
    customtext2 : ""
  });


  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);

  const leetspeak = [
    ["a" ,"A" , "@", "4"],
    ["b" , "B" ,"8"],
    ["c" , "C" ,"(", "<"],
    ["d" , "D" ,"|)"],
    ["e" , "E" ,"3"],
    ["f" , "F"],
    ["g" ,"G" ,"9"],
    ["h" , "H" ,"#"],
    ["h" ,"H" ,"!"],
    ["i" , "I"],
    ["k" , "K" ,"|<"],
    ["l" , "L" ,"1"],
    ["m" , "M" ,"|\/|"],
    ["n" , "N"],
    ["o" , "O", "0" ],
    ["p" , "P" ,"?"],
    ["q" , "Q"],
    ["r" , "R"],
    ["s" , "S" ,"$", "5"],
    ["t" , "T" ,"7", "+"],
    ["u" , "U"],
    ["v" , "V" , "|/"],
    ["w" , "W"],
    ["x" , "X" ,"*"],
    ["y" , "Y"],
    ["z" , "Z", "%"]
  ]



  function handleChange(event) {
    const {name , type , value , checked} = event.target
    setPasswordGen(prevPassword => {
      return{
        ...prevPassword,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  function shuffleArray(array) { 
    return array.sort( ()=>Math.random()-0.5 );
  } 

  function genCodeText(pass_string) {
    pass_string = pass_string.toLowerCase()
    let ret_string = ""
    for(let i=0;i<pass_string.length;i++){
      let ind = pass_string.charCodeAt(i)
      ind = ind - 97
      if(ind >=0 && ind <= 25 && leetspeak[ind].length !== 0){
        ret_string += leetspeak[ind][Math.floor(Math.random()*leetspeak[ind].length)]
      }
      else {
        ret_string += pass_string[i]
      }
    }

    return ret_string
  }

  function joinCustomChoice(text , customchoice , customtext2) {
      if(customchoice === "") return (text + customtext2)
      const customarr = selectarr[customchoice]
      let middleword = customarr[Math.floor(Math.random()*customarr.length)]
      return (text + middleword + customtext2)
  }

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const { length, underscrs, numbers, symbols, difficulty, customtext ,customchoice, customtext2} = passwordGen;

    const generateTheWord = (
      length,
      underscrs,
      numbers,
      symbols,
      difficulty,
      customtext,
      customchoice,
      customtext2
    ) => {
      const availableCharacters = [
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
        ...(underscrs ? '_' : [])
      ];
    
      const rnd_array = shuffleArray(availableCharacters).slice(0, Math.max(0 , length - customtext.length))
      const rnd_string  = rnd_array.join("")

      let pass_string = ""
      let sufpre = Math.floor(Math.random()*2)
      if(difficulty === 1) {
        let customtextupd = joinCustomChoice(customtext , customchoice , customtext2)
        pass_string = sufpre === 0 ? rnd_string + customtextupd : customtextupd + rnd_string
      }
      else if(difficulty === "2") {
        let codeText = genCodeText(customtext)
        let codeTextupd = joinCustomChoice(codeText , customchoice , customtext2)
        pass_string = sufpre === 0 ? rnd_string + codeTextupd : codeTextupd + rnd_string
      }
      else{
        let codeText = genCodeText(customtext)
        let codeText2 = genCodeText(customtext2)
        let codeTextupd = joinCustomChoice(codeText , customchoice , codeText2)
        pass_string = sufpre === 0 ? rnd_string + codeTextupd : codeTextupd + rnd_string
      }
  
      setHandelText(pass_string)
    };

    generateTheWord(length, underscrs, numbers, symbols, difficulty, customtext, customchoice, customtext2);
  }


  return (
    <div className='main-box'>
      <div className='container'>
        <h2>Password Generator</h2>
        <div className="password-box">
          <input
            type="text"
            contentEditable = "false"
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
        <div className='password-box'>
          <input
            type="text"
            placeholder='Add Custom Text'
            name="customtext"
            value={passwordGen.customtext}
            onChange = {handleChange}
          />
          <select 
            className='password-box'
            onChange={handleChange}
            name = "customchoice"
            value = {passwordGen.customchoice}
          >
            <option value = "">Choose</option>
            <option value = "dob">DOB</option>
            <option value = "favfood">FavFood</option>
            <option value = "hobby">Hobby</option>
            {/* <option value = "quality">Quality</option> */}
          </select>
        </div>
        <br></br>
        <div className='password-box'>
        <input
            type="text"
            placeholder='Add 2nd Custom Text'
            name="customtext2"
            value={passwordGen.customtext2}
            onChange = {handleChange}
        />
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
              value={passwordGen.length}
              name = "length"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include underscores</label>
          </div>
          <div>
            <input type="checkbox"
              name = "underscrs"
              checked={passwordGen.underscrs}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <input type = "checkbox"
              name = "numbers"
              checked={passwordGen.numbers}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <input type="checkbox"
              checked={passwordGen.symbols}
              name = "symbols"
              onChange={handleChange}
            />
          </div>
          <div className='range-slider-main'>
            <div>Complexity</div>
          <div className='passgen-slider'>
            <input className= "imp-range" type="range" 
              min="1" 
              max="3" 
              step="1" 
              value={passwordGen.difficulty} 
              onChange={handleChange}
              name = "difficulty"
            />
          </div>
          </div>
        </div>
        <br />
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
      <div className='check-container'>
        <Passcheck pswd={handelText}/>
      </div>
      </div>
  );
}
