import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const SpreadSheet = () => {
  const [data, setData] = useState([
    ["", "Column 1", "Column 2", "Column 3", "Column 4"],
    ["Row 1", "row 1 data", "", "", ""],
    ["Row 2", "", "", "", ""],
    ["Row 3", "", "", "", "row 3 last"],
    //5. new row
  ]);

  const [editCurrentCell, setEditCurrentCell] = useState(null);
  const [cellOptions, setCellOptions] = useState(null);
  const handleEditCurrentCell = (rowIndex: number, columnIndex: number) => {
    setEditCurrentCell({
      row: rowIndex,
      column: columnIndex,
    });
  };
  const handleCellValueChange = (event, rowIndex, columnIndex) => {
    let overridePrevData = [...data];
    overridePrevData[rowIndex][columnIndex] = event.target.value;
    setData(overridePrevData);
  };
  //1. getting the index of the row
  //2. delete the whole row
  const deleteRow = (rowIndex) => {
    let prevData = [...data];
    prevData[rowIndex] = prevData[prevData.length - 1];
    prevData.pop();
    setData(prevData);
  };
  const [getColumnIndex, setGetColumnIndex] = useState(null);
  const deleteColumn = () => {
    let prevData = [...data];
    let allSelectedColumns = prevData.map((row) => {
      row.splice(getColumnIndex, 1);
    });
    setData(prevData);
    console.log(allSelectedColumns);
  };
  const addRow = () => {
    // Look at this as create a new row, based on the header of the table
    const newRow = Array(data[0].length).fill("");
    newRow[0] = "untitled";
    setData([...data, newRow]);
  };
  const addColumn = () => {
    let newColumn = data.map((allPrevRowData) => [...allPrevRowData, ""]);
    setData(newColumn);
  };

  const [contextMenuPos, setContextMenuPos] = useState({ left: 0 });
  const [isContextMenu, setIsContextMenu] = useState(false);
  const contextMenu = (event: any) => {
    event.preventDefault();
    setIsContextMenu(true);
    setContextMenuPos({
      left: event["clientX"],
    });
    console.log(event);
  };

  return (
    <div className="grid grid-cols-12 px-5 ">
      <div className="controlSheets col-span-2 px-3 py-5">
        <div className="search">
          <input type="text" placeholder="Search" className="w-full" />
        </div>

        <div className="allSheets">
          <div className="addNew flex items-center justify-between font-bold my-3">
            <h3>Create New</h3>
            <p>+</p>
          </div>

          <div className="listOfSheets">
            <ul>
              <li className="my-2 cursor-pointer">DataBase 1</li>
              <li className="my-2 cursor-pointer">DataBase 1</li>
            </ul>
          </div>
        </div>
      </div>

      <table className="col-span-10 relative">
        <div className="">
          <button
            onClick={addColumn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Column
          </button>
        </div>
        {data &&
          data.map((row, rowIndex) => (
            <>
              <tr
                key={`row-${rowIndex}`}
                onMouseEnter={() => setCellOptions(rowIndex)}
                onMouseLeave={() => {
                  setCellOptions(null);
                  setIsContextMenu(false);
                }}
                onContextMenu={(event) => contextMenu(event)}
                style={{
                  background: cellOptions === rowIndex ? "#efefef" : "",
                }}
                className="relative"
              >
                {row.map((column, columnIndex) => (
                  <td
                    key={`column-${rowIndex}-${columnIndex}`}
                    onDoubleClick={() =>
                      handleEditCurrentCell(rowIndex, columnIndex)
                    }
                    onContextMenu={() => setGetColumnIndex(columnIndex)}
                  >
                    {editCurrentCell?.row === rowIndex &&
                    editCurrentCell?.column === columnIndex ? (
                      <input
                        type="text"
                        autoFocus
                        value={column}
                        onChange={(e) =>
                          handleCellValueChange(event, rowIndex, columnIndex)
                        }
                        onBlur={(e) => setEditCurrentCell(null)}
                      />
                    ) : (
                      column
                    )}
                  </td>
                ))}

                {cellOptions === rowIndex && isContextMenu && (
                  <div
                    className="option rounded-md border-solid border-2"
                    style={{
                      left: `${contextMenuPos["left"]}` - 300,
                      top: "1em",
                    }}
                  >
                    <ul>
                      <li
                        className="flex items-center cursor-pointer"
                        onClick={() => deleteRow(rowIndex)}
                      >
                        <TrashIcon className="icon mr-1" />
                        <p>Delete Row</p>
                      </li>
                      <li
                        className="flex items-center cursor-pointer"
                        onClick={() => deleteColumn()}
                      >
                        <TrashIcon className="icon mr-1" />
                        <p>Delete Column</p>
                      </li>
                    </ul>
                  </div>
                )}
              </tr>
            </>
          ))}
        <button
          onClick={addRow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Row
        </button>
      </table>
    </div>
  );
};

export default SpreadSheet;
