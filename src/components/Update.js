import React, { useState, useRef } from 'react';

export default function Update(props) {
    const [tweet, setTweet] = useState({});
    const titleInput = useRef(null);
    const contentInput = useRef(null);
    const authorInput = useRef(null)


    const handleUpdate = async e => {
        e.preventDefault();
        console.log(props.post.id)
        try {
            const response = await fetch(`https://tweet-backend-api.herokuapp.com/tweets/${props.post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: titleInput.current.value,
                    content: contentInput.current.value,
                    author: authorInput.current.value
                })
            });
            const data = await response.json();
            setTweet(data);
        } catch (error) {
            console.error(error);
        } finally {
            window.location.assign('/')
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <label>
                Title:
                 <input type="text" ref={titleInput} defaultValue={props.title} />
            </label>
            <label>
                Content:
                 <input type="text" ref={contentInput} defaultValue={props.content} />
            </label>
            <label>
                Author:
                 <input type="text" ref={authorInput} defaultValue={props.author} />
            </label>
            <input type="submit" value="Submit" />
       </form>
    )
}

