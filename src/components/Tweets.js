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
            <div style={{backgroundColor:'rgba(88, 225, 246, 0.6)'}} className='inline-flex sm:flex-col flex-wrap justify-center mx-10 my-5 w-1/4 p-2 rounded-2xl text-white shadow-md'>
              <ul>
                <li class='font-semibold text-lg text-center'>{item.title}</li>
                <li class='ml-5'>{item.content}</li> 
                <li class='ml-5'><span className='font-semibold'>Author: </span>{item.author}</li>
                <li class='ml-5 text-xs font-thin'>Created At: {item.created_at}</li>
                <li class='ml-5 text-xs font-thin'>Updated At: {item.updated_at}</li>
                <Update post={item} />
                <Delete post={item} /> <br/>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
