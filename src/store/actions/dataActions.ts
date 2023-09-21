import { AppDispatch } from '..'
import { entitySlice } from '../slices/dataSlice'
import data from '../../data.json'

export const fetchData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(entitySlice.actions.fetching())
      dispatch(entitySlice.actions.fetchSuccess(data))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}
