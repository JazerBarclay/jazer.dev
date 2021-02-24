import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom';
import Post from './components/post.component'
import PostList from './components/posts-list.component'
// import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="container">
          <Switch>
            <Route exact path={"/"} component={PostList} />
            <Route exact path="/:id" component={Post} />
            {/* <Route exact path="/new" component={AddPost} /> */}
          </Switch>
      </div>
    );
  }
}

export default App;