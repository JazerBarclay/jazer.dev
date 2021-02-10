import React, { Component } from "react";
import ReactMarkdown from 'react-markdown'
import PostDataService from "../services/posts.service";

const gfm = require('remark-gfm')

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export default class Post extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSlug = this.onChangeSlug.bind(this);
    // this.onChangeBody = this.onChangeBody.bind(this);
    this.getPost = this.getPost.bind(this);
    this.getLongDate = this.getLongDate.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    // this.updatePost = this.updatePost.bind(this);
    // this.deletePost = this.deletePost.bind(this);

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

//   onChangeTitle(e) {
//     const title = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentPost: {
//           ...prevState.currentPost,
//           title: title
//         }
//       };
//     });
//   }

//   onChangeDescription(e) {
//     const body = e.target.value;
    
//     this.setState(prevState => ({
//       currentTutorial: {
//         ...body.currentPost,
//         body: body
//       }
//     }));
//   }

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