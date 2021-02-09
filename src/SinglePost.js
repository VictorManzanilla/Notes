import React, {useState, useEffect} from 'react'
import axios from'axios'
import Nav from './Nav'
import renderHTML from 'react-render-html'
import './main.css'


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

    const showSinglePost = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2 pt-3 pb-2">
                <h1>{post.title}</h1>
                <div className="lead pt-3">{renderHTML(post.content)}</div>
                <p>
                    Author<span className="badge">{post.user}</span> Published on{' '} 
                    <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                </p>
                {/* {JSON.stringify(props)} */}
                
            </div>
       </div>
    )

    //post && showSinglePost why? post is available by running the useEffect, so the function renderHTML tries to render before there is any content
    // so we get error when we have {renderHTML(post.content)} in the div classname lead pt-3.
    return(
        <div className="container pb-5">
            <Nav/>
            {post && showSinglePost()}
        </div>
    )

}
export default SinglePost