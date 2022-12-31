import { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
export const Header = () =>{

  
    return(
        <header id={styles.sombra} className="d-flex justify-content-between p-3">
            <h4 className="ms-5">Where in the World?</h4>
            <p  className="me-5" style={{cursor: 'pointer'}}>
                <i class="bi bi-moon"></i>  
                <span className='ms-2'>Dark Mode</span>
            </p>
        </header>
    )
}