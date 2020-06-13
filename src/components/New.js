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
            <div className="setup_row_punchline_row">
            <span>Setup:</span>
            <input
            type="text"
            name="setup"
            value={dadJokeData.setup}
            onChange={handleChange}
            /><br/>
            <span>Punchline:</span>
            <input
            type="text"
            name="punchline"
            value={dadJokeData.punchline}
            onChange={handleChange}
            />
            </div><br/>
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