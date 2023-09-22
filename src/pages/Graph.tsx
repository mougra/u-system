import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchData } from '../store/actions/dataActions'
import '../styled/CMPPage.scss'
import Line from '../components/Line'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { useDebounce } from '../hook/debounce'
import Search from '../components/Search'
import { searchNames } from '../store/slices/dataSlice'
import { DataRows } from '../models/models'
import Filter from '../components/Filter'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Graph() {
  const dispatch = useAppDispatch()
  const searchParams = new URLSearchParams(window.location.search)
  const paramValue = searchParams.get('search_val')
  const filterPCValue = searchParams.get('endpoint_type')
  const filterTagValue = searchParams.get('endpoint_tag')

  const {
    error,
    loading,
    rows,
    searchRows,
    search_val,
    endpoint_tag,
    endpoint_type,
  } = useAppSelector((state) => state.data)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [rowIDToEdit, setRowIDToEdit] = useState<number>(0)

  const [search, setSearch] = useState(paramValue ? paramValue : '')
  const [filterPC, setFilterPC] = useState(filterPCValue ? filterPCValue : '')
  const [filterTag, setFilterTag] = useState(
    filterTagValue ? filterTagValue : ''
  )
  const debounced = useDebounce(search)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  useEffect(() => {
    if (rows) {
      dispatch(searchNames({ debounced, filterPC, filterTag }))
      if (!debounced && !filterPC && !filterTag) {
        navigate(`/u-system/cmdb`)
      }
      if (debounced && filterPC && filterTag) {
        navigate(
          `/u-system/endpoints?search_val=${debounced}&endpoint_type=${filterPC}&endpoint_tag=${filterTag}`
        )
      }
      if (debounced && !filterPC && !filterTag) {
        navigate(`/u-system/endpoints?search_val=${debounced}`)
      }
      if (!debounced && filterPC && !filterTag) {
        navigate(`/u-system/endpoints?endpoint_type=${filterPC}`)
      }
      if (!debounced && !filterPC && filterTag) {
        navigate(`/u-system/endpoints?endpoint_tag=${filterTag}`)
      }
      if (debounced && filterPC && !filterTag) {
        navigate(
          `/u-system/endpoints?search_val=${debounced}&endpoint_type=${filterPC}`
        )
      }
      if (debounced && !filterPC && filterTag) {
        navigate(
          `/u-system/endpoints?search_val=${debounced}&endpoint_tag=${filterTag}`
        )
      }
      if (!debounced && filterPC && filterTag) {
        navigate(
          `/u-system/endpoints?endpoint_type=${filterPC}&endpoint_tag=${filterTag}`
        )
      }
    }
  }, [debounced, filterPC, filterTag])

  const handleRemoveRow = (rowID: any) => {}
  const handleAddRow = (rowID: number) => {}

  const [page, setPage] = useState(1)

  const paginateHandler = (page: number): void => {
    setPage(page)
  }

  let pageTotal =
    debounced || endpoint_tag || endpoint_type
      ? searchRows
        ? searchRows.length / 9
        : 1
      : rows
      ? rows.length / 9
      : 1

  return (
    <>
      <div className='table-main'>
        <h1 className='h1-title'>Серверы и ПК</h1>
        <div className='mt-4 flex'>
          <Row className='d-flex flex-column flex-wrap justify-content-around w-100 flex-sm-row'>
            <Col>
              <Search page={page} search={search} setSearch={setSearch} />{' '}
            </Col>
            <Col>
              <Filter
                filterPC={filterPC}
                setFilterPC={setFilterPC}
                filterTag={filterTag}
                setFilterTag={setFilterTag}
              />
            </Col>
          </Row>
        </div>

        <div className='table-info-title'>
          <div className='table-level'></div>
          <div className='table-namework'>Название</div>
          <div className='table-3'>Тип</div>
          <div className='table-4'>Расположение</div>
          <div className='table-5'>Теги</div>
          <div className='table-6'>Дата создания</div>
          <div className='table-7'>Дата обновления</div>
        </div>
        {loading && <p className='loading'>Loading...</p>}
        {error && (
          <p className='error'>
            Error
            <br /> {error}
          </p>
        )}
        {!error && !loading && (
          <div>
            {!debounced &&
              !filterPC &&
              !filterTag &&
              rows &&
              rows
                .slice((page - 1) * 9, page * 9)
                .map((row: DataRows) => (
                  <Line
                    key={row.id}
                    row={row}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    rowIDToEdit={rowIDToEdit}
                    setRowIDToEdit={setRowIDToEdit}
                    isOpenMode={isOpenMode}
                    setIsOpenMode={setIsOpenMode}
                    handleRemoveRow={handleRemoveRow}
                    handleAddRow={handleAddRow}
                  />
                ))}
            {(debounced || filterPC || filterTag) &&
              searchRows.length >= 1 &&
              searchRows
                .slice((page - 1) * 9, page * 9)
                .map((row: DataRows) => (
                  <Line
                    key={row.id}
                    row={row}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    rowIDToEdit={rowIDToEdit}
                    setRowIDToEdit={setRowIDToEdit}
                    isOpenMode={isOpenMode}
                    setIsOpenMode={setIsOpenMode}
                    handleRemoveRow={handleRemoveRow}
                    handleAddRow={handleAddRow}
                  />
                ))}
            {debounced && searchRows.length === 0 && (
              <div className='mx-auto w-75 fs-3 text-info mt-4'>
                Усп. Кажется такого заголовка поста не сущесвтует. Только без
                паники!
              </div>
            )}
          </div>
        )}
        <div className='mx-auto mb-5 d-flex justify-content-center mt-4'>
          <PaginationControl
            page={page}
            between={3}
            total={pageTotal}
            limit={1}
            changePage={(pageNumber) => paginateHandler(pageNumber)}
            ellipsis={2}
          />
        </div>
      </div>
    </>
  )
}

export default Graph
