import React from "react";
import axios from "axios";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``; 

export const Tr = styled.tr``;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({tasks}) => {
   return(
      <Table>
         <Thead>
            <Tr>
               <Th>Título</Th>
               <Th>Descrição</Th>
               <Th>Estado</Th>
            </Tr>
         </Thead>
         <Tbody>
            {tasks.map((item, i) => (
               <Tr key={i}>
                  <Td width="30%">{item.title}</Td>
                  <Td width="30%">{item.description}</Td>
                  <Td width="30%">{item.status}</Td>
                  <Td alignCenter width="5%">
                     <FaEdit/>
                  </Td>
                  <Td alignCenter width="5%">
                     <FaTrash/>
                  </Td>
               </Tr>
            ))}
         </Tbody>
      </Table>
   );
}

export default Grid;