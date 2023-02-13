import { Card, Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { FC, memo, ReactNode } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface DataTableProps {
    rows: Record<string, string | number>[]
    columns: GridColDef[]
    label?: ReactNode
}

const DataTable: FC<DataTableProps> = ({ rows, columns, label }) => {
    return (
        <Grid container>
            {label && (
                <Grid item xs={12} marginBottom={2}>
                    <Card>{label}</Card>
                </Grid>
            )}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map(({ headerName }) => (
                                    <TableCell key={headerName}>
                                        {headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={JSON.stringify(row)}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    {columns.map(({ field }) => (
                                        <TableCell key={field}>
                                            {row[field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default memo(DataTable)
