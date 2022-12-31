import { useRouter } from "next/router";
import { useRef } from "react";
import { Layout } from "../../components/layout";


export default function CountryByRegion ({ countryByRegionData }){
    //console.log(countryByRegionData)

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

    return(
        <Layout title='Regions'>
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
            countryByRegionData.map( country => (
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
    )
}


export async function getStaticPaths(){
    const AllCountries = await fetch('https://restcountries.com/v3.1/all');
    const countryByRegion = await AllCountries.json();

    //console.log(countryByRegion)

    const paths = countryByRegion.map( cbr => ({
        params: { name: cbr.region.toLowerCase()}
    }))

    return{
        paths,
        fallback: false
    }

}

export async function getStaticProps({params}){
    const countryByRegionData = await fetch(`https://restcountries.com/v3.1/region/${params.name}`)
                                        .then( res => res.json())
    //console.log(params.name)
    return{
        props: { countryByRegionData }
    }

}