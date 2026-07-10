import React,{Component} from 'react';

class CurrencyConvertor extends Component{

    constructor(props){
        super(props);

        this.state={
            rupees:'',
            currency:'Euro',
            result:''
        };
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let convertedValue=0;

        switch(this.state.currency){

            case 'Euro':
                convertedValue=(this.state.rupees/90).toFixed(2);
                break;

            case 'Dollar':
                convertedValue=(this.state.rupees/83).toFixed(2);
                break;

            case 'Pound':
                convertedValue=(this.state.rupees/105).toFixed(2);
                break;

            case 'Yen':
                convertedValue=(this.state.rupees/0.57).toFixed(2);
                break;

            default:
                convertedValue=0;
        }

        this.setState({
            result:convertedValue
        });
    }

    render(){

        return(
            <div>

                <h2>Currency Convertor</h2>

                <form onSubmit={this.handleSubmit}>

                    <label>Amount in INR :</label>

                    <input
                        type="number"
                        name="rupees"
                        value={this.state.rupees}
                        onChange={this.handleChange}
                    />

                    <br/><br/>

                    <label>Select Currency :</label>

                    <select
                        name="currency"
                        value={this.state.currency}
                        onChange={this.handleChange}
                    >
                        <option>Euro</option>
                        <option>Dollar</option>
                        <option>Pound</option>
                        <option>Yen</option>
                    </select>

                    <br/><br/>

                    <button type="submit">
                        Convert
                    </button>

                </form>

                <h3>
                    Converted Amount : {this.state.result}{this.state.currency}
                </h3>

            </div>
        );
    }
}

export default CurrencyConvertor;