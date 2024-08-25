import './CellTemplates.css'

export type CellTemplateProps = {
  value: any
}

export const StatusCell = (props: CellTemplateProps ) => {
  const val = props.value.toString()

  return (
    <div className='status-cell'>
      <div className={`indicator ${val}`}></div>
      <div className='value'>{ val }</div>
    </div>
  )
}
