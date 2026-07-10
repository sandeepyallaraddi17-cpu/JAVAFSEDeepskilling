import React,{Component} from 'react';

class EventExamples extends Component{

    constructor(props){
        super(props);

        this.state={
            count:0
        };
    }

    increment=()=>{
        this.setState({
            count:this.state.count+1
        });
    }

    decrement=()=>{
        this.setState({
            count:this.state.count-1
        });
    }

    sayHello=()=>{
        alert("Hello! Member");
    }

    handleIncrement=()=>{
        this.increment();
        this.sayHello();
    }

    sayWelcome=(message)=>{
        alert(message);
    }

    handleClick=(e)=>{
        alert("I was clicked");
    }

    render(){
        return(
            <div>

                <h2>Event Examples</h2>

                <h3>Counter : {this.state.count}</h3>

                <button onClick={this.handleIncrement}>
                    Increment
                </button>

                <button onClick={this.decrement}>
                    Decrement
                </button>

                <br/><br/>

                <button onClick={()=>this.sayWelcome("Welcome")}>
                    Say Welcome
                </button>

                <br/><br/>

                <button onClick={this.handleClick}>
                    OnPress
                </button>

            </div>
        );
    }
}

export default EventExamples;