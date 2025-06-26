'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useLazyGetTodayResultStatusQuery } from '@/app/apis/ticket';

const TodayResultStatus: React.FC = () => {
  const [isUpdated, setIsUpdated] = useState<boolean | null>(null);
  const [fetchTodayResult, isFetching] = useLazyGetTodayResultStatusQuery();

  useEffect(() => {
    fetchTodayResult().then((response) => {
      if (response.data) {
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    });
  }, [fetchTodayResult]);

  return (
    <div className="flex items-center">
      { isUpdated ? (
        <CheckCircleIcon className="text-green-500 w-6 h-6" />
      ) : (
        <ExclamationCircleIcon className="text-gray-500 w-6 h-6" />
      )}
    </div>
  );
};

export default TodayResultStatus;