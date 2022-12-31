import { useRouter } from "next/router";
import { Layout } from "../components/layout";

export default function NotFound(){

    const path = useRouter();
    return(
        <Layout>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button onClick={() => path.push('/')} className="btn btn-secondary mt-5 ms-5"><i class="bi bi-arrow-left me-2"></i>Home Page</button>
                <h2>Page Not Found</h2>
            </div>
        </Layout>
    )
}