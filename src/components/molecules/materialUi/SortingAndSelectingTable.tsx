import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

type Data = {
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  test5: string;
  test6: string;
  test7: string;
  test8: string;
};

const createData = (
  test1: string,
  test2: string,
  test3: string,
  test4: string,
  test5: string,
  test6: string,
  test7: string,
  test8: string
): Data => {
  return { test1, test2, test3, test4, test5, test6, test7, test8 };
};

const rows = [
  createData(
    "dummy1",
    "dummy2",
    "dummy3",
    "dummy4",
    "dummy5",
    "dummy6",
    "dummy7",
    "dummy8"
  ),
  createData(
    "dummy11",
    "dummy12",
    "dummy13",
    "dummy14",
    "dummy15",
    "dummy16",
    "dummy17",
    "dummy18"
  ),
  createData(
    "dummy21",
    "dummy22",
    "dummy23",
    "dummy24",
    "dummy25",
    "dummy26",
    "dummy27",
    "dummy28"
  ),
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    customSelectedRow: {
      backgroundColor: "red !important",
    },
  })
);

const SortingAndSelectingTable = () => {
  const classes = useStyles();
  // 行の選択状態を管理
  const [selected, setSelected] = useState<string[]>([]);

  // 行選択状態の更新
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    // selected内を検索し何行目の行と一致しているかを確認
    const selectedIndex = selected.indexOf(name);
    console.log(selectedIndex);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      // 選択した行がselected内に存在しない場合、newSelectedに追加
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      // 選択した行がselected内に存在しているかつ、selectedの最初の行である場合、選択行以外の配列をnewSelectedに追加
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // 選択した行がselected内に存在しているかつ、selectedの最後の行である場合、選択行以外の配列をnewSelectedに追加
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // 選択した行がselected内に存在しているかつ、selectedの中間の行である場合、選択行以外の配列をnewSelectedに追加
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // 行が選択されているかを確認
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">test1</TableCell>
              <TableCell align="left">test2</TableCell>
              <TableCell align="left">test3</TableCell>
              <TableCell align="left">test4</TableCell>
              <TableCell align="left">test5</TableCell>
              <TableCell align="left">test6</TableCell>
              <TableCell align="left">test7</TableCell>
              <TableCell align="left">test8</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.test1);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.test1)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.test1}
                  selected={isItemSelected}
                  className={isItemSelected ? classes.customSelectedRow : ""}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.test1}
                  </TableCell>
                  <TableCell align="left">{row.test2}</TableCell>
                  <TableCell align="left">{row.test3}</TableCell>
                  <TableCell align="left">{row.test4}</TableCell>
                  <TableCell align="left">{row.test5}</TableCell>
                  <TableCell align="left">{row.test6}</TableCell>
                  <TableCell align="left">{row.test7}</TableCell>
                  <TableCell align="left">{row.test8}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default SortingAndSelectingTable;
