import { useMemo } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { hideLoading, showLoading } from '../redux/slice/loadingSlice';

export default function useLoading() {
    const dispatch = useAppDispatch();

    return useMemo(() => {
        return {
          showLoading: () => dispatch(showLoading()),
          hideLoading: () => dispatch(hideLoading()),
        };
    }, [dispatch]);
}
