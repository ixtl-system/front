import { useDiseases } from '@/shared/hooks/useDiseases';
import { PiXCircle } from 'react-icons/pi';
import { ActionButtons, DiseaseItem } from '../styles';

export const DiseasesAndMedications = () => {
  const { userDiseasesAndMedications, removeUserDisease, removeUserMedication } = useDiseases();
  console.log({userDiseasesAndMedications})
  return (
    <>
      <h3>Lista adicionada:</h3>
      {userDiseasesAndMedications.map((d) => (
        <DiseaseItem key={d.id}>
          <div>
            <strong>{d.name}</strong>
            {d.medications?.length > 0 && (
              <ul>
                {d.medications.map((med, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => removeUserMedication(med.id)}>
                      {med.name} <PiXCircle />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ActionButtons>
            <button onClick={() => removeUserDisease(d.id)}>Remover</button>
          </ActionButtons>
        </DiseaseItem>
      ))}
    </>
  )
}