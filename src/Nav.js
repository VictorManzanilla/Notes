import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {getUser, logout} from './helpers'
import notas from './Notas1.jpeg'

const Nav = ({history}) => {
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/" as={Link} to="/">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" >
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active"  href="/create" as={Link} to="/create">Create Note</a>
        </li>
        {!getUser() && (
                    <li className="nav-item">
                        <a class="nav-link active" href="/login" as={Link} to="/login">Login</a>

                </li>
               )}
               {getUser() && (
                    <li onClick={() => logout(() => history.push('/'))} className="nav-item">
                    logout
                </li>
               )}
      </ul>
    </div>
  </div>
</nav>

            
            // <ul className="nav nav-tabs">
            //     <li className="nav-item pr-3 pt-3 pb-3">
            //         <Link to="/">Home</Link>
            //     </li>
                
            //     <li className="nav-item pr-3 pt-3 pb-3">
            //         <Link to="/create">Create Post</Link>
            //     </li>
            //    {!getUser() && (
            //         <li className="nav-item ml-auto pr-3 pt-3 pb-3">
            //         <Link to="/login">Login</Link>
            //     </li>
            //    )}
            //    {getUser() && (
            //         <li onClick={() => logout(() => history.push('/'))} className="nav-item ml-auto pr-3 pt-3 pb-3">
            //         logout
            //     </li>
            //    )}
            // </ul>
          
            // </nav>
        
    )

}

export default withRouter(Nav)