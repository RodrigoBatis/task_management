import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 35px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getTasks, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit && ref.current) {
      const task = ref.current;

      task.title.value = onEdit.title;
      task.description.value = onEdit.description;
      task.status.checked = onEdit.status === 1;
    }
  }, [onEdit, ref]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = ref.current;

    if (!task.title.value || !task.description.value) {
      return toast.warn("Preencher todos os campos!");
    }

    const payload = {
      title: task.title.value,
      description: task.description.value,
      status: task.status.checked ? 1 : 0, 
    };

    if (onEdit) {
      await axios
        .put("http://localhost:8080/tasks/" + onEdit.id, payload)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8080/tasks", payload)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    task.title.value = "";
    task.description.value = "";
    task.status.checked = false; 

    setOnEdit(null);
    getTasks();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Titulo</Label>
        <Input name="title" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="description" />
      </InputArea>
      <InputArea>
         <Label>Estado</Label>
         <Label>
          <Checkbox type="checkbox" name="status" /> 
         </Label>
      </InputArea>
      <Button type="submit">+</Button>
    </FormContainer>
  );
};

export default Form;
