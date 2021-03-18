import React, { useEffect } from 'react';
// import Delete from './Delete';

export default function Tweets(props){

   

    useEffect( () => {
        (async () => {
        try {
            const res = await fetch('https://tweet-backend-api.herokuapp.com/tweets')
            const data = await res.json()
            console.log(data)
            await props.setTweets(data);
        } catch (err) {
            console.log(err)
        } 
    }
)()}, [])



return (
    <>
    <div>
        {
            props.tweets.map(item => {
                return (
                    <>
                    <div className='bg-green-400 text-center mb-12 w-1/4'>
                    <ul className='bg-white'>
                    <li>Post Title: {item.title}</li>
                    <li>Content: {item.content}</li>
                    <li>Author: {item.author}</li>
                    <li>Created At: {item.created_at}</li>
                    <li>Updated At: {item.updated_at}</li>
                    </ul>
                    </div> <br/>
                    <div>
                    {/* <Delete/> */}
                    </div>
                    </>
                );
            })
        }
    </div>


    </>
)
}