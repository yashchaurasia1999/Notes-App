import React, { useState, useEffect } from "react";
import styles from "./Styles.module.css";
import sendData from "../Images/send.png";


export default function ResponsiveComp({ getData }) {

  const [showNotesGroup, setShowNotesGroup] = useState(false);
  const [notesData, setNotesData] = useState("");
  const [bool, setBool] = useState(true);
  const [isContent, setIsContent] = useState(false);
  const [isNotesVisible,setIsNotesVisible]=useState(true);
  let data = localStorage.getItem("Group-Data");
  let d = JSON.parse(data);
  let date = new Date();
  let month = date.getMonth();
//   // alert(d[getData.id].msg.messages)
  useEffect(() => {
    // Use useEffect to check for d[getData.id].msg and display alert once

    if (d && d[getData.id] && d[getData.id].msg) {
      // alert('hi');
      setIsContent(true);
    } else {
      // alert('bye');
      setIsContent(false);
    }
  }, [getData.id]);

  const handleChange = (e) => {
    setNotesData(e.target.value);
  };

  const handleSendData = () => {

    

    if(notesData==="")
    {
      alert('please fill data')
    }
    else
    {
      let data = localStorage.getItem("Group-Data");
      let d = JSON.parse(data);
  
      let messages = d[getData.id].msg ? [...d[getData.id].msg.messages] : [];
      messages.push({
        timestamp: new Date().toString(),
        content: notesData,
      });
  
      d[getData.id].msg = {
        messages: messages,
      };
  
      localStorage.setItem("Group-Data", JSON.stringify(d));
  
      setBool(true);
  
      // alert(d[getData.id].msg.messages[d[getData.id].msg.messages.length - 1].content);
      setNotesData('')
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendData();
    }
  };
  const handleBackButton=()=>{
    setShowNotesGroup(true);
  }

 
//   useEffect(() => {
//     if (window.innerWidth <= 350) {
//       setIsNotesVisible(false); // Update to setIsNotesVisible(false)
//     }
//   }, []);


  return (
    <>
    {/* {getData.name.substring(0, 2).toUpperCase()} */}
      {<div className={styles.responsiveNotes}>
        <div className={styles.notesNav}>
        <div
            className={styles.logo}
            style={{ background: `${getData.color}` }}
          >
            {getData.name.substring(0, 2).toUpperCase()}
          </div>
          <div className={styles.groupName}>{getData.name}</div>
        </div>
        <div className={styles.notesContentResp}>
        <div className="container">
          {isContent &&
            d &&
            d[getData.id] &&
            d[getData.id].msg &&
            d[getData.id].msg.messages.map((message, idx) => (
             
                <div className="row" style={{margin:'10px -5px 10px -5px' ,display:"flex"}}>
                  <div className="col-md-2" >
                  <span className={styles.spand} >{message.timestamp.substring(16,21)} {'  '}{message.timestamp.substring(16,18)>=12 ?'PM' : 'AM'}</span><br/>
                  <span className={styles.time}>{message.timestamp.substring(8,10)}{'  '}{message.timestamp.substring(4,7)}{'  '}{message.timestamp.substring(10,15)}</span>
                  </div>
                  <div className="col-md-10">
                    <p style={{fontSize:'15px'}}>{message.content}</p>
                  </div>
                </div>
            ))}
            </div>
          
         
        </div>
        
        <div className={styles.notesInputResp}>
          <div className={styles.inputResp}>
            <textarea
              className={styles.inputAreaResp}
              value={notesData}
              onChange={(e) => handleChange(e)}
              onKeyPress={handleKeyPress} 
              rows="6"
              cols="36"
              placeholder="Enter Your Text Here........."
            />
            <img style={{marginTop:'120px',marginLeft:'300px'}} src={sendData} onClick={handleSendData} />
          </div>
        </div>
      </div>
}
    {/* <h1>Hello World</h1> */}
    </>
  );
}
