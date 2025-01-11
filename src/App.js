import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import {useEffect ,useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {

    const [tasks, setTasks] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080");
        setTasks(res.data.sort((a, b) => (a.title > b.title ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      getTasks();
    }, [setTasks]);

    return(
      <>
        <Container>
          <Title>Gerenciador de Tarefas</Title>
          <Form/>
          <Grid tasks={tasks}/>
        </Container>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <GlobalStyle/>
      </>
    );
}

export default App;