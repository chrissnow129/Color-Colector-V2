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
        <form className='flex flex-col h-16 my-36' onSubmit={handleSubmit}>
            <div className='w-40 h-5 m-auto '>
            <input className='border-2 border-white bg-transparent rounded-lg px-2 py-1.5' type="text" placeholder="Title" ref={titleInput}/>
            <input className='border-2 border-white bg-transparent rounded-lg px-2 my-3 py-1.5' type="text" placeholder="Author" ref={authorInput}/>
            <input className='border-2 border-white bg-transparent rounded-lg px-2 mb-3 py-1.5' type="text" placeholder="What's happening?" ref={contentInput}/>
            <input style={{boxShadow:'10px 10px 15px -3px rgba(88, 225, 246, 0.5)', color:'rgb(33, 161, 216)'}} className='border-2 border-white text-white bg-transparent rounded-full px-4 py-1 hover:bg-white hover:text-gray-200 hover:shadow-lg hover:transition duration-200' type="submit" value="Tweet"/>
            </div>
        </form>
        </>
    )
}

export default InputBox;