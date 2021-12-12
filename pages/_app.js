import '../styles/styles.css'

import {Container} from "@mui/material";
import {ModalPresenter} from "../src/libs/modalPresenter";


function MyApp({ Component, pageProps }) {
  return (
      <>
          <div>
              <Container maxWidth="md">
                  LOGO
              </Container>
          </div>
          <Container maxWidth="md">
              <Component {...pageProps} />
          </Container>
          <ModalPresenter />
      </>
  )
}

export default MyApp
