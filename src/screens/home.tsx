import { useState, useEffect } from "react";
import ButtonForm from "../components/ui/buttonForm";
import Map from "../features/map/components/map";
import "./css/home.css";
import { supabase } from "../lib/api/supaBaseClient";

type CheckIn = {
  id: number;
  lat: number;
  lng: number;
  timestamp: string; 
};

function Home() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [currentStopId, setCurrentStopId] = useState<number | null>(1);
  const [busPosition, setBusPosition] = useState<{lat: number, lng: number} | null>(null)

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
          if(data.length > 0) {
            setBusPosition({lat: data[0].lat, lng: data[0].lng})
          }
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

  const updateCurrentStop = (stopId: number) => {
    setCurrentStopId(stopId)
  }

  return (
    <>
      <div className="homePage container">
        <aside className="left" id="map">
          <Map 
            checkIns={checkIns} 
            busPosition={busPosition}
            onStopChange={updateCurrentStop}
          />
          <ButtonForm
            id="checkInButtom"
            value="Fazer Check-In"
            onClick={handleCheckIn}
          />
        </aside>
        <aside className="right" id="routes">
          <h1 id="title">Paradas</h1>
          <ol className="stopList">
            <li className={`stop ${currentStopId === 1 ? 'active' : ''}`}>
              <h1>Cosmos</h1>
            </li>
            <li className={`stop ${currentStopId === 4 ? 'active' : ''}`}>
              <h1>Praça Matriz</h1>
            </li>
            <li className={`stop ${currentStopId === 2 ? 'active' : ''}`}>
              <h1>Praça Pirulitos</h1>
            </li>
            <li className={`stop ${currentStopId === 3 ? 'active' : ''}`}>
              <h1>Policlínica</h1>
            </li>
            <li className={`stop ${currentStopId === 5 ? 'active' : ''}`}>
              <h1>Mercadinho D.</h1>
            </li>
            <li className={`stop ${currentStopId === 6 ? 'active' : ''}`}>
              <h1>Restaurante S.T</h1>
            </li>
          </ol>
        </aside>
      </div>
    </>
  );
}


export default Home;
