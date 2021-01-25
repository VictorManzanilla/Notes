import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Nav from './Nav'

const Login = () => {
    const [state, setState] = useState({
        name: '',
        password: ''
    })
//destructure values from state
    const {username, password} = state

     //onchange event handler
     const handleChange = (name) => (event) => {
        //console.log('name', name, 'value', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(username, password)
        axios
        .post('http://localhost:8000/api/login', {username, password})
        .then(response => {
            console.log(response)
            // response will contain token and name
            // redirect to create page
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    return(
        <div className='container pb-5'>
            <Nav/>
            <br/>
            <h1>Login</h1>
            <br/>
            <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="text-muted">Username</label>
            <input onChange={handleChange('username')} 
            value={username} 
            type="text" 
            className="form-control" 
            placeholder="Username" 
            required/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input 
            onChange={handleChange('password')} 
            value={password} 
            type="password" 
            className="form-control" 
            placeholder="Password" 
            required/>
        </div>
        <br/>
        <div>
            <button className="btn btn-primary">Login</button>
        </div>
    </form>
        </div>
    )
}
export default Login