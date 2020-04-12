import React from 'react'
import axios from 'axios'
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import Error from "./Error"
import Alert from 'react-s-alert';
// mandatory
import 'react-s-alert/dist/s-alert-default.css';
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


const CreateUser = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, "username at least geater that 5 charactors").required("username is required!"),
    })

    return (
        <div className="container">
            <h3>Create  User</h3>
            
            <Alert stack={true} />

            <hr/>
            
            <Formik
                initialValues={{
                    username: ''
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    axios.post('http://localhost:5000/users/add', values)
                    .then(res => {
                        
                        Alert.success(res.data , {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 2500
                        });

                        console.log(res.data);
                    })
                    .catch(err => {
                        
                        Alert.error( err.message , {
                            position: 'top-right',
                            effect: 'slide',
                            timeout: 2500
                        });
                        console.log(err.message);
                    });
                    setSubmitting(false);
                    resetForm();
                }}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">username: </label>
                            <input name="username" 
                                type="text"
                                id="username" 
                                value={values.username} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter username" 
                                className={touched.username && errors.username ? 'form-control has-error' : "form-control" } 
                            />
                            <Error touched={touched.username} message={errors.username} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create user</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateUser
