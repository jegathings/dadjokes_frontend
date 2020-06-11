import React from 'react';
import ReactDOM from 'react-dom';


export default (props) => {
    const [dadJokeData, setDadJokeData] = React.useState(props.newData);
    const [resetForm, resetDadJokeData] = React.useState(props.blank);

    React.useEffect(() =>{
        setDadJokeData(props.newData);
    }, [props.newData]);
    const handleChange = (event) =>{
        setDadJokeData({ ...dadJokeData, [event.target.name]: event.target.value})
    }

    return (
        <>
        <div className="form">
            <span>Dad Joke:</span>
            <input
            type="text"
            name="joke"
            value={dadJokeData.joke}
            onChange={handleChange}
            /><br/>
            <span>Answer:</span>
            <input 
            type="text"
            name="answer"
            value={dadJokeData.answer}
            onChange={handleChange}
            /><br/>
            <button
                onClick={() =>{
                    props.handleSubmit(dadJokeData);
                    resetDadJokeData(resetForm);
                }}
                >Submit</button>
            <button
                onClick={() =>{
                    props.handleRandomJoke();
                    resetDadJokeData(resetForm);
                }}
                >Random</button>
        </div>
        </>
    );
};