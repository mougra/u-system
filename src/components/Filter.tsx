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

function Sort(isSorted: any) {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleClick = (event: any) => {
    setShow(!show)
    setTarget(event.target)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function ChangeTypePC(e: any) {
    console.log('typepc', e.target.value)
  }

  return (
    <>
      {/* <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <span>Фильтры</span>
          <Form.Select aria-label='Default select example'>
            <option>Тип ПК</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </Form.Select>
          <Form.Select aria-label='Default select example'>
            <option>Open this select menu</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </Form.Select>
        </Dropdown.Menu>
      </Dropdown> */}
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
                onChange={(e) => ChangeTypePC(e)}
              >
                <option>Выбрать</option>
                <option value='default'>Default</option>
                <option value='vm_host'>vm_host</option>
                <option value='vm_guest'>vm_guest</option>
              </Form.Select>
              <strong>Теги</strong>
              <Form.Select
                className='mt-2 mb-4'
                aria-label='Default select example'
              >
                <option>Выбрать</option>
                <option className='text-danger' value='1'>
                  Red tag
                </option>
                <option className='text-success' value='2'>
                  Green tag
                </option>
                <option className='text-warning' value='3'>
                  Yellow tag
                </option>
              </Form.Select>
              <Button variant='secondary' onClick={handleClose}>
                Сбросить
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Применить
              </Button>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  )
}

export default Sort
