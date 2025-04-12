import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;

  @media (max-width: 900px){
    flex-direction: column;
  
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
    max-width: calc(100vw - 16px);;
  }
`;
