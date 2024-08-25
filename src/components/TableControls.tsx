import React from 'react'
import './TableControls.css'

export type TableContolProps = {
  data: Array<Object>
  isSelectable?: boolean
  isMultiSelect?: boolean
  selection: number[]
  setSelection: React.Dispatch<React.SetStateAction<number[]>>
}

export const SelectionControl = (props: TableContolProps ) => {
  const selectionCount = props.selection.length
  const dataCount = props.data.length
  const toggleSelection = () => {
    if (selectionCount > 0) {
      props.setSelection([])
    } else {
      props.setSelection(props.data.map((_, idx) => idx))
    }
  }

  return (
    <div className='selection-control'>
      <input
        type='checkbox'
        ref={(input) => {
          if (!input) return;
          if (
            (selectionCount > 0) &&
            (selectionCount < dataCount)
          ) {
            input.indeterminate = true
          } else {
            input.indeterminate = false
          }
        }}
        checked={selectionCount === dataCount}
        onChange={toggleSelection}
      />
      {
        selectionCount > 0 && (
          <div>Selected { selectionCount }</div>
        )
      }
    </div>
  )
}
