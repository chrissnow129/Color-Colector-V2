import React, { useEffect } from "react";
import Update from "./Update";
import Delete from "./Delete";

export default function Tweets(props) {
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://tweet-backend-api.herokuapp.com/tweets"
        );
        const data = await res.json();
        console.log(data);
        await props.setTweets(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function sortByDate_1(records) {
    const data = records.map((ele, index) => {
      const obj = Object.assign({}, ele);
      if (ele.id != null) {
        obj.counter = index + 1;
      } else {
        obj.counter = 0;
      }
      return obj;
    });
    return data.sort((a, b) => b.counter - a.counter);
  }
    
   

  return (
    <>
      <div>
        {sortByDate_1(props.tweets).map((item) => {
          return (
            <>
              <ul>
                <li>Post Title: {item.title}</li>
                <li>Content: {item.content}</li>
                <li>Author: {item.author}</li>
                <li>Created At: {item.created_at}</li>
                <li>Updated At: {item.updated_at}</li>
                <Update post={item} />
                <Delete post={item} /> <br/>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}
