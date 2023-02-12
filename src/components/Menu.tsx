import { FC, ReactNode, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import GroupIcon from '@mui/icons-material/Group'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import { appStore } from '@/stores/appStore'
import { styled } from '@mui/system'
import { router, RouterPaths } from '@/router'

const Logo = styled('img')`
    border-radius: 15px;
`

type MenuItem = {
    value: string
    Icon: () => JSX.Element
    path?: RouterPaths
}

const items: Readonly<MenuItem[]> = [
    { value: 'Użytkownicy', Icon: () => <GroupIcon />, path: '/users' },
    { value: 'Waluty', Icon: () => <GroupIcon />, path: '/currency' },
    { value: 'Salta', Icon: () => <GroupIcon />, path: '/balance' },
] as const

const Menu: FC = () => {
    const { showDrawer } = appStore

    const onCloseDrawer = useCallback(() => {
        appStore.showDrawer = false
    }, [])

    const navigateTo = useCallback(
        (to?: RouterPaths) => () => {
            if (!to) return
            router.navigate({ to } as any) // tanstack router is in beta
            appStore.showDrawer = false
        },
        []
    )

    return (
        <Drawer anchor="left" open={showDrawer} onClose={onCloseDrawer}>
            <Box sx={{ width: 250 }}>
                <Box>
                    <Logo alt="" src="https://picsum.photos/100/50" />
                </Box>
                <Box marginTop={6}>
                    <Typography variant="h6">Zarzadzanie</Typography>
                    <List>
                        {items.map(({ value, Icon, path }) => (
                            <ListItem key={value}>
                                <ListItemButton onClick={navigateTo(path)}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={value} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    )
}

export default observer(Menu)
