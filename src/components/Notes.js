import React from "react";
import notesImg from "../Images/notesImg.png";
import './notesgroup.css'
import styles from './Styles.module.css'
import lock from '../Images/lock.png'
export default function Notes() {
  return (
    <>
      <div
        className={styles.defaultContent}
      >
        <div
          className={styles.image}
        >
          <img
            className={styles.pic}
            src={notesImg}
          />
        </div>
        <div
          className="content"
        >
          <div className="heading">
            <h2 className="head" style={{marginLeft:'500px'}}>Pocket Note</h2>
          </div>
          <div>
            <p style={{marginLeft:'355px'}}>
              Send and receive messages without keeping your phone online.<br></br>
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          
            
          </div>
        </div>
        <div className="lock" style={{display:'flex', alignItems:'center',justifyContent:'center',marginTop:'130px'}}>
        <p style={{marginLeft:'80px'}}><img src={lock} style={{height:'13px',width:'10px'}} alt='lock'/>{' '}end-to-end encrypted</p>

        </div>
       
      </div>
      
    </>
  );
}
