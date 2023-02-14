import { FC, useMemo } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { observer } from 'mobx-react-lite'
import { DataTable } from '@/components'
import localApiStore from '@/stores/localApiStore'

const Home: FC = () => {
    const rows = localApiStore.users.data?.data.collection || []

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'userId', headerName: 'User ID', width: 180 },
            { field: 'userName', headerName: 'Name', width: 120 },
        ],
        []
    )

    return <DataTable x={columns.length} columns={columns} rows={rows} />
}

export default observer(Home)
