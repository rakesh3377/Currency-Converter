import React, { useEffect, useState } from "react";
import './App.css'
import axios from "axios"

export default function App() {

  const [Amount, setamount] = useState(1);
  const [fromcurrency, setfromcurrency] = useState("USD");
  const [tocurrency, settocurrency] = useState("INR");
  const [convertedamount, setconvertedamount] = useState(null);
  const [exchangerate, setexchangerate] = useState(null)
 
  useEffect(()=>{
    const getExchangerate = async () => {
      try{
        let URL = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
        const response = await axios.get(URL);
        // console.log(response);
        setexchangerate(response.data.rates[tocurrency])

      }catch(error){
        console.error("Error fetching exchange rate:", error);
      }
    };
    getExchangerate()
  },[fromcurrency, tocurrency]);


  useEffect(()=>{
    if(exchangerate !== null){
      setconvertedamount((Amount * exchangerate).toFixed(2));
    }
  },[Amount, exchangerate])

const handleamountchange = (e) => {
  const value = parseFloat(e.target.value);
  setamount(isNaN(value) ? 0 : value);
}

const handlefromcurrency = (e) => {
  setfromcurrency(e.target.value);
}

const handletocurrency = (e) => {
  settocurrency(e.target.value);
}

  return (
    <>
      <div className="currency-conve">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount</label>
            <input type="number" id="amt" value={Amount} onChange={handleamountchange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromcurrency">From Currency:</label>
            <select id="fromcurrency" value={fromcurrency} onChange={handlefromcurrency}>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAN">CAN - Canadian Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="tocurrency">To Currency:</label>
            <select id="tocurrency" value={tocurrency} onChange={handletocurrency}>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAN">CAN - Canadian Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p><span>{Amount}</span> {fromcurrency} is equal to <span>{convertedamount}</span> {tocurrency}</p>
          </div>
        </div>
      </div>
    </>
  );
}
