import {getArticleData, updateArticleCount} from "../../libs/Article";
import Head from "next/head";

const getServerSideProps = async ({params}) => {
    let articleData
    try {
        articleData = await getArticleData(params.id)
        await updateArticleCount(params.id)
    }
    catch (e) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            articleData: articleData
        }
    }
}

export {getServerSideProps}

const ShowArticle = ({articleData}) => {

    return (
        <>
            <Head>
                <title>{ articleData.title }</title>
                <meta name="og:title" content={ articleData.description } />
                <meta name="og:description" content={ articleData.description } />
                <meta name="og:site_name" content={ articleData.siteName }/>
                <meta name="og:url" content={ articleData.siteURL } />
                <meta name="og:image" content={ articleData.imageURL } />
            </Head>
            <div>
                <div>힝 속았지~</div>
                <div>
                    당신은 { articleData.hit } 번째로 낚였습니다.
                </div>
            </div>
        </>
    )
}

export default ShowArticle
