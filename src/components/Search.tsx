import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

interface SearchProps {
  page: number
  search: string
  setSearch(search: string): void
}

function Search({ search, setSearch }: SearchProps) {
  const changeInputHandler = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <Container fluid='xl' className='d-flex justify-content-center px-0 w-100'>
      <Form className='d-flex'>
        <Form.Control
          type='search'
          placeholder='Search | Enter name'
          className='me-2'
          aria-label='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => changeInputHandler(e)}
        />
      </Form>
    </Container>
  )
}

export default Search
