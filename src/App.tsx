import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from '@mui/material'
import { GlobalStyle, theme } from '@/styles/GlobalStyle'
import Menu from '@/components/Menu'

const App: FC = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Menu />
            </ThemeProvider>
        </>
    )
}

export default observer(App)
