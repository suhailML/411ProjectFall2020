import React from 'react'

const User = (props) => {
    const style = {
        height: props.size,
        width: props.size,
        marginRight: 10,
        borderRadius: '100%',
        backgroundColor: props.self ? '#b285f9' : '#f9aa41'
    }

    return (
        <div>
            <div className="user">
                <div style={style}></div>
                <p>{props.name}</p>
            </div>
        </div>
        
    )
}

export default User