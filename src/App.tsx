import './App.css'
import { StatusCell } from './components/CellTemplates'
import Table from './components/Table'
import { SelectionControl } from './components/TableControls'
import { data } from './mocks/data'

function App() {

  return (
    <>
      <Table
        data={ data }
        columnTitles={[
          'Name',
          'Device',
          'Path',
          'Status'
        ]}
        columnTemplates={{
          'status': StatusCell
        }}
        isSelectable={true}
        isMultiSelect={true}
        tableControl={SelectionControl}
      />
    </>
  )
}

export default App
