import React from "react";

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

const DataTable: React.FC<DataTableProps> = ((props) => {
  const {
    header,
    data,
    width,
    height,
    background,
  } = props;

  return (
    <>
      <div className="w-full rounded border border-gray-300 px-5 py-2">
        <div className="flex-col flex w-full gap-4">
          <div className={`overflow-y-auto ${width ?? 'w-full'} ${height ?? 'h-[76vh]'}`} >
            <table className="table-auto font-light w-full">
              <thead className={`sticky top-0 ${background ?? ''}`}>
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
              <tbody className={`${background ?? ''}`}>
                {data &&
                  data.map((d, i) => (
                    <tr key={`d${i}`} className="border-b border-gray-300 hover:bg-gray-_7">
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

export type { DataHeader, DataRow };
export default DataTable;
