import React, {useState, useEffect} from 'react'
import axios from'axios'
import Nav from './Nav'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import {getToken} from './helpers'

const UpdatePost = (props) => {

    const [state, setState] = useState({
        title: '',
        slug: '',
        // content: '',
        user: ''
    })
    const {title, slug, user} = state

    const [content, setContent] = useState('')

    // rich text editor handle change
    const handleContent = (e) => {
        console.log(e)
        setContent(e)
    }



    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${props.match.params.slug}`)
        .then(response => {
            const {title, content, slug, user} = response.data
            setState({...state, title, slug, user})
            setContent(content)
        })
        .catch(error => alert('Error loading single post'))
    }, [])

    const handleChange = (name) => (event) => {
        //console.log('name', name, 'value', event.target.value)
        setState({...state, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .put(`http://localhost:8000/api/post/${slug}`, {title, content, user}, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response)
            const {title, content, slug, user} = response.data
            //empty state
            setState({...state, title, content, slug, user})
            //show success alert
            alert(`Post titled ${title} is updated`)
        })
        .catch(error => {
            alert(error.response.data.error)
        })
    }

    const showUpdateForm = () => (
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
            <button className="btn btn-primary">Update</button>
        </div>
    </form>
    )
    return(
        <div className="container pb-5">
            <Nav/>
            <br/>
            <h1>Update Post</h1>
           {showUpdateForm()}
        </div>
    )

}
export default UpdatePost