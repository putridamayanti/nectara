import {configureStore} from "@reduxjs/toolkit";
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from 'react-redux';
import ThemeSlice from "./slices/ThemeSlice";

const store = configureStore({
    reducer: {
        theme: ThemeSlice.reducer
    }
});

export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

export default store;
