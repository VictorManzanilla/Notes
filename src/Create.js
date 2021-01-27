import React, {useState} from 'react'
import axios from 'axios'
import Nav from './Nav'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import {getUser, getToken} from './helpers'


const Create = () => {
    //state
    const [state, setState] = useState({
        title:'',
        user: getUser()
    })

    const [content, setContent] = useState('')

    // rich text editor handle change
    const handleContent = (e) => {
        console.log(e)
        setContent(e)
    }




    //destructure values from state. content was remove for the reactquill(rich text editor), look at state
    const {title, user} = state

    //onchange event handler
    const handleChange = (name) => (event) => {
        //console.log('name', name, 'value', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:8000/api/post', {title, content, user}, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response)
            //empty state
            setState({...state, title: '',  user: ''})
            //this will empty the content field. 
            setContent('')
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
            <ReactQuill 
             onChange={handleContent} 
             value={content} 
             theme="bubble"
             className="pb-5 mb-3" 
             style={{border: '1px solid #666'}}
             placeholder="write here.." 
        
            />
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