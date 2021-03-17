import { useEffect, useState } from "react";


const deleteTweet = useState = async (e) => {

  useEffect(() => {
  try {
    const response = await fetch(
      "https://tweet-backend-api.herokuapp.com/tweets/${props.match.params.id}",
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        // body: JSON.stringify(tweet)
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
})
}

export default deleteTweet;