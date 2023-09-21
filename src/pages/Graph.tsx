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

  const { error, loading, rows, searchRows } = useAppSelector(
    (state) => state.data
  )
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [rowIDToEdit, setRowIDToEdit] = useState<number>(0)

  const [search, setSearch] = useState(paramValue ? paramValue : '')
  const debounced = useDebounce(search)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  useEffect(() => {
    if (rows) {
      dispatch(searchNames({ data: rows, search: debounced }))
      if (debounced) {
        navigate(`/u-system/endpoints?search_val=${debounced}`)
      } else navigate(`/u-system/cmdb`)
    }
  }, [debounced])

  const handleRemoveRow = (rowID: any) => {}
  const handleAddRow = (rowID: number) => {}

  const [page, setPage] = useState(1)

  const paginateHandler = (page: number): void => {
    setPage(page)
    // if (!debounced) {
    //   fethPosts({ page: page })
    // }
  }

  let pageTotal = debounced
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
              <Search
                page={page}
                // sortPosts={sortPosts}
                // isSorted={isSorted}
                // setIsSorted={setIsSorted}
                search={search}
                setSearch={setSearch}
              />{' '}
            </Col>
            <Col>
              <Filter />
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
            {/* {!debounced &&
            !isSorted &&
            posts &&
            posts.map((post) => <Post key={post.id} post={post} />)}
          {!debounced &&
            isSorted &&
            sortPostsData &&
            sortPostsData.map((post) => <Post key={post.id} post={post} />)}
          {debounced &&
            searchedPosts.length > 0 &&
            searchedPosts
              .slice((page - 1) * 9, page * 9)
              .map((post) => <Post key={post.id} post={post} />)}
          {debounced && searchedPosts.length === 0 && (
            <div className='mx-auto w-75 fs-3'>
              Усп. Кажется такого заголовка поста не сущесвтует. Только без
              паники!
            </div>
          )} */}
            {!debounced &&
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
            {debounced &&
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
