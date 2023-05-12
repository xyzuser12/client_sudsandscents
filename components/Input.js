import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
