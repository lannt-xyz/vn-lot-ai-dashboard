'use client';

import { RootState } from '@/app/redux/store';
import { useSelector } from 'react-redux';

const CircularProgress = () => {
    const showLoading = useSelector((state: RootState) => state.loading);
    return (
        <>
            {showLoading?.show && (
                <div id='loading' className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <img src="/loading.svg" alt="Loading" className="h-32 w-32 animate-spin-slow" />
                </div>
            )}
        </>
    );
};

export default CircularProgress;
