import React, {useState, useEffect} from 'react'
import axios from'axios'
import Nav from './Nav'

const SinglePost = (props) => {

    const [post, setPost] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${props.match.params.slug}`)
        .then(response => {
            //console.log(response)
            setPost(response.data)
        })
        .catch(error => alert('Error loading single post'))
    }, [])

    return(
        <div className="container pb-5">
            <Nav/>
            <br/>
            <h1>{post.title}</h1>
            <p className="lead">{post.content}</p>
                <p>Author<span className="badge">{post.user}</span> Published on{' '} 
                <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
            {/* {JSON.stringify(props)} */}
        </div>
    )

}
export default SinglePost