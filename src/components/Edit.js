import React, { useRef } from "react";


export default (props) => {
const [dadJokeData, setDadJokeData] = React.useState(props.editData);
const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    
React.useEffect(() =>{
setDadJokeData(props.editData);
}, [props.editData]);
    
const handleChange = (event) =>{
setDadJokeData({ ...dadJokeData, [event.target.name]: event.target.value})
}

function handleClick() {
setShowEditOrCreate(!showEditOrCreate);
}

    return (
        <div className="buttons">
            <input
                type="button"
                value="Edit"
                onClick={handleClick}
            />
            {
            showEditOrCreate
            &&
            <div>
            <input
                type="text"
                name="setup"
                value={dadJokeData.setup}
                onChange={handleChange}
                placeholder="Old McDonald Had A Farm"
            />
            <input
                type="text"
                name="punchline"
                value={dadJokeData.punchline}
                onChange={handleChange}
                placeholder="And On His Farm..."
            />
            <button
                onClick={() =>{
                    setShowEditOrCreate(!showEditOrCreate);
                    props.handleSubmit(dadJokeData);
                }}
             >Submit</button>
             </div>
            }
        </div>
        );
    };