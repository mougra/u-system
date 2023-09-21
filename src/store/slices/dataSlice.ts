import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataRows } from './../../models/models'

interface ListState {
  loading: boolean
  error: string
  rows: DataRows[]
  searchRows: DataRows[]
  search_val: string
  endpoint_type: string
}
interface PayloadActionProps {
  data: DataRows[]
  search: string
}

const initialState: ListState = {
  loading: false,
  error: '',
  rows: [],
  searchRows: [],
  search_val: '',
  endpoint_type: '',
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
    searchNames(state, action: PayloadAction<PayloadActionProps>) {
      state.search_val = action.payload.search

      state.searchRows = state.rows.filter((row: DataRows) =>
        row.status.includes(state.search_val.toLowerCase())
      )
    },
    // searchNames(state, action: PayloadAction<any>) {
    //   state.searchRows = state.rows.filter((row: DataRows) =>
    //     row.status.includes(action.payload.toLowerCase())
    //   )
    // },
  },
})

export default entitySlice.reducer
export const { searchNames } = entitySlice.actions
