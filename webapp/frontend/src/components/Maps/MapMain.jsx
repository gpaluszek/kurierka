import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapMain = () => {
  useEffect(() => {
    const mymap = L.map('mapid').setView([50.05731490869215, 19.93275450565386], 13);
    L.tileLayer('https://tile.jawg.io/19139c34-87db-4e2e-b5d1-64d92c19214a/{z}/{x}/{y}{r}.png?access-token=luaentF6DXSGMZm5iNpij8QLlekuNq4dYmN7yXrevWObsrob4TcnVO3jcmS0xpps', {}).addTo(mymap);
    mymap.attributionControl.addAttribution('<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors');

    return () => {
      mymap.remove();
    };
  }, []); // Pusta tablica zależności, żeby useEffect wykonało się tylko raz

  return <div id="mapid" style={{ width: '100%', height: '1080px' }} />;
};

export default MapMain;
