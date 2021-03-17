import React from 'react';
export default function Delete(props) {

    const handleDelete = async e => {
        try {
            const response = await fetch(`https://tweet-backend-api.herokuapp.com/${props.match.params.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
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
