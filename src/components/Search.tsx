import React, { useEffect, useState } from 'react'
// import { IComment } from '../models/models'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

interface SearchProps {
  page: number
  // sortPosts(page: any): void
  // isSorted: boolean
  // setIsSorted(page: any): void
  search: string
  setSearch(search: string): void
}

function Search({
  page,
  // sortPosts,
  // isSorted,
  // setIsSorted,
  search,
  setSearch,
}: SearchProps) {
  // const SortHandler = (): void => {
  //   sortPosts({ page: page })
  //   setIsSorted((prev: any) => !prev)
  // }

  const changeInputHandler = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  // const onChangeInputHandler = (e: any) => {
  //   setSearch(e.target.value)
  // }

  return (
    <Container fluid='xl' className='d-flex justify-content-center px-0 w-100'>
      {/* <Row className='d-flex flex-column flex-wrap justify-content-between w-100 flex-sm-row'> */}
      {/* <Col className='mb-3 col-lg-4 col-sm-6 col-12 px-0'> */}
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
      {/* </Col>
        <Col className='d-flex justify-content-end mb-3 px-0'>
          <Button
            className='px-4 align-self-start'
            variant={!isSorted ? 'outline-success' : 'outline-danger'}
            onClick={() => SortHandler()}
          >
            {!isSorted ? 'Sort posts' : 'Unsort posts'}
          </Button>
        </Col> */}
      {/* </Row> */}
    </Container>
  )
}

export default Search
