import React, {useState} from 'react'
import axios from 'axios'
import Nav from './Nav'


const Create = () => {
    
    const [state, setState] = useState({
        title:'',
        content:'',
        user:''
    })
    //destructure values from state
    const {title, content, user} = state

    //onchange event handler
    const handleChange = (name) => (event) => {
        //console.log('name', name, 'value', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:8000/api/post', {title, content, user})
        .then(response => {
            console.log(response)
            //empty state
            setState({...state, title: '', content: '', user: ''})
            //show success alert
            alert(`Post titled ${response.data.title} is created`)
        })
        .catch(error => {
            alert(error.response.data.error)
        })
    }

  return (
  <div className="container p-5">

<Nav/>
    <h1>Create Post </h1>
    {/* {JSON.stringify(state)} */}
    <br/>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="text-muted">Title</label>
            <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post title" required/>
        </div>
        <div className="form-group">
            <label className="text-muted">Content</label>
            <textarea onChange={handleChange('content')} value={content} type="text" className="form-control" placeholder="write here.." required/>
        </div>
        <div className="form-group">
            <label className="text-muted">User</label>
            <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Your name" required/>
        </div>
        <br/>
        <div>
            <button className="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
  )
}


export default Create;