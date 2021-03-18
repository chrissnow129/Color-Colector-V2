import React from 'react';
export default function Delete(props) {

    const handleDelete = async e => {
        console.log(props.post.id)
        try {
            const response = await fetch(`https://tweet-backend-api.herokuapp.com/tweets/${props.post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            window.location.assign('/')
        }
    };
    
    return (
        <div>
        <button onClick={handleDelete}> Delete </button> 
        </div>
    )
    
}
