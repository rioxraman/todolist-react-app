import React, { Component } from "react";
import "./App.css";

import http from "./components/httpService";
import config from "./components/config.json"
import View from "./components/view"
class App extends Component {
  state = {
    posts: []
  };
//mouunt fetch post 
async componentDidMount() { 
  
  const {data: posts}= await http.get(config.toDoURL);
  this.setState({posts})
  console.log(posts);
 }
 //add dummy
  handleAdd = async () => {
    const obj ={title:"Raman added Title",completed:false}
    const{data:post}= await http.post(config.toDoURL,obj);
    console.log(post);    
    const posts= [post , ...this.state.posts] 
    this.setState({ posts });
  };
//update title of any post
  handleUpdate = async post => {
    console.log("Update", post);
    post.title ="Updated";
    await http.put(config.toDoURL+"/"+post.id,post);
    const posts =[...this.state.posts];
    const index = posts.indexOf(post)
    posts[index] ={...post };
    this.setState({ posts });
  };
//delete user
  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(config.toDoURL + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <View  posts={this.state.posts}  handleAdd={this.handleAdd} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}/>
    );
  }
}

export default App;
