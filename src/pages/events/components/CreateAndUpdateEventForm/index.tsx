import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker } from "antd";
import dayjs from 'dayjs';

import { CustomInput } from '@/shared/components/CustomInput';
import { CustomTextArea } from '@/shared/components/CustomTextArea';

import { EventFormContainer } from './styles';
import { EventFormData, eventSchema } from './schema';
import { EventForm } from './styles';
import { useEffect } from 'react';
import { Event, EventData } from '@/shared/types/Event';


interface EventFormProps {
  title: string;
  event?: Event;
  onSubmit: (data: EventData) => void;
}
export const CreateAndUpdateEventForm = ({ title, event, onSubmit: onSubmitForm }: EventFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventFormData) => {
    if (onSubmitForm) onSubmitForm({ ...data, date: data.date, availability: Number(data.availability) });
  };

  useEffect(() => {
    if (event) {
      setValue("name", event.name)
      setValue("date", event.date)
      setValue("description", event.description)
      setValue("availability", String(event.availability))
    }
  }, [])

  return (
    <EventFormContainer>
      <EventForm onSubmit={handleSubmit(onSubmit)}>
        <h2>{title}</h2>

        <CustomInput name="name" placeholder="Nome" register={register} />
        {errors.name?.message && <span className='error'>{String(errors.name.message)}</span>}

        <CustomTextArea name="description" placeholder="Descrição" register={register} rows={5} />
        {errors.description?.message && <span className='error'>{String(errors.description.message)}</span>}

        <CustomInput name='availability' type='number' placeholder="Lugares Disponíveis" register={register} />
        {errors.availability?.message && <span className='error'>{String(errors.availability.message)}</span>}

        <section>
          <div className="date">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Data do evento"
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => date ? field.onChange(date.toISOString()) : field.onChange(null)}
                />
              )}
            />
            {errors.date?.message && <span className='error'>{String(errors.date.message)}</span>}
          </div>

          <Button type="primary" htmlType="submit">Salvar Evento</Button>
        </section>
      </EventForm>
    </EventFormContainer>
  );
};
