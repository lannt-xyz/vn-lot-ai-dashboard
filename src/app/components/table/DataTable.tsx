import React, { forwardRef, useEffect, useImperativeHandle } from "react";

import { DataRow, DataHeader } from "@/app/global.d";


interface DataTableProps {
  header: DataHeader[];
  data: DataRow[];
  dataKeyIdentity: string;
  showCheckbox?: boolean;
  selectedChange?: (selectedDataRows: DataRow[]) => void;
  width?: string;
  height?: string;
  background?: string;
}

export interface DataTableRef {
  clearSelectedDataRows: () => void;
  removeSelectedItem: (id: string) => void;
}

export const DataTable = forwardRef<DataTableRef, DataTableProps>((props, ref) => {
  const {
    header,
    data,
    dataKeyIdentity,
    showCheckbox,
    selectedChange,
    width,
    height,
    background,
  } = props;
  const [selectedDataRows, setSelectedDataRows] = React.useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allSelected, setAllSelected] = React.useState(false);


  useImperativeHandle(ref, () => ({
    clearSelectedDataRows: () => {
      setSelectedDataRows([]);
    },
    removeSelectedItem: (id: string) => {
      setSelectedDataRows((prevSelectedDataRows) => {
        return prevSelectedDataRows.filter((row) => row[dataKeyIdentity] !== id);
      });
    },
  }));

  const isSelectedAll = () => selectedDataRows.filter((row) => data.map((d) => d[dataKeyIdentity] as string).includes(row[dataKeyIdentity] as string)).length === data.length;
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    setAllSelected(isSelectedAll());
  }, [selectedDataRows, data, dataKeyIdentity]);

  useEffect(() => {
    if (selectedChange) {
      selectedChange(selectedDataRows);
    }
  }, [selectedDataRows, selectedChange]);

  const handleCheckboxChange = (row: DataRow, checked: boolean) => {
    setSelectedDataRows((prevSelectedDataRows) => {
      const updatedSelectedDataRows = new Set(prevSelectedDataRows);
      if (checked) {
        updatedSelectedDataRows.add(row);
      } else {
        updatedSelectedDataRows.delete(row);
      }
      return Array.from(updatedSelectedDataRows);
    });
  };

  function handleSelectAll(id: string, checked: boolean): void {
    if (checked) {
      setSelectedDataRows((prevSelectedDataRows) => {
        const updatedSelectedDataRows = new Set(prevSelectedDataRows);
        data.forEach((row) => updatedSelectedDataRows.add(row));
        return Array.from(updatedSelectedDataRows);
      });
    } else {
      const allIds = new Set(data.map((d) => d[dataKeyIdentity] as string));
      setSelectedDataRows((prevSelectedDataRows) => {
        return prevSelectedDataRows.filter((r) => !allIds.has(r[dataKeyIdentity] as string));
      });
    }
    setAllSelected(checked);
  }

  return (
    <>
      <div className="w-full bg-white rounded border border-gray-_5 px-5 py-2">
        <div className="flex-col flex w-full gap-4">
          <div className={`overflow-y-auto ${width ?? 'w-full'} ${height ?? 'h-[76vh]'}`} >
            <table className="table-auto font-light w-full text-sm">
              <thead className={`sticky top-0 ${background ?? 'bg-white'}`}>
                <tr className="text-left">
                  {header &&
                    header.map((h, i) => (
                      <th key={`h${i}['key']`} className={`px-2 ${h.widthClass ?? ''} ${h.align ? 'text-' + h.align : 'text-left'}`}>
                        {h.text}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className={`${background ?? 'bg-white'}`}>
                {data &&
                  data.map((d, i) => (
                    <tr key={`d${i}`} className="border-b border-gray-_5 hover:bg-gray-_7">
                      {header &&
                        header.map((h, j) => (
                          <td key={`d${i}c${j}`} className={`py-2 text-left ${h.dataAlign ? 'text-' + h.dataAlign : 'text-left'}`} >
                            <div className="w-[99%]" >
                              {h.columnType === 'node' ? d[h.key] : <span className={`${h.widthClass ?? ''} overflow-hidden whitespace-nowrap text-ellipsis px-2 block`}>{d[h.key]}</span>}
                            </div>
                          </td>
                        ))
                      }
                    </tr>
                  ))}
              </tbody>
            </table>
          </div >
        </div>
      </div>
    </>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;
export type { DataHeader, DataRow };

