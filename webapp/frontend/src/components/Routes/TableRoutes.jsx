import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp } from "../../common/icons/icons";
import { NavLink, useNavigate  } from "react-router-dom";
import handleGenerateReport from "./RouteReport";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import {
  HeartFav,
  FsquareIcon,
  QestionCircle, 
} from "../../common/icons/icons.jsx";

const TableRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showAddRouteForm, setShowAddRouteForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newRouteName, setNewRouteName] = useState("");
  const [newRouteDescription, setNewRouteDescription] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const navigate = useNavigate();


  const navigateToAddPoints = (routeId) => {
    navigate(`/routes/addpoints/${routeId}`);
  };
  <handleGenerateReport />;

  useEffect(() => {
    fetchRoutes();
    fetchCategories();
  }, []);

  const handleDeleteRoute = (route) => {
    setRouteToDelete(route);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    if (routeToDelete) {
      try {
        await axios.delete(`http://localhost:5000/deleteTrail/${routeToDelete.id}`);
        fetchRoutes();
        setShowDeleteConfirmation(false);
        setRouteToDelete(null);
      } catch (error) {
        console.error("Błąd podczas usuwania trasy:", error);
      }
    }
  };
  
  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trails");
      const routesData = response.data.map((route) => {
        return {
          id: route.id,
          name: route.name,
          description: route.description,
          categoryId: route.categoryId,
          category: route.category ? route.category.name : "Brak kategorii",
          pointsCount: route.checkpointToTrails.length,
          checkpoints: route.checkpointToTrails.map((ctt) => ctt.checkpoint),
        };
      });
      setRoutes(routesData);
    } catch (error) {
      console.error("Błąd podczas pobierania tras:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getAllCategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
    }
  };

  const handleRowClick = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const toggleAddRouteForm = () => {
    setShowAddRouteForm(!showAddRouteForm);
    setShowAddCategoryForm(false);
    setShowCategoryList(false);
  };

  const toggleAddCategoryForm = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
    setShowAddRouteForm(false);
    setShowCategoryList(false);
  };

  const toggleCategoryList = () => {
    setShowCategoryList(!showCategoryList);
    setShowAddRouteForm(false);
    setShowAddCategoryForm(false);
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/deleteCategory/${selectedCategoryId}`
      );
      fetchCategories();
      setSelectedCategoryId(null); // Czyszczenie po usunięciu
    } catch (error) {
      console.error("Błąd podczas usuwania kategorii:", error);
      console.log("Kod statusu odpowiedzi:", error.response.status);
      console.log("Pełna odpowiedź błędu:", error.response.data);
    }
  };

  const handleSubmitAddRoute = async (event) => {
    event.preventDefault();
    try {
      const categoryIdAsNumber = parseInt(selectedCategoryId, 10);
      const response = await axios.post("http://localhost:5000/addTrail", {
        name: newRouteName,
        description: newRouteDescription,
        categoryId: categoryIdAsNumber,
      });
  
      console.log(response.data); // Możesz wykorzystać tę odpowiedź do obsługi sukcesu
  
      // Zaktualizuj stan tras
      fetchRoutes();
  
      // Zresetuj stan formularza
      setShowAddRouteForm(false); // Schowaj formularz po dodaniu trasy
      setNewRouteName(""); // Wyczyść pole nazwy trasy
      setNewRouteDescription(""); // Wyczyść pole opisu trasy
    } catch (error) {
      console.error("Błąd podczas dodawania trasy:", error);
    }
  };
  

  const handleSubmitAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addCategory", {
        name: newCategoryName,
        description: newCategoryDescription,
      });
      console.log(response.data);
      fetchCategories();
      setShowAddCategoryForm(false);
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error) {
      console.error("Błąd podczas dodawania kategorii:", error);
    }
  };

  return (
    <div  className="main-container"> 
      <div className="table-model-container">
      {showDeleteConfirmation && (
          <div className="confirm-important">
            
            <div className="confirmation-content">
            <h1 className="confirmation-content-h1">Potwierdz działanie</h1>
            
              <p className="confirmation-p">Czy na pewno chcesz usunąć trasę "{routeToDelete?.name}"?</p>
              <div className="confirm-important-button-options">
                <button className="confirm-important-button" onClick={handleDeleteConfirmation}>Usuń</button>
                <button className="confirmation-button-style-cancel" onClick={() => setShowDeleteConfirmation(false)}>Anuluj</button>
              </div>
            </div>
          </div>
        )}











        <div className="table-header-panel">
                  <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/users">Lista Pracowników</NavLink>
        </div>
          <div className="table-header-panel last ">
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1">Lista Pracowników</h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
          
          </div>

        <div className="table-header-panel">
         <p className="model-form-head-info">Na tej stronie znajdziesz spis wszystkich tras dostępnych w Twojej firmie. To narzędzie pozwala na szybkie wyszukiwanie i przeglądanie dostępnych tras oraz szczegółowych informacji o każdej z nich.</p>
        </div>
        <div className="table-header-panel">
          <button className="options-button" onClick={toggleAddRouteForm}>Dodaj trasę</button>
          <button className="options-button" onClick={toggleAddCategoryForm}>Dodaj kategorię</button>
          <button className="options-button" onClick={toggleCategoryList}>Lista kategorii</button>
          <NavLink className="options-button"  to="/addcheckpoint">Dodaj punkt </NavLink>
          <NavLink className="options-button"  to="/addexcel">Dodaj punky przez excel </NavLink>
      


          {showAddRouteForm && (
            <div className="confirmation-popup">
              <div className="confirmation-opacity"></div>
              <div className="confirmation-content">
                <h1 className="confirmation-content-h1">Stwórz nową trasę</h1>
                <p className="confirmation-p">W tym miejscu masz możliwość dodania trasy dla Twoich pracowników. Wystarczy wypełnić przygotowany poniżej formularz, aby wypełnić jeden krok w procesie dodawania.</p>
                <div className="confirmation-top-pop">
                 <HeartFav className="confirmationHeartFav"/> Przygotuj trasę, tworząc kategorie i punkty docelowe, <br /> a następnie połącz wszystko, by uzyskać kompletny plan.
                </div>
                <div className="confirmation-buttons">
                  <form className="confirmation-form" onSubmit={handleSubmitAddRoute}>
                    <label for="form-text-one">
                      Nazwa trasy
                    </label>
                    <input id="form-text-one"
                      className="confirmation-button-style-text"
                      type="text"
                      placeholder="Na przykład: Gazety Miechów 17"
                      value={newRouteName}
                      onChange={(e) => setNewRouteName(e.target.value)}
                    />
                    <label for="form-text-two">
                      Opis trasy
                    </label>
                    <input id="form-text-two"
                      className="confirmation-button-style-text"
                      type="text"
                      placeholder="Na przykład: Trasa miechowska gazety"
                      value={newRouteDescription}
                      onChange={(e) => setNewRouteDescription(e.target.value)}
                    />
                    <label for="form-text-three">
                      Kategoria trasy
                    </label>
                    <select id="form-text-three"
                      className="confirmation-button-style-text"
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                    >
                      <option value={null}>Wybierz kategorię</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <div className="confirm-important-button-options">
                       <button className="confirmation-button-style-submit" type="submit">Zapisz</button>
                       <button className="confirmation-button-style-cancel" type="button" onClick={() => setShowAddRouteForm(false)}>Anuluj</button>
                    </div>
                    </form>
                </div>
              </div>
            </div>
          )}



          {showAddCategoryForm && (
            <div className="confirmation-popup">
              <div className="confirmation-opacity"></div>
              <div className="confirmation-content">
                 <h1 className="confirmation-content-h1">Stwórz nową kategorię</h1>
                W tym miejscu masz możliwość dodania trasy dla Twoich pracowników. Wystarczy wypełnić przygotowany poniżej formularz, aby wypełnić jeden krok w procesie dodawania.
                <p className="confirmation-p">W tym miejscu masz możliwość dodania nowej kategorii dla Twoich tras.<br /> Wypełnij poniższy formularz, aby dodać nową kategorię do kolekcji.</p>
                <div className="confirmation-top-pop">
                  <HeartFav className="confirmationHeartFav"/> Przygotuj trasę, tworząc kategorie i punkty docelowe, <br /> a następnie połącz wszystko, by uzyskać kompletny plan.
                 </div>
                <div className="confirmation-buttons">
                  <form className="confirmation-form" onSubmit={handleSubmitAddCategory}>
                    <label for="form-text-one">
                      Nazwa kategorii
                    </label>
                    <input  id="form-text-one" className="confirmation-button-style-text"
                      type="text"
                      placeholder="Nazwa"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <label for="form-text-one">
                      Opis kategorii
                    </label>
                    <input id="form-text-two"
                      className="confirmation-button-style-text"
                      type="text"
                      placeholder="Opis kategorii"
                      value={newCategoryDescription}
                      onChange={(e) =>
                        setNewCategoryDescription(e.target.value)
                      }
                    />
                    <div className="confirm-important-button-options">
                      <button className="confirmation-button-style-submit" type="submit">Zapisz</button>
                      <button className="confirmation-button-style-cancel" type="button" onClick={() => setShowAddCategoryForm(false)}>Anuluj</button>
                   </div>
                  </form>
                </div>
              </div>
            </div>
          )}







          {showCategoryList && (
            <div className="confirmation-popup">
              <div className="confirmation-opacity"></div>
              <div className="confirmation-content">
                <h1 className="confirmation-content-h1">Stwórz nową trasę</h1>
                <p className="confirmation-p">W tym miejscu masz możliwość dodania trasy dla Twoich pracowników. <br />Wystarczy wypełnić przygotowany poniżej formularz, aby wypełnić jeden krok w procesie dodawania.</p>
                <div className="confirmation-top-pop">
                  <HeartFav className="confirmationHeartFav"/> Przygotuj trasę, tworząc kategorie i punkty docelowe, <br /> a następnie połącz wszystko, by uzyskać kompletny plan.
                </div>
                <div className="confirmation-buttons">
                  <ul className="confirmation-important-ul">
                    {categories.map((category) => (
                      <li className="confirmation-important-li" key={category.id}>
                        <ol className="confirmation-important-ol">
                          <li className="confirmation-important-li-under">{category.name}</li>
                          <li className="confirmation-important-li-under-import">
                            <button
                              className="confirmation-button-style-delete"
                              onClick={() => setSelectedCategoryId(category.id)}
                            >
                              Usuń
                            </button>
                          </li>
                        </ol>
                      </li>
                    ))}
                    {selectedCategoryId && (
                      <div className="confirm-important">
                        <h1 className="confirmation-content-h1">Potwierdz działanie</h1>
                        <p className="confirmation-p">Czy na pewno chcesz usunąć tę kategorię?</p>
                        <div className="confirm-important-button-options">
                          <button className="confirm-important-button" onClick={handleDeleteCategory} > Potwierdź usunięcie
                          </button>
                          <button className="confirmation-button-style-cancel" type="button" onClick={() => setSelectedCategoryId(null)}> Anuluj
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                  <div className="confirmation-button-style-div">
                    <button className="confirmation-button-style-cancel" onClick={() => setShowCategoryList(false)}>
                      Wyjdź
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}



        </div>
        <table className="table-main-content">
          <thead>
            <tr className="table-main-tr">
              <th>Nazwa Trasy</th>
              <th>Opis</th>
              <th>Ilość punktów</th>
              <th>Kategoria</th>
              <th className="table-column-setting flex-left">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <React.Fragment key={route.id}>
                <tr className="table-main-tr" onClick={() => handleRowClick(index)}>
                  <td className="table-main-td">{route.name}</td>
                  <td className="table-main-td">{route.description}</td>
                  <td className="table-main-td">{route.pointsCount}</td>
                  <td className="table-main-td">{route.category || "Brak kategorii"}</td>
                  <td className="table-main-td table-main-setting setting-routes">
                  <button className="table-main-setting-grey" onClick={() => navigateToAddPoints(route.id)}>Dodaj punkty</button>
                    <button className="table-main-setting-grey" onClick={() => handleGenerateReport(route)}>Raport PDF</button>
                    <button className="confirmation-button-style-delete" onClick={() => handleDeleteRoute(route)}>Usuń trasę</button>
                    <button className="button-table">
                      {expandedRows.includes(index) ? (
                        <ArrowUp className="employee-icon" />
                      ) : (
                        <ArrowDown className="employee-icon" />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr>
                    <td colSpan="5">
                      <div className="expanded-content">
                        <p>Dodatkowe informacje o trasie: {route.name}</p>
                        <p>Opis: {route.description}</p>
                        <p>Punkty trasy:</p>
                        <ul>
                          {route.checkpoints.map(
                            (checkpoint, checkpointIndex) => (
                              <li key={checkpoint.id}>
                                {`Punkt ${checkpointIndex + 1}: ${
                                  checkpoint.checkpointName
                                }`}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      Na tej stronie znajdziesz spis wszystkich tras dostępnych w Twojej firmie. To narzędzie pozwala na szybkie wyszukiwanie i przeglądanie dostępnych tras oraz szczegółowych informacji o każdej z nich.
      </Tooltip>
    </div>
  );
};

export default TableRoutes;
