import React from 'react';


class CreatePost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            post : '',
            roastorboast: false,
            // time: new Date().getTime()
        }
    }
    handlePost = (event) => {
        this.setState({post : event.target.value})
    }

    handleChange = (event) => {
        if (event.target.value === 'roast'){
        this.setState({roastorboast : true})
        }
        else{
            this.setState({roastorboast : false})
        }

    }

    handleSubmit = (event) => {
        const requestOptions = {
            method: "POST",
            headers: 
            { "Content-Type": "application/json"},
            body: JSON.stringify(this.state)
          };
          fetch('http://127.0.0.1:8000/api/roastboast/', requestOptions)
          .then(res => res.json())
          .then(res => console.log(res))
    }

    render() { return(
        <>
        <form>
            <input type='text'
            placeholder = 'type a post'
            value = {this.state.post}
            onChange = {this.handlePost}/>
                <br></br>
            <input type = 'radio' name = 'roastboast' value = 'roast' onChange = {this.handleChange}/>
                <label htmlFor = 'roast'>
                    Roast
                </label>
                <br></br>
            <input type = 'radio' name = 'roastboast' value='boast' onChange = {this.handleChange}/>
            <label htmlFor ='boast'>
                Boast
            </label>
            <br></br>
            <button onClick = {this.handleSubmit}>submit</button>
        </form>
        </>
    ) } 
}

export default CreatePost