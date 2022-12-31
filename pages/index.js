import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react';
import { Layout } from '../components/layout'
//import styles from '../styles/Home.module.css'

export default function Home({countries}) {
  const path = useRouter();
  const altRef = useRef(null);
  
  const handleClick = ( e ) =>{
    /* path.push(`/${e.target}`) */
    altRef.current = e.target.alt;
    path.push(`/country/${altRef.current.toLowerCase()}`)
  }

  const byRegion = async (e) =>{
    path.push(`/region/${e.target.value}`)
  }

  const searchForCountry = (e) => {
    if(e.keyCode === 13){
      if(e.target.value.toLowerCase() !== ''){
        path.push(`/country/${e.target.value.toLowerCase()}`)
      }else{
        return
      }
    }else{
      return
    }
  }

  return (
    <div>

      <Layout title='Home Page'>
        {/* All countries */}
        <section className='d-flex justify-content-between py-4 mx-auto' style={{width: "80%"}}>
          <input onKeyDown={searchForCountry} className='form-control w-50 ms-2' placeholder='Search for a country'/>
          <select onChange={byRegion} className='form-control form-select  w-25 me-2'>
            <option selected>Filter by Region</option>
            <option value='africa'>Africa</option>
            <option value='americas'>America</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
          </select>
        </section>
        <section className='d-flex justify-content-center flex-wrap mt-5'>

          {
            countries.map( country => (
              <div key={country.name.common} className='card m-2 p-0' style={{width: "320px", cursor: 'pointer'}}>
               <img onClick={handleClick} ref={altRef} src={country.flags.svg} alt={country.name.common} style={{ width: '100%', height: '100%'}}/>
                <h4 className='ms-3 mt-5'>{country.name.common}</h4>
                <p className='ms-3 fw-bold'>Population: <span className='fw-normal'>{ country.population }</span></p>
                <p className='ms-3 fw-bold'>Region: <span className='fw-normal'>{ country.region }</span></p>
                <p className='ms-3 fw-bold'>Capital: <span className='fw-normal'>{ country.capital }</span></p>
              </div>
            ))
          }
        </section>
      </Layout>
    </div>
  )
}


export async function getStaticProps(){
  const countries = await fetch('https://restcountries.com/v3.1/all')
                          .then(res => res.json())
  //console.log(countries)
  return{
    props: {
      countries
    }
  }
}
