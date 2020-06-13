import React from 'react';
import ReactDOM from 'react-dom';


export default (props) => {
    const [dadJokeData, setDadJokeData] = React.useState(props.newData);
    const [resetForm, resetDadJokeData] = React.useState(props.blank);

    React.useEffect(() =>{
        setDadJokeData(props.newData);
    }, [props.newData]);

    const handleChange = (event) =>{
        console.log("HandleChange Event", event);
        setDadJokeData({ ...dadJokeData, [event.target.name]: event.target.value})
    }

    return (
        <>
        <div className="form">
            <span>Joke:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input
            type="text"
            name="setup"
            value={dadJokeData.setup}
            onChange={handleChange}
            /><br/>
            <span>Answer:&nbsp;</span>
            <input
            type="text"
            name="punchline"
            value={dadJokeData.punchline}
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