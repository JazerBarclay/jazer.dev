import React, { Component } from "react"
import ReactMarkdown from 'react-markdown'
import PostDataService from "../services/posts.service"
import gfm from "remark-gfm"

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.getPost = this.getPost.bind(this);
    this.getLongDate = this.getLongDate.bind(this);

    this.state = {
      currentPost: {
        post_id: null,
        slug: "",
        title: "",
        body: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  getPost(id) {
    PostDataService.get(id)
      .then(response => {
        this.setState({
          currentPost: response.data.results
        });
        console.log(response.data.results);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getLongDate(date) {
    //   new Date(currentPost.published).toLocaleDateString('en-GB') => dd/mm/yyyy
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
    const d = new Date(date)
    const formatted = d.toLocaleDateString("en-GB", options);
    console.log(formatted)
    return formatted
  }



  render() {
    const { currentPost } = this.state;

    return (
      <div>
        <h1>{currentPost.title}</h1>
        <small>Created {this.getLongDate(currentPost.created)}</small><br />
        {currentPost.published ? (
            <small>Published {this.getLongDate(currentPost.published)}</small>
        ) : (
            <small>Unpublished</small>
        )}

        <ReactMarkdown plugins={[gfm]} children={currentPost.body} />
      </div>
    );
  }
}