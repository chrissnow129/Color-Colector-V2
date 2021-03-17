import React, { useState, useEffect } from 'react';

export default function Tweets(props){

    const [tweets, setTweets] = useState([]);

    useEffect( () => {
        (async () => {
        try {
            const res = await fetch('https://tweet-backend-api.herokuapp.com/tweets')
            const data = await res.json()
            console.log(data)
            await setTweets(data);
        } catch (err) {
            console.log(err)
        } 
    }
)()}, [] )



    return (
        <>
        <div>
            {
                tweets.map(item => {
                    return (
                        <>
                        <ul>
                        <li>Post Title: {item.title}</li>
                        <li>Content: {item.content}</li>
                        <li>Author: {item.author}</li>
                        <li>Created At: {item.created_at}</li>
                        <li>Updated At: {item.updated_at}</li>
                        </ul>
                        {/* DELETE BUTTON GOES HERE */}
                        </>
                    );
                })
            }
        </div>


        </>
    )
}