import React from 'react'

const Table = (
  {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    renderCell,
  }: any,
  ...props: any
) => {
  return (
    <table
      className="w-full rounded-lg text-left text-sm text-gray-500 dark:text-gray-400"
      {...getTableProps()}
    >
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                scope="col"
                className="px-6 py-3"
              >
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                <div>
                  {column && !column.disableFilter && column.canFilter
                    ? column.render('Filter')
                    : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row: any) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr
                {...row.getRowProps()}
                className="border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell: any) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} className="px-6 py-4">
                        {renderCell(cell)}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Table
