import { FC, useCallback } from 'react'
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

const Logo = styled('img')`
    border-radius: 15px;
`

const items = [
    { value: 'Użytkownicy', Icon: () => <GroupIcon /> },
    { value: 'Waluty', Icon: () => <GroupIcon /> },
    { value: 'Salta', Icon: () => <GroupIcon /> },
] as const

const Menu: FC = () => {
    const { showDrawer } = appStore

    const onCloseDrawer = useCallback(() => {
        appStore.showDrawer = false
    }, [])

    return (
        <Drawer anchor="left" open={showDrawer} onClose={onCloseDrawer}>
            <Box sx={{ width: 250 }}>
                <Box>
                    <Logo alt="" src="https://picsum.photos/100/50" />
                </Box>
                <Box marginTop={6}>
                    <Typography variant="h6">Zarzadzanie</Typography>
                    <List>
                        {items.map(({ value, Icon }) => (
                            <ListItem key={value}>
                                <ListItemButton>
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
