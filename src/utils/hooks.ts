import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../store/configureStore';
import { RootState } from '../reducers';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
