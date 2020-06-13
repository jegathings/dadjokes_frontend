import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import New from './components/New.js';
import Edit from './components/Edit.js';
import './css/style.css';

const App = (props) => {
    // This version is should be in master branch!!!!
    const [dadJokes, setDadJokes] = React.useState(null);
    const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    const blank = { id: '', setup: '', punchline: '' }
    const [edit, setEdit] = React.useState(blank);

    const baseURL = 'https://not-just-for-dads-jokes.herokuapp.com/dadjokes';

    const getInfo = async () => {
        const response = await fetch(`${baseURL}/index`);
        const result = await response.json();
        setDadJokes(result);
    }

    React.useEffect(() => {
        getInfo()
    }, []);

    const handleCreate = async (setup, punchline) => {
        const response = await fetch(`${baseURL}/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(setup, punchline),
        });
        getInfo();
    }

        const handleRandomJoke = () => {
        axios
            .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', {
                headers: { Accept: 'application/json' }
            })
            .then(response => {
                handleCreate({ setup: response.data.setup, punchline: response.data.punchline });
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

    const handleDelete = async (data) => {
        const respone = await fetch(
            `${baseURL}/delete/${data._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        getInfo();
    }

    const handleSelect = async (setup, punchline) =>{
        setEdit(setup, punchline);
    };

    return (
        <div className="main-content">
        <div className="wrapper">
            <h1>Dad Jokes</h1>
        </div>
        <div className="add-a-joke">
            <h3>Add A Dad joke</h3>
                <New newData={blank} handleSubmit={handleCreate} handleRandomJoke={handleRandomJoke} />
            </div>
            <hr />
            {                
                dadJokes ?
                    dadJokes.map((dadJoke, index) => {
                        return (
                            <div key={dadJoke._id}>
                                <h1 className="typing">{dadJoke.setup}</h1>
                                <h1>{dadJoke.punchline}</h1>
                                <div className="dad_joke_row">
                                    <div className="edit_delete">
                                    <Edit editData={dadJoke} handleSubmit={handleEdit} />
                                    <button onClick={() => { handleDelete(dadJoke); }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : "...Loading"
            }
        </div>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);