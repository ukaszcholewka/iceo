import { FC, useCallback, useMemo, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import {
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { styled } from '@mui/system'
import { observer } from 'mobx-react-lite'
import { DataTable } from '@/components'
import localApiStore from '@/stores/localApiStore'
import { BalancesRes } from '@/api/localApi'

const CardStyled = styled(Card)`
    padding: 16px;
`

type BalanceType =
    | BalancesRes['data']['collection'][number]['balanceType']
    | 'ALL'

const TIME_OPTIONS = [7, 30, 90]
const BALANCE_OPTIONS: BalanceType[] = ['ADMIN', 'SYSTEM', 'USER', 'ALL']
const DAY = 1000 * 60 * 60 * 24

const Balances: FC = () => {
    const [time, setTime] = useState(0)
    const [type, setType] = useState<BalanceType>('ALL')
    const parsetBalance = localApiStore.getParsedBalance()

    const firstLetterUpper = useCallback(
        (str: string) =>
            Array.from(str)
                .map((letter, index) =>
                    !index
                        ? letter.toLocaleUpperCase()
                        : letter.toLocaleLowerCase()
                )
                .join(''),
        []
    )

    const onTimeChange = useCallback(
        (event: SelectChangeEvent) => setTime(parseInt(event.target.value, 10)),
        []
    )

    const onTypeChange = useCallback(
        (event: SelectChangeEvent) =>
            setType(event.target.value as BalanceType),
        []
    )

    const parseDate = useCallback(
        (timestamp: number) =>
            new Date(timestamp).toLocaleString().replace(/\//g, '.'),
        []
    )

    const parseCurrency = useCallback(
        (funds: string, precision: number) =>
            Array.from(funds).reduce(
                (acc, curr, i, arr) =>
                    (acc += arr.length - i === precision ? '.' + curr : curr),
                ''
            ),
        []
    )

    const columns: GridColDef[] = useMemo(
        () => [
            { field: 'createdAtParsed', headerName: 'Created At' },
            { field: 'userName', headerName: 'User Name' },
            { field: 'fundsAvailable', headerName: 'Founds' },
            { field: 'balanceType', headerName: 'Type' },
        ],
        []
    )

    const rows = useMemo(
        () =>
            Array.from(parsetBalance || []).map((balance, index) => ({
                ...balance,
                id: index + 1,
                createdAtParsed: parseDate(balance.createdAt),
                fundsAvailable:
                    parseCurrency(balance.fundsAvailable, balance.precision) +
                    ` ${balance.currencyName}`,
            })),
        [parsetBalance]
    )

    const filtered = useMemo(() => {
        const timestamp = new Date().getTime()
        return rows
            .filter(({ createdAt }) =>
                !!time ? timestamp - DAY * time <= createdAt : true
            )
            .filter(({ balanceType }) =>
                type === 'ALL' ? true : balanceType === type
            )
    }, [type, rows, time])

    return (
        <DataTable
            columns={columns}
            rows={filtered}
            label={
                <CardStyled>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="time-select-label">
                                    Time
                                </InputLabel>
                                <Select
                                    labelId="time-select-label"
                                    id="time-select"
                                    value={'' + time}
                                    label="Time"
                                    onChange={onTimeChange}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    {TIME_OPTIONS.map((time) => (
                                        <MenuItem key={time} value={time}>
                                            Last {time} days
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="type-select-label">
                                    Type
                                </InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    id="type-select"
                                    value={type}
                                    label="Type"
                                    onChange={onTypeChange}
                                >
                                    {BALANCE_OPTIONS.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {firstLetterUpper(type)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardStyled>
            }
        />
    )
}

export default observer(Balances)
