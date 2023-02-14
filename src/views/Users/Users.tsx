import { FC, useMemo } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { observer } from 'mobx-react-lite'
import { DataTable } from '@/components'
import localApiStore from '@/stores/localApiStore'

const Users: FC = () => {
    const rows = localApiStore.users.data?.data.collection || []

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'userId', headerName: 'User ID' },
            { field: 'userName', headerName: 'Name' },
        ],
        []
    )

    return <DataTable columns={columns} rows={rows} />
}

export default observer(Users)
