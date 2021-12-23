import { Box, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const HeaderSx = {
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const Title = {
    color: grey[800]
}

const SubTitle = {
    color: grey[600]
}

const Header = () => {
    return (
        <>
            <Stack direction="column" sx={HeaderSx}>
                <Typography variant="h4" component="h1" sx={Title}>
                    낚시 링크 생성기
                </Typography>
                <Typography sx={SubTitle}>
                    나의 희망, 너의 희망을 담아 희망 고문을 공유해주세요. <br/>
                </Typography>
            </Stack>
        </>
    )
}

export default Header