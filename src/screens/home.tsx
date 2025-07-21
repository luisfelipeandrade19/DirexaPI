import { useState, useEffect } from "react";
import ButtonForm from "../components/buttonForm";
import Map from "../components/map";
import "./css/home.css";
import { supabase } from "../supaBaseClient"; // Importe o cliente Supabase

type CheckIn = {
  id: number;
  lat: number;
  lng: number;
  timestamp: string; // O banco de dados retorna o timestamp como string
};

function Home() {
    const time = "08:30";
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

    // Carrega check-ins do SERVIDOR ao iniciar e a cada 5 segundos
    useEffect(() => {
        const loadCheckInsFromServer = async () => {
            try {
                // Busca os dados da tabela 'checkins' no Supabase
                const { data, error } = await supabase
                    .from('checkins')
                    .select('*')
                    .order('timestamp', { ascending: false }) // Opcional: pega os mais recentes primeiro
                    .limit(100); // Limita a 100 resultados

                if (error) {
                    throw error;
                }
                
                if (data) {
                    setCheckIns(data);
                }
            } catch (error) {
                console.error("Erro ao carregar check-ins do servidor:", error);
            }
        };
        
        loadCheckInsFromServer();
        const interval = setInterval(loadCheckInsFromServer, 5000); // Atualiza a cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    const handleCheckIn = () => {
        const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const checkInData = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    timestamp: new Date().toISOString(), // Usa o formato de data padrão do SQL
                };

                // Insere o novo check-in na tabela 'checkins' do Supabase
                const { error } = await supabase.from('checkins').insert([checkInData]);

                if (error) {
                    console.error("Erro ao salvar check-in:", error);
                    alert("Não foi possível salvar seu check-in. Tente novamente.");
                } else {
                    alert(`Check-in realizado com sucesso!`);
                    // A atualização automática já vai buscar o novo check-in.
                }
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                alert("Não foi possível obter sua localização.");
            },
            options
        );
    };
    return(
        <>
            <div className="homePage container" >
                <aside className="left" id="map">
                    <Map checkIns={checkIns}/>
                    <ButtonForm id="checkInButtom" value="Fazer Check-In" onClick={handleCheckIn} />
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