import React, { Component } from "react";
import shortid from 'shortid';


export class TodoForm extends Component{
    state = {
        text: ""
    };

    handleChange = (event) => {
        const isCheck = event.target.type === 'checkbox';
        this.setState({
            [event.target.name]: isCheck ? event.target.checked : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        //submit the form
        //calling the props in the parent
        this.props.onSubmit({
            //whenever we want to map in array of values or display an array
            //not using index rather create a ID for it (using library short ID)
            id: shortid.generate(),
            text: this.state.text,
            complete: false,

        });
        this.setState({
            text: ""
        });

    }

    render(){
        console.log(this.state.text)
        return(
            <form  onSubmit={this.handleSubmit}>
                <input
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                placeholder="todo..."/>

                <button onClick={this.handleSubmit}> ADD TODO</button>
            </form>
        )
    }
}