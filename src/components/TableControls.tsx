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
    props.setSelection((selectionCount > 0) ?
      [] : props.data.map((_, idx) => idx)
    )
  }
  const handleDownload = () => {
    let output = 'No selected records available for download.'
    const selectedAvailableRecords = props.data
    .filter((_, idx) => props.selection.includes(idx))
    .filter((r: any) => r.status === 'available')

    if (selectedAvailableRecords.length > 0) {
      output = selectedAvailableRecords.map((r: any) => `${r.path} (${r.device})`).join('\n')
    }

    window.alert(output)
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
        selectionCount === 0 && (
          <div>None Selected</div>
        )
      }
      {
        selectionCount > 0 && (
          <>
            <div>Selected { selectionCount }</div>
            <button onClick={handleDownload}>Download Selected</button>
          </>
        )
      }
    </div>
  )
}
