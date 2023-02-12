import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid, ThemeProvider } from '@mui/material'
import { GlobalStyle, theme } from '@/styles/GlobalStyle'
import Menu from '@/components/Menu'
import { TopBar } from './components'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

const App: FC = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Menu />
                <TopBar />
                <Grid container padding="24px">
                    <Grid item xs={12}>
                        <RouterProvider router={router} />
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default observer(App)
