import './App.css';

function App(){

    const officeImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600";

    const office={
        Name:"DBS",
        Rent:50000,
        Address:"Chennai"
    };

    const officeList=[
        {
            Name:"DBS",
            Rent:50000,
            Address:"Chennai"
        },
        {
            Name:"Regus",
            Rent:75000,
            Address:"Bangalore"
        },
        {
            Name:"WeWork",
            Rent:65000,
            Address:"Hyderabad"
        }
    ];

    return(
        <div className="App">

            <h1>Office Space Rental App</h1>

            <img
                src={officeImage}
                alt="Office Space"
                width="400"
                height="250"
            />

            <h2>Featured Office</h2>

            <p><b>Name:</b> {office.Name}</p>

            <p style={{color:office.Rent<60000?'red':'green'}}>
                <b>Rent:</b> Rs. {office.Rent}
            </p>

            <p><b>Address:</b> {office.Address}</p>

            <hr/>

            <h2>Available Office Spaces</h2>

            {
                officeList.map((item,index)=>(
                    <div key={index} className="office">

                        <p><b>Name:</b> {item.Name}</p>

                        <p style={{color:item.Rent<60000?'red':'green'}}>
                            <b>Rent:</b> Rs. {item.Rent}
                        </p>

                        <p><b>Address:</b> {item.Address}</p>

                        <hr/>

                    </div>
                ))
            }

        </div>
    );
}

export default App;