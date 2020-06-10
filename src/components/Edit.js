import React from 'react';

export default (props) => {
const [dadJokeData, setDadJokeData] = React.useState(props.editData);

React.useEffect(() =>{
    setDadJokeData(props.editData);
}, [props.editData]);

const handleChange = (event) =>{
    setDadJokeData({ ...dadJokeData, [event.target.name]: event.target.value})
}

return (
        <>
        
        <h3>Edit A Dad Joke</h3>
            <input
            type="text"
            name="joke"
            value={dadJokeData.joke}
            onChange={handleChange}
            placeholder="Old McDonald Had A Farm"
            /><br/>
            <button
                onClick={() =>{
                    props.handleSubmit(dadJokeData);
                }}
                >Submit</button>
        </>
    );
};
