import React, { useRef } from 'react';
// import Tweets from './Tweets';

const InputBox = props => {

const contentInput = useRef(null);
const titleInput = useRef(null);
const authorInput = useRef(null);

const handleSubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetch('https://tweet-backend-api.herokuapp.com/tweets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.current.value,
                author: authorInput.current.value,
                content: contentInput.current.value
            })
        });
        const data = await response.json();
        console.log(data)
        props.setTweets([...props.tweets, data.tweet]);
    } catch(error) {
        console.error(error);
    }
    console.log(props.tweets)
}
    return (
        <>
        <form onSubmit={handleSubmit}>
            
            <input type="text" placeholder="Title" ref={titleInput}/>
            <input type="text" placeholder="Author" ref={authorInput}/>
            <input type="text" placeholder="What's happening?" ref={contentInput}/>
            <input type="submit" value="Tweet"/>
        </form>
        </>
    )
}

export default InputBox;