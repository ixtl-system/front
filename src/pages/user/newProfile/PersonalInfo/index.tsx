import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiFloppyDiskLight } from "react-icons/pi";

import { CustomInput } from "@/shared/components/CustomInput";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { UserContext } from "@/shared/context/UserContext";
import cleanString from "@/shared/utils/cleanString";
import { formatCep } from "@/shared/utils/formatCep";
import { formatCpf } from "@/shared/utils/formatCpf";
import { formatPhoneNumber, formatResidentialPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { formatRg } from "@/shared/utils/formatRG";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPersonalInformation } from "../../dtos";
import { SaveButton } from "../styles";
import { profileFormData, profileSchema } from "./schema";
import { PersonalInfoContainer } from "./styles";

export const PersonalInfo = () => {
  const { userProfile: user, updateUserProfile } = useContext(UserContext);

  const {
    control,
    formState: { errors },
    register,
    setValue,
    handleSubmit
  } = useForm<profileFormData>({
    resolver: zodResolver(profileSchema)
  });

  const handleFormattedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "cellPhone") return setValue(name, formatPhoneNumber(value));
    if (name === "phone") return setValue(name, formatResidentialPhoneNumber(value));
    if (name === "zipCode") return setValue(name, formatCep(value));
    if (name === "cpf") return setValue(name, formatCpf(value));
    if (name === "rg") return setValue(name, formatRg(value));
  }

  const onSubmit = async (form: profileFormData) => {
    const request: IPersonalInformation = {
      ...form,
      cellPhone: cleanString(form.cellPhone),
      cpf: cleanString(form.cpf),
      rg: cleanString(form.rg),
      zipCode: cleanString(form.zipCode),
      phone: cleanString(form.phone || ""),
      role: user.role,
    }

    try {
      await updateUserProfile(request);
      message.success("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar dados.");
    }
  }


  useEffect(() => {
    const userKeys = Object.keys(user) as (keyof IPersonalInformation)[];

    userKeys.forEach((key) => {
      if (key === "role") return;

      if (key === "rg") return setValue(key, formatRg(user[key]));
      if (key === "cpf") return setValue(key, formatCpf(user[key]));
      if (key === "phone") return setValue(key, formatResidentialPhoneNumber(user[key]));
      if (key === "cellPhone") return setValue(key, formatPhoneNumber(user[key]));

      setValue(key, user[key])
    });
  }, [user]);


  return (
    <PersonalInfoContainer onSubmit={handleSubmit(onSubmit)}>
      <section>
        <CustomInput
          theme="secondary"
          name="name"
          register={register}
          placeholder="Nome"
        />
        <CustomInput
          theme="secondary"
          name="email"
          register={register}
          placeholder="E-mail"
          disabled={!!user.email}
        />
      </section>

      <section>
        <CustomSelect
          name="gender"
          control={control}
          label="Gênero"
          options={[
            { label: "Masculino", value: "MASCULINE" },
            { label: "Feminino", value: "FEMININE" },
            { label: "Outro", value: "OTHER" },
          ]}
          error={errors.gender}
        />

        <Controller
          name="birth"
          control={control}
          render={({ field }) => (
            <div>
              <p>Data de Nascimento</p>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : "")}
              />
              {errors.birth && <span className="error">{errors.birth.message}</span>}
            </div>
          )}
        />


        <CustomInput
          theme="secondary"
          name="rg"
          register={register}
          onChange={handleFormattedChange}
          placeholder="RG"
          disabled={!!user.rg}
        />
      </section>

      <section>
        <CustomInput
          theme="secondary"
          name="cpf"
          register={register}
          onChange={handleFormattedChange}
          placeholder="CPF"
          disabled={!!user.cpf}
        />
        <CustomInput
          theme="secondary"
          name="phone"
          register={register}
          onChange={handleFormattedChange}
          placeholder="Telefone"
        />
        <CustomInput
          theme="secondary"
          name="zipCode"
          register={register}
          onChange={handleFormattedChange}
          placeholder="CEP"
        />
      </section>
      <section>
        <CustomInput
          theme="secondary"
          name="cellPhone"
          register={register}
          onChange={handleFormattedChange}
          placeholder="Celular"
        />
        <CustomInput
          theme="secondary"
          name="passport"
          register={register}
          onChange={handleFormattedChange}
          placeholder="Passaporte"
        />
      </section>

      <section>
        <CustomInput
          theme="secondary"
          name="street"
          register={register}
          placeholder="Rua"
        />
        <CustomInput
          theme="secondary"
          name="number"
          register={register}
          placeholder="Número"
        />
        <CustomInput
          theme="secondary"
          name="neighborhood"
          register={register}
          placeholder="Bairro"
        />
        <CustomInput
          theme="secondary"
          name="city"
          register={register}
          placeholder="Cidade"
        />
        <CustomInput
          theme="secondary"
          name="state"
          register={register}
          placeholder="Estado"
        />
      </section>

      <SaveButton type="submit">
        Salvar dados
        <PiFloppyDiskLight />
      </SaveButton>
    </PersonalInfoContainer>
  );
};
