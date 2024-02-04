import React from "react";

const mapStatusToClassName = (status) => {
    switch (status.toLowerCase()) {
      case 'obecny':
        return 'obecny';
      case 'nieobecny':
        return 'nieobecny';
      case 'oczekuje':
        return 'oczekuje';
      case 'zwolnienie lekarskie':
        return 'l4';
      default:
        return status.toLowerCase();
    }
  };
  
  const TasksForDay = React.memo(({ tasks, error }) => {
    return (
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {tasks && tasks.length > 0 ? (
          tasks.map((worklog) => (
            <div key={worklog.id}>
              {worklog.tasks.map((task) => (
                <div key={task.id}>
                  <div className={mapStatusToClassName(task.status)}> {task.title || 'Brak tytułu'}</div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>{tasks ? "Brak zadań na ten dzień" : "Pobieranie danych..."}</div>
        )}
      </div>
    );
  });
  


  export default TasksForDay;