import React, { Component } from "react";
import PostsDataService from "../services/posts.service";
import { Link } from "react-router-dom";

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    this.searchSlug = this.searchSlug.bind(this);
    this.onChangeSearchSlug = this.onChangeSearchSlug.bind(this);

    this.state = {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      searchSlug: ""
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  onChangeSearchSlug(e) {
    this.setState({
        searchSlug: e.target.value
    });
  }

  retrievePosts() {
    PostsDataService.getAll()
      .then(response => {
        this.setState({
          posts: response.data.results
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePosts();
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index
    });
  }

  removeAllPosts() {
    PostsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchSlug() {
    PostsDataService.findBySlug(this.state.searchSlug)
      .then(response => {
        this.setState({
          posts: response.data.data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchSlug, posts, currentPost, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
            //   value={searchSlug}
            //   onChange={this.onChangeSearchSlug}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSlug}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Post List</h4>

          <ul className="list-group">
            {posts && posts.map((post, index) => (
                <Link key={post.post_id}
                to={"/post/" + post.slug}
                >
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                //   onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.title}
                </li>
                </Link>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPosts}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div key={currentPost.post_id}>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPost.title}
              </div>
              <div>
                <label>
                  <strong>Body:</strong>
                </label>{" "}
                {currentPost.body}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPost.published ? "Published" : "Pending"}
              </div>

              {/* <Link
                to={"/post/" + currentPost.post_id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
            </div>
          )
           : (
            <div>
            </div>
          )
          }
        </div>
      </div>
    );
  }
}