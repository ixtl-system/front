import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { StyledInput } from './styles';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
}

export const CustomInput = ({ register, ...props }: CustomInputProps) => {
  if (register && props?.name) return <StyledInput {...register(props?.name)} {...props} />
  return <StyledInput {...props} />;
};
