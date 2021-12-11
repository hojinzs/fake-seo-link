import {Grid} from "@mui/material";

const MainSubColumn = (props) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    { props.mainSection }
                </Grid>
                <Grid item xs={5}>
                    { props.subSection }
                </Grid>
            </Grid>
        </>
    )
}

export default MainSubColumn
