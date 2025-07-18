
import ButtonForm from "../components/buttonForm"
import Map from "../components/map"
import "./css/home.css"


function Home(){

    const time = "08:30"
    return(
        <>
            <div className="homePage container" >
                <aside className="left" id="map">
                    <Map />
                    <ButtonForm id="checkInButtom" value="Fazer Check-In"  />
                </aside>
                <aside className="right" id="routes">
                    <h1 id="title">Paradas</h1>
                    <ol className="stopList">
                        <li className="stop" id="cosmos">
                            <h1>Cosmos</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                        <li className="stop" id="pracaMatriz">
                            <h1>Praca Matriz</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                        <li className="stop" id="pracaPirulitos">
                            <h1>Praca Pirulitos</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                        <li className="stop" id="policlinica">
                            <h1>Policlinica</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                        <li className="stop" id="mercadinho">
                            <h1>Mercadinho D.</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                        <li className="stop" id="aabb">
                            <h1>AABB</h1>
                            <p>Horario medio de chegada: {time}</p>
                        </li>
                    </ol>
                </aside>
            </div>
        </>
    )
}

export default Home