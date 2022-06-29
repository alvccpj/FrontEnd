import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";
import api from "../../services/axios";

const endpoint = "/professors";

const columns = [
  { value: "ID", id: "id" },
  { value: "Name", id: "name" },
  { value: "CPF", id: "cpf" },
  {
    value: "Department",
    id: "department",
    render: (department) => department.name,
  },
];

const INITIAL_STATE = { id: 0, name: "", cpf: "", department: 0 };

const Professors = () => {
  const [visible, setVisible] = useState(false);
  const [professor, setProfessor] = useState(INITIAL_STATE);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api
      .get("/departments")
      .then((response) => {
        // se o back der sucesso
        setDepartments(response.data);
      })
      .catch((error) => {
        // se o back der erro
        toast.error(error.message);
      });
  }, []);

  const actions = [
    {
      name: "Edit",
      action: ({ id, name, cpf, department: { id: departmentId } }) => {
        setProfessor({ id, name, cpf, department: { id: departmentId } });
        setVisible(true);
      },
    },
    {
      name: "Remove",
    },
  ];
};

export default Professors;
