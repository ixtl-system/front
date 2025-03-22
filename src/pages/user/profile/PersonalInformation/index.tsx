import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IPersonalInformation } from "@/pages/user/dtos";
import { Button, Input, Select } from "antd";
import { formFields } from "./mock";
import { profileSchema } from "./schema";
import { formatCpf } from "@/shared/utils/formatCpf";
import { formatRg } from "@/shared/utils/formatRG";
import { UserProfileFormContainer } from "./styles";
import { FiMinus, FiPlus } from "react-icons/fi";
import { UserContext } from "@/shared/context/UserContext";

export function PersonalInformation() {
  const { userProfile: user, updateUserProfile } = useContext(UserContext);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const fieldsNotAllowedToUpdate = ["rg", "cpf", "email"];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { ...user, cpf: formatCpf(user.cpf), rg: formatRg(user.rg) },
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  function ToggleShowUserProfile() {
    setShowUserProfile(!showUserProfile);
  }

  function formatInputValue(value: string | undefined, name: string) {
    if (name === "rg") return formatRg(value || "")
    if (name === "cpf") return formatCpf(value || "")
    return value
  }

  const onSubmitProfile = async (data: IPersonalInformation) => {
    await updateUserProfile(data)
  };

  return (
    <UserProfileFormContainer>
      <div className="toggle-container" onClick={ToggleShowUserProfile}>
        {showUserProfile ? <FiMinus /> : <FiPlus />}

        <h1>Dados pessoais</h1>
      </div>

      {showUserProfile && user && (
        <form
          onSubmit={handleSubmit(onSubmitProfile)}
          className="user-profile"
        >
          {formFields.map(formItem => formItem.name === "gender" ? (
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Gênero</p>
                  <Select {...field} style={{ width: "100%" }}>
                    <Select.Option value="MASCULINE">Masculino</Select.Option>
                    <Select.Option value="FEMININE">Feminino</Select.Option>
                    <Select.Option value="OTHER">Outro</Select.Option>
                  </Select>
                  {errors.gender && <span className="error">{errors.gender.message}</span>}
                </div>
              )}
            />
          ) : (
            <Controller
              name={formItem.name}
              control={control}
              render={({ field }) => (
                <div>
                  <p>{formItem.placeholder}</p>
                  <Input
                    {...field}
                    type="text"
                    disabled={fieldsNotAllowedToUpdate.includes(field.name) && !!field.value}
                    placeholder={formItem.placeholder}
                    value={formatInputValue(field?.value, field.name)}
                  />
                  {errors[`${formItem.name}`] && <span className="error">{errors[`${formItem.name}`]?.message}</span>}
                </div>
              )}
            />
          ))}

          <Controller
            name="birth"
            control={control}
            render={({ field }) => (
              <div>
                <p>Data de Nascimento</p>
                <Input type="date" {...field} />
                {errors.birth && <span>{errors.birth.message}</span>}
              </div>
            )}
          />

          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>Salvar</Button>
        </form>
      )}
    </UserProfileFormContainer>
  );
}
