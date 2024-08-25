import { ReactNode }from 'react'
import './Table.css'

export type TableProps = {
  caption?: ReactNode
  data: Array<Object>
  columnTitles?: string[]
  columnTemplates?: Record<string, React.FC<{value: any}>>
}

const Table = (props: TableProps) => {
  const headers: string[] = props.columnTitles || Object.keys(props.data[0])

  const tr = (row: Object): ReactNode => {
    if (row !== Object(row)) {
      return <></>
    }
    return (
      <tr>
      {
        Object.entries(row).map((v: any) => {
          if (props.columnTemplates?.[v[0]]) {
            const ValueNode = props.columnTemplates?.[v[0]]
            return <td><ValueNode value={v[1]} /></td>
          } else {
            return (<td>{ v[1].toString() }</td>)
          }
        })
      }
      </tr>
    )
  }

  return (
    <table>
      {
        props.caption &&
        <caption>{props.caption}</caption>
      }
      {
        props.data && Array.isArray(props.data) &&
        (<thead>{ headers.map(header => <th>{ header }</th>) }</thead>)
      }
      {
        props.data && Array.isArray(props.data) &&
        (<tbody>{ props.data.map(tr) }</tbody>)
      }
    </table>
  )
}

export default Table
