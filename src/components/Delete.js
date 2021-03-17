import React from 'react';

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

