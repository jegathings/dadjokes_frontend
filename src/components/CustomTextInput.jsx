import React from "react";

class CustomTextInput extends React.Component {
    constructor(props) {
    super(props);
    //const [dadJokeData, setDadJokeData] = React.useState(props.editData);
        
    this.textInput = null;
        
    this.setTextInputRef = element => {
        this.textInput = element;
    };
    
    this.focusTextInput = () => {
        // Focus the text input using the raw DOM API
        // if (this.textInput) this.textInput.focus();
        console.log("Text Input",this);
        if (this.textInput.style.display === "none") {
            this.textInput.style.display = "block";
        } else {
            this.textInput.style.display = "none";
        }
    }
    this.handleChange = (event) =>{
        console.log("Event target", event.target);
        // setDadJokeData({ ...dadJokeData, [event.target.name]: event.target.value})
    }
}
  
componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
}
  
render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
      console.log("CustomTextInput.render()");
      return (
        <div>
          <input
            type="button"
            value={this.props.data.buttonName}
            onClick={this.focusTextInput}
          />
        <div ref={this.setTextInputRef}>  
            <input
            type="text"
            name="joke"
            value={this.props.data.value}
            onChange={this.handleChange}            
            /><br/>
            <button
                onClick={() =>{
                    this.props.handleSubmit(dadJokeData);
                }}
                >Submit</button>
        </div>

          {/* <input
            type="text"
            value={this.props.data.value}
            ref={this.setTextInputRef}
          /> */}
        </div>
      );
    }
  }
  
  module.exports = CustomTextInput;