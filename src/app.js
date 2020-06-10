import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import New from './components/New.js';
import Edit from './components/Edit.js';
import './css/style.css';

const App = (props) => {
    const [dadJokes, setDadJokes] = React.useState(null);
    const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    const blank = {id:'', joke: ''}
    const [edit, setEdit] = React.useState(blank);

    const baseURL = 'http://localhost:3000/dadjokes';

    const getInfo = async() =>{
        const response = await fetch(`${baseURL}/index`);
        const result = await response.json();
        setDadJokes(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    const handleCreate = async (data) => {
        const response = await fetch(`${baseURL}/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        getInfo();
    }

    const handleRandomJoke = () => {
        axios
        .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', {
          headers: { Accept: 'application/json' }
        })
        .then(response => {
            handleCreate({joke: response.data.setup + " " + response.data.punchline});
            getInfo();
        });
      }

    const handleEdit = async (data) => {
        const response = await fetch(
            `${baseURL}/update/${data._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        getInfo();
        setShowEditOrCreate(!showEditOrCreate);
    };

    const handleDelete = async (data) =>{
        const respone = await fetch(
            `${baseURL}/delete/${data._id}`,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            }
        )
        getInfo();
    }

    const handleSelect = async (joke) =>{
        setEdit(joke);
    };

    return (
        <>
            {/**
             * This toggles to either show the create functionality or show the edit functionality
             */}
            {
            !showEditOrCreate 
            && 
            <div>
                <h3>Add A Dad joke</h3>
                <New newData={blank} handleSubmit = {handleCreate} handleRandomJoke = {handleRandomJoke}/>
            </div>
            }
            {/**
             * This toggles to either show the create functionality or show the edit functionality
             */}
            {
            showEditOrCreate 
            && 
            <div>
                <Edit editData={edit} handleSubmit={handleEdit} resetForm={blank}/>
            </div>
            }
            <hr/>
            {
                dadJokes ? 
                dadJokes.map((dadJoke, index) => {
                    return(
                        <div key={dadJoke._id}>
                        	<h1>{dadJoke.joke}</h1>
                            <button
                                    onClick={() =>{
                                        handleSelect(dadJoke);
                                        setShowEditOrCreate(!showEditOrCreate);
                                    }}
                                >Edit
                            </button>
                            <button
                                onClick={() =>{
                                    handleDelete(dadJoke);
                                }}
                                >Delete</button>

                        </div>
                    )
                })
                : "...Loading"
            }
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
