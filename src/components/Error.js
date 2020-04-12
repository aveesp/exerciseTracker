import React from 'react'

const Error = ({values, touched, message}) => {
    // console.log(values, touched, message);
    if(!touched){
        return ''
    }
    if(message){
        return <div className="form-message invalid">{message}</div>
    }
    return <div className="form-message valid">All Good</div>
}

export default Error
