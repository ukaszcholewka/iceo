import { Card, Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { FC, memo, ReactNode } from 'react'

import { Box, styled } from '@mui/system'
import { theme } from '@/styles/GlobalStyle'

interface BoxTableProps {
    x: number
}

interface DataTableProps {
    rows: Record<string, string | number>[]
    columns: GridColDef[]
    label?: ReactNode
}

interface BoxCellProps {
    header?: boolean
}
const BoxCell = styled(Box, {
    shouldForwardProp: (props) => props !== 'header',
})<BoxCellProps>`
    display: flex;
    font-size: 14px;
    font-weight: ${({ header: isHeader }) => (isHeader ? 500 : 300)};
    padding: 8px 16px;

    @media (max-width: 1024px) {
        display: ${({ header }) => (header ? 'none' : 'flex')};
    }
`

const BoxDesc = styled(Box)`
    display: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    justify-content: end;

    @media (max-width: 1024px) {
        display: flex;
    }
`

const BoxTable = styled(Box)<BoxTableProps>`
    display: grid;
    grid-template-columns: repeat(${({ x }) => x}, auto);
    background-color: ${theme.palette.primary.main};
    border-radius: 15px;
    border: 2px solid #000;
    border-width: 2px 4px 4px 2px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, auto);
    }
`

interface CellProps {
    title: string
    value: string | number
}

const Cell: FC<CellProps> = ({ title, value }) => {
    return (
        <>
            <BoxDesc>{title}</BoxDesc>
            <BoxCell>{value}</BoxCell>
        </>
    )
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
                <BoxTable x={columns.length}>
                    {columns.map(({ headerName }) => (
                        <BoxCell header key={headerName}>
                            {headerName}
                        </BoxCell>
                    ))}
                    {rows.map((row) =>
                        columns.map(({ field, headerName }) => (
                            <Cell
                                key={field}
                                title={headerName || ''}
                                value={row[field]}
                            />
                        ))
                    )}
                </BoxTable>
            </Grid>
        </Grid>
    )
}

export default memo(DataTable)
