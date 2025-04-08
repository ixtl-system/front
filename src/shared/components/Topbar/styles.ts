import styled from "styled-components";

export const TopbarContainer = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: 20px 40px;
  background:  #FFF8ED;

  svg {
    font-size: 20px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    transition: 0.4s transform;

    &:active {
      transform: scale(1.1);
    }
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;