import { ReactNode, useState }from 'react'
import './Table.css'
import './CellTemplates.css'

export type TableProps = {
  caption?: ReactNode
  data: Array<Object>
  columnTitles?: string[]
  columnTemplates?: Record<string, React.FC<{value: any}>>
  isSelectable?: boolean
  isMultiSelect?: boolean
}

const Table = (props: TableProps) => {
  const headers: string[] = props.columnTitles || Object.keys(props.data[0])
  const isSelectable: boolean = props.isSelectable || false
  const isMultiSelect: boolean = props.isMultiSelect || false
  const [selection, setSelection] = useState<number[]>([])

  const rowClickAction = (rowIndex: number) => {
    if (selection.includes(rowIndex)) {
      setSelection(selection.filter(idx => rowIndex !== idx))
    } else {
      setSelection(isMultiSelect ? [
        ...selection,
        rowIndex
      ] : [ rowIndex ])
    }
  }


  const tr = (row: Object, index: number): ReactNode => {
    if (row !== Object(row)) {
      return <></>
    }
    return (
      <tr
        key={`row-${index}`}
        className={`${isSelectable ? 'selectable' : ''} ${selection.includes(index) ? 'selected' : ''}`}
        onClick={(ev) => {
          ev.stopPropagation()
          rowClickAction(index)
        }}
      >
      {
        isMultiSelect && <td><input type='checkbox' checked={selection.includes(index)} /></td>
      }
      {
        Object.entries(row).map((v: any, idx: number) => {
          if (props.columnTemplates?.[v[0]]) {
            const ValueNode = props.columnTemplates?.[v[0]]
            return <td key={`td-${idx}`}><ValueNode value={v[1]} /></td>
          } else {
            return (<td key={`td-${idx}`}>{ v[1].toString() }</td>)
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
        (<thead><tr>
          {
            isMultiSelect && <td></td>
          }
          { headers.map((header, idx) => <th key={`th-${idx}`}>{ header }</th>) }
        </tr></thead>)
      }
      {
        props.data && Array.isArray(props.data) &&
        (<tbody>{ props.data.map((row, idx) => tr(row, idx)) }</tbody>)
      }
    </table>
  )
}

export default Table
