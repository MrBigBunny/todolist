import React, { Component } from "react";
import { TodoForm } from "./TodoForm";
import Todo from "./Todo";



/*
TodoMVC
1.add todo
2. display todos
3. cross off todo
4. show number of active todos
5. filter all/active/complete
6. delete todo
7. delete all complete
    7.1 only show if atleast one is complete
8. button to toggle all on/off
*/

export class TodoList extends Component{
    state = {
        todos: [],
        todosToShow: "all", 
        toggleAllComplete: true
    };

    //add todo in todos array
    addTodo = (todo) => {
        this.setState(state => ({
            //adding a new value in the array then copy the current state
            todos: [todo, ...state.todos]
        }));
    };
    toggleComplete = (id) => {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                
                if (todo.id === id) {
                    //suppose to update
                    return {
                        // id: todo.id,
                        // text: todo.text,
                        ...todo,
                        complete: !todo.complete
                    };
                } else {
                    return todo;
                }
            })
        }));
    };

    updateTodoToShow = (s) => {
        this.setState({
            todosToShow: s
        });
    };

    handleDeleteTodo = (id) => {
        this.setState(state => ({
           todos: state.todos.filter(todo => todo.id !== id) 
        }));
    };

    removeAllTodoThatAreComplete = () => {
        this.setState(state => ({
           todos: state.todos.filter(todo => !todo.complete) 
        }));
    };
    render(){
        let todos = [];

        if (this.state.todosToShow === 'all'){
            todos = this.state.todos;
        }
        else if (this.state.todosToShow === 'active') {
            todos = this.state.todos.filter (todo => !todo.complete);
        }
        else if (this.state.todosToShow === 'complete') {
            todos = this.state.todos.filter (todo => todo.complete);
        }
        return(
            <div>
                {/* passing it as a prop */}
               <TodoForm onSubmit = {this.addTodo} />
               {todos.map(todo => (
               <Todo 
               key={todo.id} 
               toggleComplete={() => this.toggleComplete(todo.id)}
                onDelete={() => this.handleDeleteTodo(todo.id)}
               todo={todo} />
               ))}
               {/* {JSON.stringify(this.state.todos)} */}
               <div> todos left: {this.state.todos.filter (todo => !todo.complete).length}</div>
               <div>
                   <button onClick={() => this.updateTodoToShow('all')}>all</button>
                   <button onClick={() => this.updateTodoToShow('active')}>active</button>
                   <button onClick={() => this.updateTodoToShow('complete')}>complete</button>
               </div>
               {/* only show up when you have a list of complete / you have complete */}
               {this.state.todos.some(todo => todo.complete) ? 
               (<div><button onClick={this.removeAllTodoThatAreComplete}>Remove all complete todos</button></div>) : null}
               {/* if you to display something/ string you can use this -> {`${this.state.toggleAllComplete}`<- and if will display true/ current state} */}
               <div>
                   <button
                   onClick={()=>
                    //if without the function we call it 'passing an object'
                    //you can also pass a function to the setState/ arrowfunction
                    // and the first parameter in the function is the state/() -> (state)
                    // so that instead we write it (this.state.map) -> we can just use the state that is passed as a parameter -> (state.map)
                    // this.setState is asynchronus this will give you the correct value of the state
                   this.setState( state=> ({
                       todos: state.todos.map(todo => ({
                           ...todo,
                           complete: state.toggleAllComplete
                       })),
                       //toggleAllComplete is equal to inverse of it/ kabaliktaran
                       toggleAllComplete: !state.toggleAllComplete
                   }))
                   }>
                       toggle all complete: {`${this.state.toggleAllComplete}`}
                    </button>
                </div>
            </div>
        )
    }
}