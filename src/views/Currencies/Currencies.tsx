import { FC, useMemo } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { observer } from 'mobx-react-lite'
import { DataTable } from '@/components'
import localApiStore from '@/stores/localApiStore'

const Currencies: FC = () => {
    const rows = localApiStore.currences.data?.data.collection || []

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'currencyId', headerName: 'ID', width: 180 },
            { field: 'currencyName', headerName: 'Name', width: 120 },
            { field: 'precision', headerName: 'Precision', width: 120 },
        ],
        []
    )

    return <DataTable columns={columns} rows={rows} />
}

export default observer(Currencies)
