import styled from "styled-components";

export const EventUsersContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  section.content {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 900px;
    margin: 40px 0 0;

    h4 {
      margin: 20px 0;
    }

    ul {
      list-style: none;
      padding: 0;
      width: 100%;
      max-width: 600px;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        margin: 10px 0 0;
        padding: 10px 15px;
        border-radius: 6px;
        box-shadow: 0 0 8px #eeeeee;

        width: 100%;

        section.options {
          display: flex;
          gap: 5px;

          button svg {
            color: #fff
          }
        }
      }
    }
  }
`
