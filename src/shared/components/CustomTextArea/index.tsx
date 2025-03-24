import { TextareaHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { StyledTextArea } from './styles';

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  register?: UseFormRegister<any>
}

export const CustomTextArea = ({ name, register, ...props }: CustomTextAreaProps) => {
  if (register && name) return <StyledTextArea {...props} {...register(name)} name={name} />
  return <StyledTextArea {...props} />;
};
