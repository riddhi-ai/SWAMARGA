import React from 'react'

export interface Column<T> {
  header: string
  accessor?: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string | number
  caption?: string
  emptyMessage?: string
  className?: string
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  caption,
  emptyMessage = 'No records found.',
  className = '',
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-[#d9dde1] rounded bg-white">
      <table className={`w-full text-left border-collapse text-sm ${className}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-[#f1f3f5] border-b-2 border-[#d9dde1] text-[#202124]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1f3]">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-[#5a6578] italic bg-white"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row, rowIdx)}
                className="hover:bg-[#f8fafc] transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`py-3.5 px-4 text-[#2d3748] ${col.className || ''}`}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : col.accessor
                      ? (row[col.accessor] as React.ReactNode)
                      : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
