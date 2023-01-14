import { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
export const Header = (props) =>{

  const { dark } = props;
    return(
        <header id={styles.sombra} className="d-flex justify-content-between p-3">
            <h4 style={{color: dark ? "white" : "black"}}  className="ms-5">Where in the World?</h4>
            <p style={{color: dark ? "white" : "black", cursor: 'pointer'}} onClick={props.darkMode}  className="me-5">
                <i class="bi bi-moon"></i>  
                <span className='ms-2'>Dark Mode</span>
            </p>
        </header>
    )
}