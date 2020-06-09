import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './css/style.css';

const App = (props) => {
    const [dadJokes, setDadJokes] = React.useState(null);
    const [showEditOrCreate, setShowEditOrCreate] = React.useState(false);
    const baseURL = 'http://localhost:3000/dadjokes';

    const getInfo = async() =>{
        const response = await fetch(`${baseURL}/index`);
        const result = await response.json();
        setDadJokes(result);
    }

    React.useEffect(() => {
        getInfo()
    },[]);

    return (
        <>
            {
                dadJokes ? 
                dadJokes.map((dadJoke, index) => {
                    return(
                        <div key={dadJoke._id}>
                        	<h1>{dadJoke.joke}</h1>
                        </div>
                    )
                })
                : "...Loading"
            }
            <Footer />
        </>
    );
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);
