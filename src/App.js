import './App.css';
import Tweets from './components/Tweets';
import InputBox from './components/InputBox';

function App() {
  return (
    <>
    <div className="header">
      <header className="App-header">
       TWITTER LOGO GOES HERE
      </header>
    </div>
    <div className="input-box">
      <InputBox></InputBox>
      <Tweets></Tweets>

    </div>
    <div className="twitter-posts">

    </div>
    </>
  );
}

export default App;
