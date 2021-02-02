import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App'
import Create from './Create'
import SinglePost from './SinglePost'
import UpdatePost from './UpdatePost'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import notes from './notes.jpg'

const Routes = () => {
    return(
        <div  style={{ backgroundImage: `url(${notes})`,
        width:'2000px',
        backgroundPosition: 'center'
         }}>
        {/* <img src={notes} class="img-fluid" alt="..."></img> */}
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <PrivateRoute path="/create"  exact component={Create} />
            <Route path="/login"  exact component={Login} />
            <Route path="/post/:slug"  exact component={SinglePost} />
            <PrivateRoute path="/post/update/:slug"  exact component={UpdatePost} />

        </Switch>
        </BrowserRouter>
        
        </div>
    )
}

export default Routes