import '../styled/CMPPage.scss'
import { DataRows } from '../models/models'
import { useEffect, useRef, useState } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
// import { fetchUpdateRow } from '../store/actions/characterActions'
import { useAppDispatch } from '../hook/redux'
import Form from 'react-bootstrap/Form'

interface ModalProps {
  row: DataRows
  isEditMode: boolean
  setIsEditMode(active: boolean): void
  rowIDToEdit: number | undefined
  setRowIDToEdit(active: any): void
  isOpenMode: boolean
  setIsOpenMode(active: any): void
  handleRemoveRow(active: any): void
  handleAddRow(active: any): void
}

function Row({
  row,
  isEditMode,
  setIsEditMode,
  rowIDToEdit,
  setRowIDToEdit,
  isOpenMode,
  setIsOpenMode,
  handleRemoveRow,
  handleAddRow,
}: ModalProps) {
  const dispatch = useAppDispatch()

  const [rowsState, setRowsState] = useState(row)
  let editedRow: DataRows | undefined = rowsState

  const handleEdit = (rowID: any) => {
    if (isEditMode !== true) {
      setIsEditMode(true)
      editedRow = rowsState
      setRowIDToEdit(rowID)
    }
  }

  const handleOnChangeField = (
    event: any,
    // ChangeEvent<HTMLInputElement>
    rowID: any
  ) => {
    event.preventDefault()

    let { name: fieldName, value } = event.target
    // if (fieldName != 'rowName') {
    //   value = Number(value)
    // }

    let rowCopy: any = structuredClone(editedRow)

    if (fieldName == 'status') rowCopy.status = value
    if (fieldName == 'tags') rowCopy.tags = value
    if (fieldName == 'type') rowCopy.type = value
    if (fieldName == 'dateCreate') rowCopy.dateCreate = value
    if (fieldName == 'dateRefresh') rowCopy.dateRefresh = value

    editedRow = rowCopy
  }

  const handleSaveRowChanges = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditMode(false)

      if (editedRow === undefined) {
        return rowsState
      }
      // editedRow.isNew = false

      setRowsState(editedRow)

      editedRow = undefined
      setRowIDToEdit(undefined)
      setIsOpenMode(true)
    }
  }

  return (
    <>
      <div
        className='table-info'
        onDoubleClick={() => handleEdit(rowsState.id)}
      >
        {!isOpenMode && !isEditMode ? (
          <div className='table-level'>
            <div
              className={`table-level-container0`}
              onMouseLeave={() => setIsOpenMode(true)}
            >
              <img
                src={levelDoc}
                alt='Display card line'
                className={`table-img0`}
                // onClick={() => handleAddRow(rowsState.row.id)}
              />

              <img
                src={levelDeletesvg}
                alt='Display card line'
                className='table-img0'
                // onClick={() => handleRemoveRow(rowsState.row.id)}
              />
            </div>
          </div>
        ) : (
          <div className='table-level'>
            <img
              src={levelDoc}
              alt='Display card line'
              className={`table-img0`}
              onMouseEnter={() => setIsOpenMode(false)}
            />
          </div>
        )}
        {isEditMode && rowIDToEdit === rowsState.id ? (
          <input
            className='table-namework input'
            type='text'
            name='status'
            defaultValue={editedRow ? editedRow.status : rowsState.status}
            onChange={(e) => handleOnChangeField(e, rowsState.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-namework'>{rowsState.status}</div>
        )}
        {isEditMode && rowIDToEdit === rowsState.id ? (
          <input
            className='table-3 input'
            type='text'
            defaultValue={editedRow ? editedRow.type : rowsState.type}
            name='type'
            onChange={(e) => handleOnChangeField(e, rowsState.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-3'>{rowsState.type}</div>
        )}
        {isEditMode && rowIDToEdit === rowsState.id ? (
          <input
            className='table-4 input'
            type='text'
            defaultValue={editedRow ? editedRow.location : rowsState.location}
            name='tags'
            onChange={(e) => handleOnChangeField(e, rowsState.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-4'>{rowsState.location}</div>
        )}
        {isEditMode && rowIDToEdit === rowsState.id ? (
          // <input
          //   className='table-5 input'
          //   type='text'
          //   defaultValue={editedRow ? editedRow.tags : rowsState.tags}
          //   name='tags'
          //   onChange={(e) => handleOnChangeField(e, rowsState.id)}
          //   onKeyDown={(e) => handleSaveRowChanges(e)}
          // />
          <Form.Select
            className='table-5 bg-secondary'
            size='lg'
            aria-label='Default select example'
            // defaultValue={editedRow ? editedRow.tags : rowsState.tags}
            onChange={(e) =>
              console.log(e, rowsState.id, e, rowsState, e.target.value)
            }
          >
            <option>{editedRow ? editedRow.tags : rowsState.tags}</option>
            <option value='1'>red tag</option>
            <option value='2'>green tag</option>
            <option value='3'>yellow tag</option>
          </Form.Select>
        ) : (
          <div className='table-5'>{rowsState.tags}</div>
        )}

        {isEditMode && rowIDToEdit === rowsState.id ? (
          <input
            className='table-6 input'
            type='text'
            defaultValue={
              editedRow ? editedRow.dateCreate : rowsState.dateCreate
            }
            name='dateCreate'
            onChange={(e) => handleOnChangeField(e, rowsState.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-6'>{rowsState.dateCreate}</div>
        )}
        {isEditMode && rowIDToEdit === rowsState.id ? (
          <input
            className='table-7 input'
            type='text'
            defaultValue={
              editedRow ? editedRow.dateRefresh : rowsState.dateRefresh
            }
            name='dateRefresh'
            onChange={(e) => handleOnChangeField(e, rowsState.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-7'>{rowsState.dateRefresh}</div>
        )}
      </div>
    </>
  )
}

export default Row
