import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from 'react-s-alert';
import { Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import Error from "./Error"
import DatePicker from 'react-datepicker'
import SelectInput from './SelectInput'


// CSS Style sheets
import "react-datepicker/dist/react-datepicker.css"
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


const EditExercise = (props) => {
    const {id} = props.match.params;

    const [isLoading, setIsLoading] = useState(false);
    const [newInitialValue, setInitialValue] = useState({})

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:5000/exercises/${id}`)
            .then(res => {
                console.log(res.data);
                let newInitialValues = {
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                }
                setInitialValue(newInitialValues);
            })
            .catch(err => {console.log(err.message)})
    }, [id, newInitialValue]);

        
    // create exercise validation schema
    const validationSchema = Yup.object().shape({
        username: Yup.string().ensure().required("user is required!"),
        description: Yup.string().min(5, "Must Enter Description").required("Must Enter Description"),
        duration: Yup.number().min(1, "Must be Grater 1 Than").required("Must Enter a Number"),
        date: Yup.date().required('must enter date')
    })



    return (
        <div className="container">
            <h3>Create New Exercise Logs</h3>
            <Alert />
            {isLoading ? "loading...." : (
                <Formik
                    initialValues={newInitialValue}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log(values);
                        setSubmitting(true);
                        axios.post(`http://localhost:5000/exercises/update/${id}`, values)
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
                        window.location = '/'
                    }}
                    validationSchema={validationSchema}
                >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <SelectInput value={values.username} />
                            <Error touched={touched.description} message={errors.description} />
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
                                minDate={new Date()}
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
            )}
        </div>
    )
}

export default EditExercise
