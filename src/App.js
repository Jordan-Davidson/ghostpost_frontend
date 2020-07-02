import React from 'react';
import Moment from 'react-moment';
import { Route, NavLink } from 'react-router-dom';
import CreatePost from './form'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {posts: []}
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8000/api/roastboast/')
    .then(res => res.json())
    .then(res => this.setState({posts: res}))
  }

  handleUpvote = (id) => {
    const requestOptions = {
      method: "POST",
      headers: 
      { "Content-Type": "application/json",}
    };
    fetch('http://127.0.0.1:8000/api/roastboast/' + id + '/upvote/', requestOptions)
    .then(res => res.json())
    .then(this.setState({posts: this.state.posts}))
    .then(fetch('http://127.0.0.1:8000/api/roastboast/')
    .then(res => res.json())
    .then(res => this.setState({posts: res})))
  }

  handleDownvote(id){
    const requestOptions = {
      method: "POST",
      headers: 
      { "Content-Type": "application/json",}
    };
    fetch('http://127.0.0.1:8000/api/roastboast/' + id + '/downvote/', requestOptions)
    .then(res => res.json())
    .then(this.setState({posts: this.state.posts}))
    .then(fetch('http://127.0.0.1:8000/api/roastboast/')
    .then(res => res.json())
    .then(res => this.setState({posts: res})))
  }

  render() { return(
  <>
  <ul className = 'filters'>
    <li>
      <NavLink exact to = '/create'>Create a post</NavLink>
    </li>
    <li>
      <NavLink exact to = '/posts'>All</NavLink>
      </li>
    <li>
      <NavLink to = '/roasts'>roasts</NavLink>
    </li>
    <li>
      <NavLink to = '/boasts'>boasts</NavLink>
    </li>
    <li>
      <NavLink to = '/best'>best</NavLink>
    </li>
  </ul>
  <Route
  exact
  path='/posts'
  render={() =>(
  <>
  <h1>GhostPost!</h1>
  <ul>{this.state.posts.map(post => {
    return (
      <ul key={post.id}>
      <li>
      {post.roastorboast === true && <h3 key={post.id + 'roastorboast'}>Roast!</h3>}
      {post.roastorboast === false && <h3 key={post.id + 'roastorboast'}>Boast!</h3>}
    </li>
    <p key={post.id + 'post'}>{post.post}</p>
    <p key={post.id + 'time'}><Moment format="MM/DD/YYYY HH:mm">{post.time}</Moment></p>
    <div key={post.id + 'upvote-downvote'}><button onClick={() => this.handleUpvote(post.id)}>upvotes:</button> {post.upvotes} <button onClick={() => this.handleDownvote(post.id)}>downvotes:</button> {post.downvotes}</div>
    </ul>
    )})}</ul>
  </>
  )}
  >
  </Route>
  <Route 
  exact
  path='/roasts'
  render={() =>(
    <>
    <h1>GhostPost roasts!</h1>
    <ul>{this.state.posts.filter(post => post.roastorboast).map(post => {
    return (
      <ul key={post.id}>
      <li>
      {post.roastorboast && <h3 key={post.id + 'roastorboast'}>Roast!</h3>}
      {!post.roastorboast && <h3 key={post.id + 'roastorboast'}>Boast!</h3>}
    </li>
    <p key={post.id + 'post'}>{post.post}</p>
    <p key={post.id + 'time'}><Moment format="MM/DD/YYYY HH:mm">{post.time}</Moment></p>
    <div key={post.id + 'upvote-downvote'}><button onClick={() => this.handleUpvote(post.id)}>upvotes:</button> {post.upvotes} <button onClick={() => this.handleDownvote(post.id)}>downvotes:</button> {post.downvotes}</div>
    </ul>
    )})}</ul>
    </>
  )}
  >
  </Route>
  <Route
  exact
  path='/boasts'
  render={()=>(
    <>
    <h1>GhostPost boasts!</h1>
    <ul>{this.state.posts.filter(post => !post.roastorboast).map(post => {
    return (
      <ul key={post.id}>
      <li>
      {post.roastorboast && <h3 key={post.id + 'roastorboast'}>Roast!</h3>}
      {!post.roastorboast && <h3 key={post.id + 'roastorboast'}>Boast!</h3>}
    </li>
    <p key={post.id + 'post'}>{post.post}</p>
    <p key={post.id + 'time'}><Moment format="MM/DD/YYYY HH:mm">{post.time}</Moment></p>
    <div key={post.id + 'upvote-downvote'}><button onClick={() => this.handleUpvote(post.id)}>upvotes:</button> {post.upvotes} <button onClick={() => this.handleDownvote(post.id)}>downvotes:</button> {post.downvotes}</div>
    </ul>
    )})}</ul>
    </>
  )}>
  </Route>
  <Route
  exact
  path='/best'
  render={()=>(
    <>
    <h1>GhostPost best!</h1>
    <ul>{this.state.posts.sort(function(a,b){return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)}).map(post => {
    return (
      <ul key={post.id}>
      <li>
      {post.roastorboast && <h3 key={post.id + 'roastorboast'}>Roast!</h3>}
      {!post.roastorboast && <h3 key={post.id + 'roastorboast'}>Boast!</h3>}
    </li>
    <p key={post.id + 'post'}>{post.post}</p>
    <p key={post.id + 'time'}><Moment format="MM/DD/YYYY HH:mm">{post.time}</Moment></p>
    <div key={post.id + 'upvote-downvote'}><button onClick={() => this.handleUpvote(post.id)}>upvotes:</button> {post.upvotes} <button onClick={() => this.handleDownvote(post.id)}>downvotes:</button> {post.downvotes}</div>
    </ul>
    )})}</ul>
    </>
  )}>
  </Route>
  <Route
  exact
  path='/create'>
    <h1>Create a post!</h1>
    <CreatePost>
    </CreatePost>
  </Route>
  </>
  )};
}

export default App;