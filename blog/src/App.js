import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom';
import Post from './components/post.component'
import PostList from './components/posts-list.component'
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Blog
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                All Posts
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                
              </Link>
            </li> */}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/"} component={PostList} />
            <Route exact path="/:id" component={Post} />
            {/* <Route exact path="/add" component={AddPost} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;