import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";

export default function Country({dataCountry}) {
    const path = useRouter()
    //console.log(path.query)

    const handleBack = () => {
        path.back()
    }

    return(
        <Layout>
            <button onClick={handleBack} className="btn btn-secondary mt-5 ms-5"><i class="bi bi-arrow-left me-2"></i>Back</button>
           {
            dataCountry.map( c => (
                <div key={c.name.common} className='d-flex flex-wrap justiy-content-center mx-auto mt-5' style={{width: '80%'}}>
                    <Image
                        src={c.flags.svg}
                        width={300}
                        height={400}
                        alt={c.name.common}
                    />
                    <div className="mt-5 ms-4">
                        <h4 className="text-center">{ c.name.common }</h4>
                    </div>
                </div>
            ))
           }
        </Layout>
    )
}

export async function getStaticPaths(){

    const res = await fetch('https://restcountries.com/v3.1/all')
    const countryNames = await res.json();
    const paths = countryNames.map(( c ) => ({
        params: { name: c.name.common.toLowerCase() }
    }))

    return{
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }){
    const singleCountry = await fetch(`https://restcountries.com/v3.1/name/${params.name}`)
    const dataCountry = await singleCountry.json();
 /*    dataCountry.map( dc => {
        console.log(dc.capital)
    }) */

    return{
        props:{ dataCountry  }
    }
}