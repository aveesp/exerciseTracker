import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'
import Alert from 'react-s-alert'

const ExercisesList = () => {    
    const [exercises, setExercises] = useState([]);

    // Get Excersise Data
    useEffect(() => {
        getExercises();
      }, [exercises]);
    
      async function getExercises() {
        const response = await fetch('http://localhost:5000/exercises');
        const data = await response.json();
        setExercises(data);
      }
        
    
    const handleDeleteExerceise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => {
                console.log(res.data)
                
                Alert.info(res.data , {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 2500
                });

            })
            .catch((err) => {
                console.log(err.message);
                Alert.error( err.message , {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 2500
                });
            })
    } 

    
    const inputRef = React.createRef();

    return (
        <div className="container">
            <h3>Exercise List </h3>
                <hr/>
            <Alert stack={true} ref={inputRef} />
            <ListGroup horizontal>
                {
                    exercises.map(item => {
                        return (
                            <ListGroup.Item key={item._id}>
                            <div className="username">
                                <strong>Username :- </strong> {item.username}
                            </div>
                            <div className="description">
                                <strong>Description :-</strong> {item.description}
                            </div>
                            <div className="duration">
                                <strong>Duration :-</strong> {item.duration}
                            </div>
                            <div className="date">
                                <strong>Date :-</strong> {item.date}
                            </div>
                            <div className="btn-cnt mt-5">
                                <Link to={"/edit/"+item._id} className="btn btn-primary btn-block">Edit</Link>
                                <button className="btn btn-danger delete-btn" onClick={() => handleDeleteExerceise(item._id)}>X</button>
                            </div>
                        </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default ExercisesList
