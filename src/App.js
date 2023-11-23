import React, { useEffect, useState } from "react";
import Notes from "./components/Notes";
import NotesContent from "./components/NotesContent";
import NotesGroup from "./components/NotesGroup";
import styles from './components/Styles.module.css'


function App() {
  const [isNotes, setIsNotes] = useState(false);
  const [selectedGroupData, setSelectedGroupData] = useState(null);
  const [getData,setGetData]=useState(null)

  const updateNotes = (groupData) => {
    setIsNotes(true);
    setSelectedGroupData(groupData);
  };

  const handleGroupData=(data)=>{
    
  
    setGetData(data); 
   
  
  }
  

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" >
             <NotesGroup  setIsNotes={updateNotes} handleGroupData={handleGroupData} getData={getData} />
          </div>
          <div className="col-md-9">
            {isNotes ? (
              <NotesContent handleGroupData={handleGroupData}  getData={getData}  />
            ) : (
              <Notes/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
