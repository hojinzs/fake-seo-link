import '../styles/styles.css'

import {Container} from "@mui/material";
import {ModalPresenter} from "../src/libs/modalPresenter";
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Container maxWidth="md">
            <Header />
        </Container>
        <Container maxWidth="md">
            <Component {...pageProps} />
        </Container>
        <ModalPresenter />
    </>
  )
}

export default MyApp
