import React, { useState, useEffect } from "react";
import styles from "./Styles.module.css";
import sendData from "../Images/send.png";
export default function NotesContent({ getData }) {
 
  const [notesData, setNotesData] = useState("");
  const [bool, setBool] = useState(true);
  const [isContent, setIsContent] = useState(false);
  const [isNotesVisible,setIsNotesVisible]=useState(true);
  let data = localStorage.getItem("Group-Data");
  let d = JSON.parse(data);
  let date = new Date();
  let month = date.getMonth();
  // alert(d[getData.id].msg.messages)
  useEffect(() => {
    // Use useEffect to check for d[getData.id].msg and display alert once

    if (d && d[getData.id] && d[getData.id].msg) {
      // alert('hi');
      setIsContent(true);
    } else {
      // alert('bye');
    }
  }, [d, getData.id]);

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
  useEffect(() => {
    if (window.innerWidth <= 350) {
      setIsNotesVisible(false); // Update to setIsNotesVisible(false)
    }
  }, []);


  return (
    <>
      {isNotesVisible && <div className={`notesContent ${styles.notesContent}`}>
        <div className={styles.notesNav}>
          <div
            className={styles.logo}
            style={{ background: `${getData.color}` }}
          >
            {getData.name.substring(0, 2).toUpperCase()}
          </div>
          <div className={styles.groupName}>{getData.name}</div>
        </div>
        <div className={styles.notesContent} style={{overflowY:'scroll'}}>
        <div className="container">
          {isContent &&
            d &&
            d[getData.id] &&
            d[getData.id].msg &&
            d[getData.id].msg.messages.map((message, idx) => (
             
                <div className="row" style={{margin:'20px 5px 20px 5px'}}>
                  <div className="col-md-2" >
                  <span style={{fontSize:'13px',fontWeight:'bold'}}>{message.timestamp.substring(16,21)} {'  '}{message.timestamp.substring(16,18)>=12 ?'PM' : 'AM'}</span><br/>
                  <span style={{fontSize:'13px',fontWeight:'bold'}}>{message.timestamp.substring(8,10)}{'  '}{message.timestamp.substring(4,7)}{'  '}{message.timestamp.substring(10,15)}</span>
                  </div>
                  <div className="col-md-10">
                    <p>{message.content}</p>
                  </div>
                </div>
            ))}
            </div>
         
        </div>
        <div className={styles.notesInput}>
          <div className={styles.input}>
            <textarea
              className={styles.inputArea}
              value={notesData}
              onChange={(e) => handleChange(e)}
              onKeyPress={handleKeyPress} 
              rows="6"
              cols="130"
              placeholder="Enter Your Text Here........."
            />
            <img style={{marginTop:'120px',marginLeft:'1010px'}} src={sendData} onClick={handleSendData} />
          </div>
        </div>
      </div>
}
    </>
  );
}
