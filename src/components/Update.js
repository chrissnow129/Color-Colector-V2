import React, { useState, useRef } from "react";

export default function Update(props) {
  const [tweet, setTweet] = useState({});
  const [hidden, setHidden] = useState(false);
  const titleInput = useRef(null);
  const contentInput = useRef(null);
  const authorInput = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(props.post.id);
    try {
      const response = await fetch(
        `https://tweet-backend-api.herokuapp.com/tweets/${props.post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleInput.current.value,
            content: contentInput.current.value,
            author: authorInput.current.value,
          }),
        }
      );
      const data = await response.json();
      setTweet(data);
    } catch (error) {
      console.error(error);
    } finally {
      window.location.assign("/");
    }
  };

  const hideUpdate = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <button
        className="border-2 border-white bg-transparent text-white rounded-full px-4 py-1 w-44 ml-16 my-2.5 hover:bg-white hover:text-blue-200 hover:shadow-lg hover:transition duration-200"
        onClick={hideUpdate}
      >
        Update the tweet
      </button>
      <form
        className="flex flex-col py-3"
        style={hidden ? { display: "flex", transition: 'display 3s' } : { display: "none", transition: 'display 3s' }}
        onSubmit={handleUpdate}
      >
        <label>
          <input
            className="border-2 border-white rounded-lg bg-transparent ml-10 mb-2.5 px-2 py-1.5"
            type="text"
            placeholder="Title"
            ref={titleInput}
            defaultValue={props.title}
          />
        </label>
        <label>
          <input
            className="border-2 border-white bg-transparent rounded-lg ml-10 my-2.5 px-2 py-1.5"
            type="text"
            placeholder="Content"
            ref={contentInput}
            defaultValue={props.content}
          />
        </label>
        <label>
          <input
            className="border-2 border-white bg-transparent rounded-lg ml-10 my-3 px-2 py-1.5"
            type="text"
            placeholder="Author"
            ref={authorInput}
            defaultValue={props.author}
          />
        </label>
        <input
          className="border-2 border-white text-white bg-transparent rounded-full px-4 py-1 w-32 ml-20 hover:bg-white hover:text-blue-200 hover:shadow-lg hover:transition duration-200"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
