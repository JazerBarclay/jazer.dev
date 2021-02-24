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
      <div className="post-page">
        <div className="profile">
          <img src="pfp.png" />
          <h1>Jazer Barclay</h1>
        </div>

        <hr />

        <section class="posts">

        {posts && posts.map((post, index) => (
          <article class="post-card">
          
            <div class="post-header" key={index}>
            <Link key={post.post_id} to={"/" + post.slug} >
                <strong>{post.title}</strong>
            </Link>
              <span>{new Date(post.published).toLocaleDateString('en-GB')}</span>
            </div>
            <small>A quick guide to setting up an API using Express.JS</small>
          
          </article>
        ))}

        </section>

        <hr />
      </div>
    );
  }
}