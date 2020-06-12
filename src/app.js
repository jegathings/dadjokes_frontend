import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import New from './components/New.js';
import Edit from './components/Edit.js';
import './css/style.css';

const App = (props) => {
    const [dadJokes, setDadJokes] = React.useState(null);
    const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    const blank = {id:'', setup: '', punchline: ''}
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
            handleCreate({setup: response.data.setup});
            getInfo();
        });
      }

      const handleRandomPunchline = () => {
        axios
        .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', {
          headers: { Accept: 'application/json' }
        })
        .then(response => {
            handleCreate({punchline: response.data.punchline});
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
                <New newData={blank} handleSubmit = {handleCreate} handleRandomJoke = {handleRandomJoke}
                handleRandomPunchline = {handleRandomPunchline} />
            </div>
            <hr/>
            {
                dadJokes ? 
                dadJokes.map((dadJoke, index) => {
                    return(
                        <div key={dadJoke._id}>
                        	<h3>{dadJoke.setup}</h3>
                            <h3 className="w3-animate-right">{dadJoke.punchline}</h3>
                            <div className="dad_joke_row">
                                <Edit editData={dadJoke} handleSubmit={handleEdit}/>
                                <button
                                    onClick={() =>{
                                        handleDelete(dadJoke);
                                    }}
                                    >Delete</button>
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
