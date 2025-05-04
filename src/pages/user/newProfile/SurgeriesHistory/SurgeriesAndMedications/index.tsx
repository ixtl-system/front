
import { PiXCircle } from 'react-icons/pi';

import { useSurgery } from '@/shared/hooks/useSurgery';
import { ActionButtons, DiseaseItem } from '../styles';

export const SurgeriesAndMedications = () => {
  const { userSurgeries } = useSurgery();
  console.log({userSurgeries})

  return (
    <>
      <br />
      <h3>Lista adicionada:</h3>
      {userSurgeries.map((d) => (
        <DiseaseItem key={d.id}>
          <div>
            <strong>{d.name}</strong>

            <ul>
              <li>
                <button type="button" onClick={() => console.log(d.id)}>
                  {d.medicine} <PiXCircle />
                </button>
              </li>
            </ul>
          </div>
          <ActionButtons>
            <button type='button' onClick={() => console.log(d.id)}>Remover</button>
          </ActionButtons>
        </DiseaseItem>
      ))}
    </>
  )
}