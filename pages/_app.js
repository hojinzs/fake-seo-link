import '../styles/styles.css'

import {Container} from "@mui/material";

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
      </>
  )
}

export default MyApp
