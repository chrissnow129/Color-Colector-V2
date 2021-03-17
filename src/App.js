import React, { useState } from 'react';
import './App.css';
import Tweets from './components/Tweets';
import InputBox from './components/InputBox';



function App() {
  const [tweets, setTweets] = useState([]);

  return (
    <>
    <div className="header">
      <header className="App-header">
       TWITTER LOGO GOES HERE
      </header>
    </div>
    <div className="input-box">
      <InputBox tweets={tweets} setTweets={setTweets}></InputBox>
      <Tweets tweets={tweets} setTweets={setTweets}></Tweets>

    </div>
    <div className="twitter-posts">

    </div>
    </>
  );
}

export default App;
