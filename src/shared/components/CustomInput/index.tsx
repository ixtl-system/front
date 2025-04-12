import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { StyledInput, StyledInputWrapper } from './styles';

export type ITheme = "primary" | "secondary";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  theme?: ITheme;
}

export const CustomInput = ({ register, theme = "primary", ...props }: CustomInputProps) => {
  return (
    <StyledInputWrapper>
      {theme === "secondary" ? <span>{props.placeholder}</span> : null}
      {register && props?.name ? <StyledInput {...register(props?.name)} {...props} /> : <StyledInput {...props} />}
    </StyledInputWrapper>
  );
};
