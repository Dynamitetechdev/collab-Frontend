import { useState } from "react";

const SpreadSheet = () => {
  const [data, setData] = useState([
    ["", "Column 1", "Column 2", "Column 3", "Column 4"],
    ["Row 1", "row 1 data", "", "", ""],
    ["Row 2", "", "", "", ""],
    ["Row 3", "", "", "", "row 3 last"],
  ]);

  const [editCurrentCell, setEditCurrentCell] = useState(null);

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
  //   const handleCellBlur = () => {
  //     setEditingCell(null);
  //   };

  //   const addColumn = () => {
  //     const newData = data.map((row) => [...row, ""]);
  //     setData(newData);
  //   };

  //   const addRow = () => {
  //     const newRow = Array(data[0].length).fill("");
  //     const newData = [...data, newRow];
  //     setData(newData);
  //   };
  const addRow = () => {};
  const addColumn = () => {};
  return (
    <div>
      {/* <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, columnIndex) => (
                <td
                  key={`cell-${rowIndex}-${columnIndex}`}
                  onDoubleClick={() =>
                    handleCellDoubleClick(rowIndex, columnIndex)
                  }
                >
                  {editingCell?.row === rowIndex &&
                  editingCell?.column === columnIndex ? (
                    <input
                      autoFocus
                      type="text"
                      value={cell}
                      onChange={(event) =>
                        handleCellValueChange(event, rowIndex, columnIndex)
                      }
                      onBlur={handleCellBlur}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}

      <table>
        {data.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.map((column, columnIndex) => (
              <td
                key={`column-${rowIndex}-${columnIndex}`}
                onDoubleClick={() =>
                  handleEditCurrentCell(rowIndex, columnIndex)
                }
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
          </tr>
        ))}
      </table>
      <div>
        <button onClick={addColumn}>Add Column</button>
        <button onClick={addRow}>Add Row</button>
      </div>
    </div>
  );
};

export default SpreadSheet;
