import React from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import "./CustomTable.css";
import InputField from "./InputField";

const CustomTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, globalFilter: "" },
    },
    useGlobalFilter,
    usePagination
  );

  function GlobalFilter({ globalFilter, setGlobalFilter }) {
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      document.getElementById("global-search").focus();
    }, 1000);

    return (
      <InputField
        id="global-search"
        disableLabel
        placeholder="Search Patient..."
        value={value || ""}
        onChangeHandler={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        leftIcon={<i className="fas fa-search"></i>}
      />
    );
  }

  return (
    <div className="table-container">
      <div className="table-search">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {pageCount > 0 ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <i className="fas fa-angle-double-left" />
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className="fas fa-angle-left" />
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {pageIndex + 1}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <i className="fas fa-angle-right" />
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <i className="fas fa-angle-double-right" />
        </button>{" "}
        <div
          style={{
            width: "250px",
            display: "flex",
            alignItems: "center",
          }}
        >
          | Go to page:{" "}
          <InputField
            style={{ width: "25%", marginTop: "0px", marginLeft: "10px" }}
            type="number"
            value={pageIndex + 1}
            onChangeHandler={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </div>{" "}
        <div className="select">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div className="select-arrow">
            <i className="fas fa-angle-down"></i>
          </div>
        </div>
        {/* <select
          
        >
         
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default CustomTable;
