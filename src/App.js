import React, { useState } from 'react';
import './App.css';
import Tweets from './components/Tweets';
import InputBox from './components/InputBox';



function App() {
  const [tweets, setTweets] = useState([]);

  return (
    <body className='h-screen overflow-auto' style={{background:'linear-gradient(128deg, rgba(250,240,190,1) 0%, rgba(221,255,223,1) 61%, rgba(190,255,243,1) 100%)'
    }}>
    <div className="">
      <header className="">
       <img className='m-auto hover:animate-ping'
       src='https://cdn4.iconfinder.com/data/icons/neon-social-icons-set/256/social_media_icons_neon_set_256x256_0002_twitter.png' alt=''></img>
      </header>
    </div>
    <div className="input-box">
      <InputBox tweets={tweets} setTweets={setTweets}></InputBox>
      <Tweets tweets={tweets} setTweets={setTweets}></Tweets>

    </div>
    <div className="twitter-posts">

    </div>
    </body>
  );
}

export default App;
