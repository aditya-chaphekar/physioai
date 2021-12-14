import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTable from "../components/CustomTable";
import { InputButton } from "../components/InputField";

const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = React.useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("loggedIn") === "false" ||
      localStorage.getItem("loggedIn") === null
    ) {
      localStorage.removeItem("userData");
      navigate("/login");
    }
    getData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient Code",
        accessor: "patient_code",
      },
      {
        Header: "Name",
        accessor: "first_name",
        Cell: ({ row }) =>
          `${row.original.first_name} ${row.original.last_name}`,
      },
      {
        Header: "Date of Birth",
        accessor: "dob",
      },
      {
        Header: "Mobile No",
        accessor: "mobile_no",
      },
    ],
    []
  );

  const getData = async () => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
        Cookie:
          "csrftoken=q0FqcIRO1do5fs8c7A5xOA0tq9PwYicn24k7Ajv7AX0oVn9FUgUwI7WLtUwXxVXE; sessionid=wjtbes2w68vagjm123nj7jreughzpzhf; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.bdfW8B6lG7RhPmHCtO6rPgf3IYlDwAJc7LUKtfTE2eU; tran=satmis1000003",
      };
      const payload = { id: 1 };

      const { data } = await axios.post(
        "https://myphysio.digitaldarwin.in/api/get-patient/",
        payload,
        {
          headers: headers,
        }
      );
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div>
      <InputButton
        onClickHandler={logout}
        btnStyle={{ backgroundColor: "#f5f5f5" }}
        style={{ justifyContent: "start", marginLeft: "20px" }}
      >
        Logout <i style={{ fontSize: "12px" }} className="fas fa-sign-out"></i>
      </InputButton>
      <CustomTable columns={columns} data={tableData} />
    </div>
  );
};

export default Home;
