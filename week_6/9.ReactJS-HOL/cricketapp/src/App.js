import {useState} from 'react';
import './App.css';
import {ListofPlayers,Scorebelow70} from './ListofPlayers';
import ListofIndianPlayers,{OddPlayers,EvenPlayers,IndianTeam,IndianPlayers} from './IndianPlayers';

function App(){

    const [flag,setFlag]=useState(true);

    return(
        <div style={{padding:'20px'}}>

            <label><b>Select Output : </b></label>

            <select
                value={flag?"true":"false"}
                onChange={(e)=>setFlag(e.target.value==="true")}
            >
                <option value="true">true</option>
                <option value="false">false</option>
            </select>

            <hr/>

            {flag?(
                <div>
                    <h1>List of Players</h1>
                    <ListofPlayers/>
                    <hr/>
                    <h1>List of Players having Scores Less than 70</h1>
                    <Scorebelow70/>
                </div>
            ):(
                <div>
                    <h1>Indian Team</h1>

                    <h2>Odd Players</h2>
                    <OddPlayers team={IndianTeam}/>

                    <hr/>

                    <h2>Even Players</h2>
                    <EvenPlayers team={IndianTeam}/>

                    <hr/>

                    <h2>List of Indian Players Merged</h2>
                    <ListofIndianPlayers players={IndianPlayers}/>
                </div>
            )}
        </div>
    );
}

export default App;