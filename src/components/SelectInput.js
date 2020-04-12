import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Field, Form, Formik } from "formik"
import { ReactstrapSelect } from "reactstrap-formik"

const SelectInput = (props) => {
    
    console.log(props);
    
    const [ users, setUsers ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:5000/users/')
            .then(res => {
                console.log(res.data)
                setUsers(res.data);
            })
            .catch(err => {console.log(err.message)})
        console.log(users);
    }, [users]);

    return (<h1>test</h1>)
}

export default SelectInput
