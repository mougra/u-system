import { useState, useRef } from 'react'
import {
  Button,
  CloseButton,
  Col,
  Form,
  Overlay,
  Popover,
  Row,
} from 'react-bootstrap'

interface FilterProps {
  filterPC: string
  setFilterPC(filterPC: string): void
  filterTag: string
  setFilterTag(filterTag: string): void
}

function Filter({
  filterPC,
  setFilterPC,
  filterTag,
  setFilterTag,
}: FilterProps) {
  const [filterPClocal, setFilterPClocal] = useState('')
  const [filterTaglocal, setFilterTaglocal] = useState('')

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleClick = (event: any) => {
    setShow(!show)
    setTarget(event.target)
  }

  const handleSave = () => {
    setShow(false)
    setFilterPC(filterPClocal)
    setFilterTag(filterTaglocal)
  }
  const handleReset = () => {
    setShow(false)
    setFilterPC('')
    setFilterTag('')
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <div ref={ref}>
        <Button onClick={handleClick}>Filter</Button>

        <Overlay
          show={show}
          target={target}
          placement='bottom'
          container={ref}
          containerPadding={20}
        >
          <Popover id='popover-contained'>
            <Popover.Header as='h3'>
              <Row className='d-flex flex-column flex-wrap justify-content-between w-100 flex-sm-row'>
                <Col>Фильтры </Col>
                <Col className='d-flex justify-content-end  px-0'>
                  <CloseButton onClick={() => setShow(false)} />
                </Col>
              </Row>
            </Popover.Header>
            <Popover.Body>
              <strong>Тип ПК</strong>
              <Form.Select
                className='mt-2 mb-2'
                aria-label='Default select example'
                onChange={(e) => setFilterPClocal(e.target.value)}
              >
                <option>{filterPC ? filterPC : 'Выбрать'}</option>
                <option value='default'>Default</option>
                <option value='vm_host'>vm_host</option>
                <option value='vm_guest'>vm_guest</option>
              </Form.Select>
              <strong>Теги</strong>
              <Form.Select
                className='mt-2 mb-4'
                aria-label='Default select example'
                onChange={(e) => setFilterTaglocal(e.target.value)}
              >
                <option>{filterTag ? filterTag : 'Выбрать'}</option>
                <option className='text-danger' value='red tag'>
                  Red tag
                </option>
                <option className='text-success' value='green tag'>
                  Green tag
                </option>
                <option className='text-warning' value='yellow tag'>
                  Yellow tag
                </option>
              </Form.Select>
              <Button variant='secondary' onClick={handleReset}>
                Сбросить
              </Button>
              <Button variant='primary' onClick={handleSave}>
                Применить
              </Button>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  )
}

export default Filter
