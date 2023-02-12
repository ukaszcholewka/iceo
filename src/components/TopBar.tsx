import { FC, useCallback } from 'react'
import { Avatar, Chip, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { appStore } from '@/stores/appStore'
import { userStore } from '@/stores/userStore'
import { observer } from 'mobx-react-lite'

const GridStyled = styled(Grid)`
    padding: 12px 24px;
`

const UserChipStyled = styled(Chip)`
    height: 62px;
    border-radius: 31px;
    cursor: pointer;
`

const TopBar: FC = () => {
    const { email, name, type } = userStore

    const openDrawer = useCallback(() => {
        appStore.showDrawer = true
    }, [])

    return (
        <GridStyled
            container
            justifyContent="right"
            spacing={2}
            alignItems="center"
        >
            <Grid item>
                <Chip label={type} variant="filled" />
            </Grid>
            <Grid item>
                <UserChipStyled
                    onClick={openDrawer}
                    label={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar src="https://picsum.photos/200/300" />
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            {name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <ExpandMoreIcon fontSize="large" />
                            </Grid>
                        </Grid>
                    }
                    variant="filled"
                />
            </Grid>
        </GridStyled>
    )
}

export default observer(TopBar)
