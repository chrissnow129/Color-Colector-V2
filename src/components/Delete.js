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
        <div className='border-2 border-white text-white bg-transparent rounded-full px-4 py-1 w-32 ml-20 text-center hover:bg-white hover:text-blue-200 hover:shadow-lg hover:transition duration-200'>
        <button onClick={handleDelete}> Delete </button> 
        </div>
    )
    
}
