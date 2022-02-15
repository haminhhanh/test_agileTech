import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./component/SideBar";
import Modal from "./component/Modal";
import { ListParams } from "./model";
import userApi from "./api/api";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { rejects } from "assert";

let data: any = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    id: i,
    email: `example_${i}@gmail.com`,
    name: `Example ${i}`,
    phone: "09123456790",
    position: "Dev",
  });
}

interface Result {
  total: number;
  list: any[];
}

const asyncFn = ({ pageSize, offset }: any): Promise<Result> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: data.length,
        list: data.slice(offset, offset + pageSize),
      });
    }, 1000);
  });

const addFn = (item: any): Promise<{ success: boolean }> =>
  new Promise((resolve, reject) => {
    try {
      let newData = [item, ...data];
      data = newData;
      resolve({ success: true });
    } catch (error) {
      reject({ success: false });
    }
  });

function App() {
  const [offset, setOffset] = useState<number>(0);
  const classes = useStyles();

  const [dataUser, setDataUser]: any = useState([]);

  const getUserData = async (offset: number) => {
    const res = await asyncFn({ offset, pageSize: 5 });
    if (res) {
      setDataUser(res);
    }
    console.log(res);
  };

  useEffect(() => {
    try {
      getUserData(offset);
    } catch (error) {}
  }, [offset]);

  const handleChangePage = (event: any, value: any) => {
    setOffset((value - 1) * 5);
  };

  const refresh = () => {
    setOffset(0);
    getUserData(0);
  };
  console.log("offset", offset);
  return (
    <div className="main">
      <SideBar />
      <div className="todolist">
        <div className="todolist-header">Task List </div>
        <table>
          <thead>
            <div className="action">
              <Modal
                addFn={addFn}
                onSuccess={refresh}
                total={dataUser?.total ? dataUser.total : 0}
              />
            </div>
          </thead>
          <tbody>
            <tr className="active">
              <th>Id</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
            </tr>
            {dataUser?.list?.map((item: any) => {
              return (
                <tr key={item?.id}>
                  <th>{item?.id}</th>
                  <th>{item?.name}</th>
                  <th>{item?.email}</th>
                  <th>{item?.phone}</th>
                  <th>{item?.position}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        {dataUser?.total && (
          <Pagination
            count={(dataUser?.total - (dataUser?.total % 5)) / 5}
            page={offset / 5 + 1}
            onChange={handleChangePage}
            className={classes.Pagination}
          />
        )}
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  Pagination: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export default App;
