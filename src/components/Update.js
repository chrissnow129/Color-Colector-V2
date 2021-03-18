import React, { useState, useEffect, useRef } from 'react';

export default function Update(props) {
    const [tweet, setTweet] = useState({});
    const titleInput = useRef(null);
    const contentInput = useRef(null);
    const authorInput = useRef(null)

    useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`https://tweet-backend-api.herokuapp.com/${props.match.params.id}`);
				const data = await response.json();
				setTweet(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [tweet]);

    const handleUpdate = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`https://tweet-backend-api.herokuapp.com/${props.match.params.id}`, {
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
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <label>
                Title:
                 <input type="text" ref={titleInput} defaultValue={tweet.title} />
            </label>
            <label>
                Content:
                 <input type="text" ref={contentInput} defaultValue={tweet.content} />
            </label>
            <label>
                Author:
                 <input type="text" ref={authorInput} defaultValue={tweet.author} />
            </label>
       </form>
    )
}

