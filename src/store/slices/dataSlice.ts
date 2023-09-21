import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataRows } from './../../models/models'

interface ListState {
  loading: boolean
  error: string
  rows: DataRows[]
  searchRows: DataRows[]
  search_val: string
  endpoint_type: string
  endpoint_tag: string
}
interface searchFilterProps {
  debounced: string
  filterPC: string
  filterTag: string
}

const initialState: ListState = {
  loading: false,
  error: '',
  rows: [],
  searchRows: [],
  search_val: '',
  endpoint_type: '',
  endpoint_tag: '',
}

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    fetching(state: any) {
      state.loading = true
    },
    fetchSuccess(state: any, action: PayloadAction<DataRows[]>) {
      state.loading = false
      state.rows = action.payload
      state.error = ''
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    searchNames(state, action: PayloadAction<searchFilterProps>) {
      state.search_val = action.payload.debounced
      state.endpoint_type = action.payload.filterPC
      state.endpoint_tag = action.payload.filterTag

      state.searchRows = state.rows.filter((row: DataRows) =>
        row.status.includes(state.search_val.toLowerCase())
      )
      if (action.payload.debounced) {
        state.searchRows = state.searchRows.filter((row: DataRows) =>
          row.type.includes(state.endpoint_type)
        )
      } else {
        state.searchRows = state.rows.filter((row: DataRows) =>
          row.type.includes(state.endpoint_type)
        )
      }
      if (action.payload.debounced || action.payload.filterPC) {
        state.searchRows = state.searchRows.filter((row: DataRows) =>
          row.tags.includes(state.endpoint_tag)
        )
      } else {
        state.searchRows = state.rows.filter((row: DataRows) =>
          row.tags.includes(state.endpoint_tag)
        )
      }
    },
  },
})

export default entitySlice.reducer
export const { searchNames } = entitySlice.actions
