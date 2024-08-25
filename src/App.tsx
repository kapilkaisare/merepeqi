import './App.css'
import { StatusCell } from './components/CellTemplates'
import Table from './components/Table'
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
      />
    </>
  )
}

export default App
