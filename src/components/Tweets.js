import React, { useState, useEffect } from 'react';
import Delete from 'delete';

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
<<<<<<< HEAD
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
=======
)()}, [])



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
                    <div>
                    <Delete/>
                    </div>
                    </>
                );
            })
        }
    </div>


    </>
)
>>>>>>> 2c5fac3ab541d62dab5699007b789a43ba83e2c9
}