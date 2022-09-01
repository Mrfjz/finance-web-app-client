import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Styles from './Table.styles';
import Select from 'react-select';

// Create a default prop getter
const defaultPropGetter = () => ({})

export default function Table({
    data,
    columns,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({
        columns,
        data,
        initialState: { pageSize: 15 }
    },
        useSortBy,
        usePagination
    )

    const headerGroup = headerGroups[0];
    const options = []
    for (let i = 0; i < pageCount; i++) {
        options.push({
            value: i,
            label: i + 1
        })
    }

    return (
        <Styles>
            <table {...getTableProps()}>
                <thead>
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                // Return an array of prop objects and react-table will merge them appropriately
                                {...column.getHeaderProps([
                                    {
                                        style: column.style,
                                    },
                                    getColumnProps(column),
                                    getHeaderProps(column),
                                    column.getSortByToggleProps()
                                ])}
                            >
                                {column.render('Header')}
                                <span>
                                    {
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''
                                    }
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            // Merge user row props in
                            <tr {...row.getRowProps(getRowProps(row))}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            // Return an array of prop objects and react-table will merge them appropriately
                                            {...cell.getCellProps([
                                                {
                                                    className: cell.column.className,
                                                    // style: cell.column.style,
                                                },
                                                getColumnProps(cell.column),
                                                getCellProps(cell),
                                            ])}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                </span>
                <Select
                    menuPlacement='auto'
                    value={options[pageIndex]}
                    isSearchable={false}
                    onChange={(o) => gotoPage(o.value)}
                    options={options}
                />

            </div>

        </Styles>
    )
}
