import { useMemo, useState } from 'react'
import type { Key, ReactNode } from 'react'
import { Link as MuiLink, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export type SortableValue = string | number | Date | null | undefined

export interface SortableTableColumn<Row> {
  id: string
  label: string
  getSortValue: (row: Row) => SortableValue
  renderCell: (row: Row) => ReactNode
  align?: 'left' | 'center' | 'right'
}

export interface SortableTableProps<Row> {
  rows: readonly Row[]
  getRowKey: (row: Row) => Key
  firstColumn: SortableTableColumn<Row> & { linkTo: (row: Row) => string }
  columns?: readonly SortableTableColumn<Row>[]
  maxHeight?: number | string
  actionColumn: {
    label?: string
    renderCell: (row: Row) => ReactNode
  }
  emptyMessage?: ReactNode
}

type SortDirection = 'asc' | 'desc'

function compareValues(left: SortableValue, right: SortableValue) {
  if (left == null || right == null) {
    return left == null ? (right == null ? 0 : 1) : -1
  }

  const leftValue = left instanceof Date ? left.getTime() : left
  const rightValue = right instanceof Date ? right.getTime() : right

  if (typeof leftValue === 'number' && typeof rightValue === 'number') {
    return leftValue - rightValue
  }

  return String(leftValue).localeCompare(String(rightValue), undefined, {
    numeric: true,
    sensitivity: 'base',
  })
}

function SortableTable<Row>({
  rows,
  getRowKey,
  firstColumn,
  columns = [],
  maxHeight = 'min(55vh, 640px)',
  actionColumn,
  emptyMessage = 'No results found.',
}: SortableTableProps<Row>) {
  const sortableColumns = [firstColumn, ...columns]
  const [sort, setSort] = useState<{ id: string; direction: SortDirection }>({
    id: firstColumn.id,
    direction: 'asc',
  })

  const sortedRows = useMemo(() => {
    const activeColumn = sortableColumns.find((column) => column.id === sort.id)

    if (!activeColumn) {
      return [...rows]
    }

    return rows
      .map((row, index) => ({ row, index }))
      .sort((left, right) => {
        const comparison = compareValues(
          activeColumn.getSortValue(left.row),
          activeColumn.getSortValue(right.row),
        )
        return comparison === 0
          ? left.index - right.index
          : comparison * (sort.direction === 'asc' ? 1 : -1)
      })
      .map(({ row }) => row)
  }, [rows, sort, sortableColumns])

  const handleSort = (columnId: string) => {
    setSort((current) => ({
      id: columnId,
      direction:
        current.id === columnId && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderColor: '#d5dde7',
        borderRadius: 2,
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: '#edf2f8' }}>
            {sortableColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                sortDirection={sort.id === column.id ? sort.direction : false}
                sx={{ color: '#202a35', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                <TableSortLabel
                  active={sort.id === column.id}
                  direction={sort.id === column.id ? sort.direction : 'asc'}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{ color: '#202a35', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              {actionColumn.label}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.length > 0 ? (
            sortedRows.map((row) => (
              <TableRow key={getRowKey(row)} hover>
                <TableCell>
                  <MuiLink
                    component={RouterLink}
                    to={firstColumn.linkTo(row)}
                    underline="always"
                    sx={{ color: '#355375', fontWeight: 600 }}
                  >
                    {firstColumn.renderCell(row)}
                  </MuiLink>
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.renderCell(row)}
                  </TableCell>
                ))}
                <TableCell align="center">
                  {actionColumn.renderCell(row)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={sortableColumns.length + 1} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SortableTable
