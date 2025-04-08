import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;

  @media (max-width: 900px){
    grid-template-columns: 1fr;
  
    #sidebar {
      display: none;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: calc(100vw - 80px);

  @media (max-width: 900px){
    width: 100vw;
    max-width: 100vw;
  }
`;
