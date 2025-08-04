import { useState, useEffect } from "react";
import ButtonForm from "../components/ui/buttonForm";
import Map from "../features/map/components/map";
import "./css/home.css";
import { supabase } from "../lib/api/supaBaseClient"; // Importe o cliente Supabase

type CheckIn = {
  id: number;
  lat: number;
  lng: number;
  timestamp: string; 
};

function Home() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  useEffect(() => {
    const loadCheckInsFromServer = async () => {
      try {
        const { data, error } = await supabase
          .from("checkins")
          .select("*")
          .order("timestamp", { ascending: false }) 
          .limit(100); 

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
    const interval = setInterval(loadCheckInsFromServer, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = () => {
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const checkInData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        const { error } = await supabase.from("checkins").insert([checkInData]);

        if (error) {
          console.error("Erro ao salvar check-in:", error);
          alert("Não foi possível salvar seu check-in. Tente novamente.");
        } else {
          alert(`Check-in realizado com sucesso!`);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert("Não foi possível obter sua localização.");
      },
      options
    );
  };
  return (
    <>
      <div className="homePage container">
        <aside className="left" id="map">
          <Map checkIns={checkIns} />
          <ButtonForm
            id="checkInButtom"
            value="Fazer Check-In"
            onClick={handleCheckIn}
          />
        </aside>
        <aside className="right" id="routes">
          <h1 id="title">Paradas</h1>
          <ol className="stopList">
            <li className="stop" id="cosmos">
              <h1>Cosmos</h1>
            </li>
            <li className="stop" id="pracaMatriz">
              <h1>Praca Matriz</h1>
            </li>
            <li className="stop" id="pracaPirulitos">
              <h1>Praca Pirulitos</h1>
            </li>
            <li className="stop" id="policlinica">
              <h1>Policlinica</h1>
            </li>
            <li className="stop" id="mercadinho">
              <h1>Mercadinho D.</h1>
            </li>
            <li className="stop" id="aabb">
              <h1>AABB</h1>
            </li>
          </ol>
        </aside>
      </div>
    </>
  );
}

export default Home;
