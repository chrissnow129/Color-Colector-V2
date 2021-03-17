import React, { useEffect } from 'react';

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
)()}, [] )



    return (
        <>
        <div>
            {
                props.tweets.map(item => {
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
                        <br/>
                        </>
                    );
                })
            }
        </div>


        </>
    )
}