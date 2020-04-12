import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from 'react-s-alert';
import { Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import Error from "./Error"
import DatePicker from 'react-datepicker'
import { ReactstrapSelect } from "reactstrap-formik"

// CSS Style sheets
import "react-datepicker/dist/react-datepicker.css"
// react alert - mandatory 
import 'react-s-alert/dist/s-alert-default.css';
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


const CreateExercise = () => {
    const [ user, setUser ] = useState([]);
            
    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(function (response) {
          let user = response.data.map(item => ({name: item.username}));
          setUser(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    
    // create exercise validation schema
    const validationSchema = Yup.object().shape({
        // color: Yup.string().required('Color is required!'),
        username: Yup.string().ensure().required("user is required!"),
        description: Yup.string().min(5, "Must Enter Description").required("Must Enter Description"),
        duration: Yup.number().min(1, "Must be Grater 1 Than").required("Must Enter a Number"),
        date: Yup.date().required('must enter date')
    })


    return (
        <div className="container">
            <h3>Create New Exercise Logs</h3>
            <Alert stack={true} />
            <Formik
                initialValues={{
                    // user: '',
                    username: '',
                    description: '',
                    duration: '',
                    date: ''
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    // console.log("Enter in submit function", values);
                    setSubmitting(true);
                    
                    axios.post(`http://localhost:5000/exercises/add`, values)
                        .then(res => {
                            // console.log(res.data);
                            Alert.success(res.data , {
                                position: 'top-right',
                                effect: 'slide',
                                timeout: 1500
                            });
                            resetForm();
                        })
                        .catch(err => {
                            console.log(err);
                            Alert.error( err.message , {
                                position: 'top-right',
                                effect: 'slide',
                                timeout: 1500
                            });
                        })
                    setSubmitting(false);
                    // resetForm();
                    // window.location = '/'
                }}
                validationSchema={validationSchema}
            >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, resetForm, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* <label htmlFor="userSelect"><strong>Username: </strong></label> */}
                        <Field
                        label="username"
                        name="username"
                        component={ReactstrapSelect}
                        inputprops={{
                            name: "username",
                            id: "username",
                            options: user,
                            defaultOption: "select"
                        }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Description: </strong></label>
                        <input name="description" type="text" id="description" 
                            value={values.description} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Enter description text..." 
                            className={touched.description && errors.description ? 'form-control has-error' : "form-control" } 
                        />
                        <Error touched={touched.description} message={errors.description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration"><strong>Duration (in minutes): </strong></label>
                        <input name="duration" type="number" id="duration" 
                            value={values.duration} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            placeholder="0"
                            className={touched.duration && errors.duration ? 'form-control has-error' : "form-control" } 
                        />
                        <Error touched={touched.duration} message={errors.duration} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userDate"><strong>Date :</strong> </label> <br/>
                        <DatePicker 
                            id="userDate"
                            selected={values.date}
                            dateFormat="MMMM d, yyyy"
                            name="date"
                            showIcon={true}
                            onChange={e => setFieldValue('date', e)}
                            className={touched.date && errors.date ? 'form-control has-error' : "form-control" } 
                        />
                        <Error touched={touched.date} message={errors.date} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Create Exercise Log</button>
                    </div>
                    <pre>{isSubmitting}</pre>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default CreateExercise
