import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IPersonalInformation } from "@/pages/user/dtos";
import { api } from "@/shared/infra/api";
import { Button, Input, message, Select } from "antd";
import { formFields } from "./mock";
import { profileSchema } from "./schema";
import { formatCpf } from "@/shared/utils/formatCpf";
import { formatRg } from "@/shared/utils/formatRG";
import cleanString from "@/shared/utils/cleanString";
import { UserProfileFormContainer } from "./styles";
import { FiMinus, FiPlus } from "react-icons/fi";

export function PersonalInformation({
  user,
  userId,
}: {
  user: IPersonalInformation;
  userId: string;
}) {
  const [showUserProfile, setShowUserProfile] = useState(false);

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
    try {
      const request = { ...data, cpf: cleanString(data.cpf), rg: cleanString(data.rg) }

      if (user?.name) {
        await api.put(`users/profiles/${userId}`, request);
        message.success("ATUALIZADO!");
      } else {
        await api.post("users/profiles", request);
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }
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
                  {errors.gender && <span>{errors.gender.message}</span>}
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
                  <Input type="text" placeholder={formItem.placeholder} {...field} value={formatInputValue(field?.value, field.name)} />
                  {errors[`${formItem.name}`] && <span>{errors[`${formItem.name}`]?.message}</span>}
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
