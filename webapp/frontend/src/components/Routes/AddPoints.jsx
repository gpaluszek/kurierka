import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddPoints = () => {
  const { id } = useParams();
  const [availableCheckpoints, setAvailableCheckpoints] = useState([]);
  const [existingCheckpoints, setExistingCheckpoints] = useState([]);
  const [selectedAvailableCheckpoints, setSelectedAvailableCheckpoints] = useState([]);
  const [selectedExistingCheckpoints, setSelectedExistingCheckpoints] = useState([]);
  const [filter, setFilter] = useState(""); // Dodaj stan filtra
  const navigate = useNavigate();

  // Funkcja do zaznaczania lub odznaczania punktów w stanie
  const toggleAvailableCheckpointSelection = (checkpoint) => {
    setSelectedAvailableCheckpoints((prevSelected) => {
      if (isAvailableCheckpointSelected(checkpoint)) {
        // Jeśli punkt jest już zaznaczony, odznacz go
        return prevSelected.filter((selected) => selected.id !== checkpoint.id);
      } else {
        // W przeciwnym razie zaznacz go
        return [...prevSelected, checkpoint];
      }
    });
  };

  // Funkcja do zaznaczania lub odznaczania punktów w stanie
  const toggleExistingCheckpointSelection = (checkpoint) => {
    setSelectedExistingCheckpoints((prevSelected) => {
      if (isExistingCheckpointSelected(checkpoint)) {
        // Jeśli punkt jest już zaznaczony, odznacz go
        return prevSelected.filter((selected) => selected.id !== checkpoint.id);
      } else {
        // W przeciwnym razie zaznacz go
        return [...prevSelected, checkpoint];
      }
    });
  };

  // Funkcja sprawdzająca, czy punkt jest zaznaczony
  const isAvailableCheckpointSelected = (checkpoint) => {
    return selectedAvailableCheckpoints.some((selected) => selected.id === checkpoint.id);
  };

  // Funkcja sprawdzająca, czy punkt jest zaznaczony
  const isExistingCheckpointSelected = (checkpoint) => {
    return selectedExistingCheckpoints.some((selected) => selected.id === checkpoint.id);
  };

  useEffect(() => {
    const trailId = parseInt(id);

    if (!isNaN(trailId)) {
      // Pobierz dostępne punkty kontrolne (te, które nie są jeszcze dodane do trasy)
      axios.get(`http://localhost:5000/getAllPoints`)
        .then((response) => {
          setAvailableCheckpoints(response.data);
        })
        .catch((error) => {
          console.error("Błąd podczas pobierania dostępnych punktów:", error);
        });

      // Pobierz punkty kontrolne przypisane do trasy
      axios.get(`http://localhost:5000/getExistingCheckpoints/${trailId}`)
        .then((response) => {
          setExistingCheckpoints(response.data);
        })
        .catch((error) => {
          console.error("Błąd podczas pobierania punktów przypisanych do trasy:", error);
        });
    }
  }, [id]);

  const addPointsToTrail = () => {
    const trailId = parseInt(id);
    const checkpointIds = selectedAvailableCheckpoints.map((checkpoint) => checkpoint.id);

    axios
      .post("http://localhost:5000/addCheckpointToTrail", { trailId, checkpointIds })
      .then((response) => {
        console.log(response.data.message);
        // Zaktualizuj listę punktów przypisanych do trasy
        axios.get(`http://localhost:5000/getExistingCheckpoints/${trailId}`)
          .then((response) => {
            setExistingCheckpoints(response.data);
          })
          .catch((error) => {
            console.error("Błąd podczas pobierania punktów przypisanych do trasy:", error);
          });
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania punktów do trasy:", error);
      });
  };

  const removePointsFromTrail = () => {
    const trailId = parseInt(id);
    const checkpointIds = selectedExistingCheckpoints.map((checkpoint) => checkpoint.id);
  
    console.log('Dane do wysłania:', { trailId, checkpointIds });
  
    axios.delete(`http://localhost:5000/removeCheckpointFromTrail/${trailId}`, { data: { checkpointIds } })

      .then((response) => {
        console.log('Dane do wysłania:', { trailId, checkpointIds });
        console.log('Odpowiedź z serwera:', response.data.message);
        // Zaktualizuj listę punktów przypisanych do trasy
        axios
          .get(`http://localhost:5000/getExistingCheckpoints/${trailId}`)
          .then((response) => {
            setExistingCheckpoints(response.data);
          })
          .catch((error) => {
            console.error("Błąd podczas pobierania punktów przypisanych do trasy:", error);
          });
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania punktów z trasy:", error);
      });
  
    // Po usunięciu punktów z trasy odznacz zaznaczone punkty
    setSelectedExistingCheckpoints([]);
  };
  
  const filterCheckpoints = (checkpoints, filterText) => {
    return checkpoints.filter((checkpoint) =>
      checkpoint.checkpointName.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const filteredAvailableCheckpoints = filterCheckpoints(availableCheckpoints, filter);
  const filteredExistingCheckpoints = filterCheckpoints(existingCheckpoints, filter);

  
  
  return (
    <div className="action-router">
    <div className="action-container">
      <div className="action-col-big">
        <h2>Dostępne Punkty Kontrolne</h2>
        <input
          type="text"
          placeholder="Filtruj punkty po nazwie"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {filteredAvailableCheckpoints.map((checkpoint) => (
            <li key={checkpoint.id}>
              <span
                onClick={() => toggleAvailableCheckpointSelection(checkpoint)}
                style={{
                  cursor: "pointer",
                  textDecoration: isAvailableCheckpointSelected(checkpoint) ? "line-through" : "none",
                }}
              >
                {checkpoint.checkpointName}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="action-col-md">
        <button onClick={addPointsToTrail}>Dodaj do trasy</button>
        <button onClick={removePointsFromTrail}>Usuń z trasy</button>
      </div>
      <div className="action-col-big">
        <h2>Punkty Przypisane do Trasy</h2>
        <ul>
          {filteredExistingCheckpoints.map((checkpoint) => (
            <li key={checkpoint.id}>
              <span
                onClick={() => toggleExistingCheckpointSelection(checkpoint)}
                style={{
                  cursor: "pointer",
                  textDecoration: isExistingCheckpointSelected(checkpoint) ? "line-through" : "none",
                }}
              >
                {checkpoint.checkpointName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default AddPoints;
