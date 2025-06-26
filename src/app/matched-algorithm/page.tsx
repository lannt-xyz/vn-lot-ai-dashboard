'use client';

import React, { useEffect } from "react";
import AlgorithmChart from "../components/charts/AlgorithmChart";
import { useGetMatchedByAlgorithmQuery } from "../apis/algorithm";
import useLoading from "../hook/useLoading";

export default function MatchedAlgorithm() {
  const { data, isFetching } = useGetMatchedByAlgorithmQuery();
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    if (isFetching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isFetching]);

  return (
    <div className="flex flex-col w-full h-full pt-2">
      <AlgorithmChart rawData={data} />
    </div>
  );
}

