import styled from "styled-components";

export const EventsContainer = styled.div`
  padding: 20px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;

  section.title {
    display: grid;
    grid-template-columns: 150px 1fr 150px;
    align-items: center;
    margin: 20px 0 40px;
    
    h1 {
      text-align: center;
      color: #8a5a44;
      grid-column-start: 2;
      height: max-content;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      font-size: 1rem;
      height: max-content;
      width: max-content;
      padding: 10px 10px;
    }


  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    cursor: pointer
  }

  .event-card {
    display: flex;
    flex-direction: column;
    align-items: center;

    background: linear-gradient(145deg, #e9e2d0, #fff);
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    min-height: 420px;
  }

  .event-card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #ccc;
  }

  .event-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .event-title {
    font-size: 18px;
    margin-bottom: 5px;
    color: #8a5a44;
  }

  .event-description {
    font-size: 0.875rem;
    color: #655344;
    margin-bottom: 10px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    line-height: 1.5; 
    max-height: calc(1.5em * 3); 
  }

  .event-date,
  .event-availability {
    font-size: 14px;
    margin: 5px 0;
    color: #4a392e;
  }

  .event-date strong,
  .event-availability strong {
    color: #8a5a44;
  }
`
