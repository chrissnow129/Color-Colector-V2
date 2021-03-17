import React from 'react';

const InputBox = props => {
// const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//         const response = await fetch(`/api/kafjdslkf`, {
//             method: 'POST',
//             headers: {
//                 'Content'
//             }
//         })
//     }
// }
    return (
        <>
        <form>
            <input type="text" placeholder="What's happening?"/>
            <input type="submit" value="Tweet"/>
        </form>
        </>
    )
}

export default InputBox;