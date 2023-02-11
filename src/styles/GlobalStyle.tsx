import { createTheme, GlobalStyles } from '@mui/material'

const colors = {
    primary: '#057680',
    secondary: '#D26606',
} as const

let theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
    },
    typography: {
        fontFamily: 'Lexend Deca',
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.primary,
                    border: '2px solid #000',
                    borderRadius: 15,
                    padding: '16px',
                    height: 'calc(100vh - 100px)',
                    margin: '34px 16px',
                    borderWidth: '2px 4px 4px 2px',
                    boxShadow: 'none',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: '0',
                    border: '2px solid transparent',
                    borderWidth: '2px 4px 4px 2px',
                    borderRadius: 15,

                    ':hover': {
                        borderRadius: 15,
                        border: '2px solid #000',
                        borderWidth: '2px 4px 4px 2px',
                    },
                },
            },
        },
    },
})

theme = createTheme(theme, {
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    ':hover': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                },
            },
        },
    },
})

export { theme }

export const GlobalStyle = () => (
    <GlobalStyles
        styles={{
            body: {
                margin: 0,
                backgroundColor: theme.palette.secondary.main,
                fontFamily: '"Lexend Deca", sans-serif',
            },
        }}
    />
)
