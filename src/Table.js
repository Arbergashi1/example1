import React, { Component, useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export const Table = () => {
    const gridRef = useRef();
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country'},
    { field: 'year', pivot: true, enablePivot: true },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
 
  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  const onGridReady = (params) => {
   
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((resp) => {
        
        setRowData(resp);
      });
  };
  
//   const filterBySport = (sport) => {
//     const filteredPeople = rowData.filter((person) => person.sport === sport);
//     setRowData(filteredPeople);
//   };

  const filterBySwimming = () => {
    const filteredPeople = rowData.filter((person) => person.sport === "Swimming");
    setRowData(filteredPeople);
  };

  const filterByGymnastics = () => {
    const filteredPeople = rowData.filter((person) => person.sport === "Gymnastics");
    setRowData(filteredPeople);
  };

  const filterByCCS = () => {
    const filteredPeople = rowData.filter((person) => person.sport === "Cross Country Skiing");
    setRowData(filteredPeople);
  };

  const filterBySpeed = () => {
    const filteredPeople = rowData.filter((person) => person.sport === "Short-Track Speed Skating");
    setRowData(filteredPeople);
  };

  const resetFilters = () => {
    gridRef.current.api.setFilterModel(null);
    gridRef.current.api.onFilterChanged();
  };
  
  return (
    <div style={containerStyle}>
      <button onClick={filterBySwimming}>Swimming</button>
      <button onClick={filterByGymnastics}>Gymnastics</button>
      <button onClick={filterByCCS}>Cross Country Skiing</button>
      <button onClick={filterBySpeed}>Short-Track Speed Skating</button>
      <button onClick={resetFilters}>Reset Filter</button>
      {/* <button onClick={() => filterBySport('Swimming')}>Swimming</button> */}
      {/* <button onClick={() => filterBySport('Gymnastics')}>Gymnastics</button>
      <button onClick={() => filterBySport('Cross Country Skiing')}>Cross Country Skiing</button>
      <button onClick={() => filterBySport('Short-Track Speed Skating')}>Short-Track Speed Skating</button> */}

      <div className="ag-theme-alpine" style={{ height: 1000, width: "100%" }}>
        <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
