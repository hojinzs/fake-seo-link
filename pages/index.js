export function getServerSideProps(){
    return {
        redirect: {
            permanent: false,
            destination: '/articles/create'
        }
    }
}

export default function Home(){

}
