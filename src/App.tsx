import React,{useState,useEffect} from "react";
import "./App.css";
import SideBar from "./component/SideBar";
import Modal from './component/Modal'
import { ListParams } from './model';
import userApi from './api/api';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [params, setParams] = useState<ListParams>({
    page: 1,
    limit: 5,
  });
  const classes = useStyles();

  const [dataUser, setDataUse]: any = useState([]);
  const getUserData = async (params: ListParams) => {
    const data_params: ListParams = {
      page: params.page,
      limit: params.limit,
    };
    const res = await userApi.getAll(data_params);
    if (res) {
      setDataUse(res);
    }
  };
  useEffect(() => {
    try {
      getUserData(params);
    } catch (error) {}
  }, [params]);
  const handleChangePage = (event: any, value: any) => {
    setParams({
      ...params,
      page: value,
    });
  };
  return (
    <div className="main">
      <SideBar />
      <div className="todolist">
        <div className="todolist-header">Task List </div>
        <table>
          <thead>
            <div className="action">
              <Modal />
            </div>
          </thead>
          <tbody>
            <tr className="active">
              <th>Id</th>
              <th>UseName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
            </tr>
            {dataUser?.map((item: any) => {
              return (
                <tr key={item?.id}>
                  <th>{item?.id}</th>
                  <th>{item?.useName}</th>
                  <th>{item?.email}</th>
                  <th>{item?.phone}</th>
                  <th>{item?.posotion}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          count={5}
          page={params.page}
          onChange={handleChangePage}
          className={classes.Pagination}
        />
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
