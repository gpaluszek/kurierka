import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {EmployeeIcon, CheckpointFlag, RoutesIcon, PlaneTicket, DeliveryCar, Communique} from "../common/icons/icons.jsx";

const Main = () => {
  const { user } = useSelector((state) => state.auth);

  // Statystyki
  const [numberOfRoutes, setNumberOfRoutes] = useState(0);
  const [numberOfPoints, setNumberOfPoints] = useState(0);
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);

  // Pobieranie statystyk
  const getStatistics = async () => {
    try {
      const responseRoutes = await axios.get('http://localhost:5000/countRoutes');
      const responseCheckpoints = await axios.get('http://localhost:5000/countCheckpoints');
      const responseEmployees = await axios.get('http://localhost:5000/countEmployees');

      setNumberOfRoutes(responseRoutes.data.numberOfRoutes);
      setNumberOfPoints(responseCheckpoints.data.numberOfCheckpoints);
      setNumberOfEmployees(responseEmployees.data.numberOfEmployees);
    } catch (error) {
      console.error('Błąd podczas pobierania statystyk:', error);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className='main-container'>
     
      <div className='main-communique'>
            <div className='main-communique-container'>
                <div className="communique-map">
                  <div className="communique-map-left">
                    <Communique />
                  </div>
                  <div className='communique-map-right'>
                    Szanowni Pracownicy,
                    <br />
                    Chcieliśmy Was poinformować o nowym użytkowniku, który został dodany do naszego systemu. Prosimy o przyjęcie go serdecznie i udzielanie pomocy w razie potrzeby. 
                  </div>
                </div>
                <div className="communique-map">
                  <div className="communique-map-left">
                    <Communique />
                  </div>
                  <div className='communique-map-right'>
                    Szanowni Pracownicy,
                    <br />
                    Z przyjemnością ogłaszamy nowy etap w naszej firmie! Chcielibyśmy Was zaprosić na nadchodzące wydarzenie integracyjne, które odbędzie się 03.09.2023 w Dobczyce. To będzie doskonała okazja do wspólnego spędzenia czasu, nawiązania relacji i wzmocnienia więzi w naszym zespole.
                     </div>
                </div>

            </div>
       </div>
     
      <div className='main-boxs-stats'>
        <div className="main-box box-color-blue">
         <RoutesIcon className="box-icon"/> <span className='name-text'>Liczba tras</span>  <span className='number-text'>{numberOfRoutes}</span> 
        </div>
        <div className="main-box box-color-red">
         <CheckpointFlag className="box-icon"/> <span className='name-text'>Liczba punktów</span>  <span className='number-text'>  {numberOfPoints}</span>
        </div>
        <div className="main-box box-color-green">
         <EmployeeIcon className="box-icon"/>  <span className='name-text'> Liczba pracowników</span>  <span className='number-text'> {numberOfEmployees}</span>
        </div>
        <div className="main-box box-color-purple">
          <PlaneTicket className="box-icon"/> <span className='name-text'> Liczba Urlopów</span>  <span className='number-text'> 0</span>
        </div>
        <div className="main-box box-color-orange">
         <DeliveryCar className="box-icon"/> <span className='name-text'> Liczba Samochodów</span>  <span className='number-text'>25</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
