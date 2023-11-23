import React, { useEffect, useState } from "react";
import "./notesgroup.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NotesContent from "./NotesContent";
import App from "../App";
import plus from '../Images/plus.png'
import styles from './Styles.module.css'
import ResponsiveComp from "./ResponsiveComp";

export default function NotesGroup({setIsNotes, handleGroupData,getData}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [colorErr,setColorErr]=useState('')
  const [nameErr,setNameErr]=useState('')
  const [groupColor,setGroupColor]=useState('');
  const [selectGroup,setSelectGroup]=useState();
  const [getObject,setGetObject]=useState(null)
  const [isNotesVisible, setIsNotesVisible] = useState(true);
  const [width,setWidth]=useState(window.innerWidth)
  
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  useEffect(() => {
    if (!isNotesVisible) {
      setIsNotes(true);
    }
  }, [isNotesVisible, setIsNotes]);
  let nameExp=/^[A-Za-z]/
  useEffect(() => {
    let data = localStorage.getItem("Group-Data");
    if (data) {
      setStoreData(JSON.parse(data));
    }
    window.addEventListener("resize", handleResponsive);
    setWidth(window.innerWidth)
    // console.log(width)
  }, [width]);

  // console.log(localStorage.length);
  const handleResponsive=()=>{
    if (window.innerWidth <= 500) {
      setIsNotesVisible(false);
     
    } 
    setWidth(window.innerWidth)
  }
  function handle() {
   
    setIsOpenModal(true);
  }
  function handleClose() {
    setIsOpenModal(false);
  }
  function handleCreate() {
    
    if (groupName === "" && selectColor==="" ) {
       setNameErr('Please Enter Group Name')
       setColorErr("Please Select Color")
    }
    else if(selectColor==="")
    {
      setColorErr('Please Select Color')
    }
    else if(!nameExp.test(groupName) && selectColor!=="")
    {
      setNameErr("Please Enter Group name")
      
    }
    else
    {
      let obj = {
        name: groupName,
        color: colorValue,
      };
  
      const updatedData = [...storeData, obj];
      // console.log(updatedData);
      setStoreData(updatedData);
      JSON.stringify(updatedData);
      localStorage.setItem("Group-Data", JSON.stringify(updatedData));
      
      setIsOpenModal(false);
      setGroupName('')
    }

    
  }
  function handleColor(color) {
    if (selectColor == "") {
      document.getElementById(color).style.border = "2px solid black";
      setSelectColor(color);
    }
    if (selectColor !== "") {
      document.getElementById(selectColor).style.border = "none";
      document.getElementById(color).style.border = "2px solid black";
      setSelectColor(color);
    }

    setColorValue(color);
    setNameErr('')
    setColorErr('')
  }
  const handleNotes=(id,obj)=>{
    // alert(obj.name)
    var data = localStorage.getItem('Group-Data');
    var dataArray=JSON.parse(data)
    if (dataArray.length > 0) {
      var firstObject = dataArray[id];
      var firstName = firstObject.name;
      var col=firstObject.color
     
      handleGroupData({ color: col, name: firstName,id:id }); 
    }
    setGetObject(obj)
    setIsNotes(true)
    

    
    if(groupColor=='')
    {
      document.getElementById(id).style.background='#F7ECDC'
      setSelectGroup(id)
    }
    if(groupColor!='')
    {
      document.getElementById(selectGroup).style.background='none'
      document.getElementById(id).style.background='#F7ECDC'
    }
    if (window.innerWidth <= 500) {
      // Display NotesContent component
      setIsNotesVisible(false);
      // console.log('hii')
      // window.location.reload();

    } 
    
    
  }
 
  return (
    <>
      {isNotesVisible ?( <div className={styles.not}>
        <h2>Pocket Notes</h2>
        <button
          type="button"
          className="btn btn-dark createGrpBtn"
          style={{width:'13rem',borderRadius:'20px'}}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={handle}
        >
          <img src={plus} style={{height:'14px',width:'14px'}} alt='image'/>&nbsp; Create Notes Group
        </button>
        <Dialog
          open={isOpenModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p className="modal-group">Create New Notes Group</p>
              <label className={styles.labelInput}>Group Name</label>{" "}&nbsp;
              <input
                type="text"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
                className={styles.inputColor}
                placeholder="Enter Group Name"
              />
              <p style={{color:'red'}}>{nameErr}</p>
              <br></br>
              <div style={{display:'flex'}}>
              <label className={styles.labelColor}>Choose Color</label>&nbsp;&nbsp;&nbsp;
              <div
                className={styles.colorName}
              >
                {colors.map((color) => (
                  <>
                  <div
                    className={styles.col}
                    id={color}
                    onClick={() => handleColor(color)}
                    style={{
                      backgroundColor: color,
                      border:
                        color === selectColor ? "2ps solid black" : "none",
                    }}
                  ></div> &nbsp;
                  
                  </>
                ))}
                
                
              </div>
              <p style={{color:'red' , marginTop:'30px'}}>{colorErr}</p>
              </div>
           
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-dark" onClick={handleCreate}>Create</button>
          </DialogActions>
        </Dialog>
        <br></br>
        <br></br>
        <div className={styles.leftScroll}>
          {storeData.map((obj,ids) => (
            <>
            
              <div
                className={styles.group}
                id={ids}
                onClick={()=>handleNotes(ids,obj)}
                style={{ background:selectGroup==ids ? '#F7ECDC':'none'}}
              >
                <p
                  className={styles.groupLogo}
                  style={{
                    background: obj.color
                  }}
                >
                  {obj.name.substring(0, 2).toUpperCase()}
                </p>
                <p
                  className={styles.groupName}
                >
                  {obj.name}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>) :(<ResponsiveComp getData={getData}/>)
}
    </>
  );
}
