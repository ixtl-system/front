import "./styles.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"; // Add useEffect
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { IPersonalInformation } from "@/pages/user/dtos";
import { api } from "@/shared/infra/api";

const profileSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(100),
  gender: z.enum(["MASCULINE", "FEMININE", "OTHER"]),
  rg: z.string().length(9),
  cpf: z.string().length(11),
  street: z.string().min(3).max(200),
  number: z.string().min(1).max(10),
  neighborhood: z.string().min(3).max(200),
  city: z.string().min(3).max(200),
  state: z.string().length(2),
  zipCode: z.string().max(20),
  phone: z.string().max(30).optional(),
  cellPhone: z.string().min(5).max(30),
  passport: z.string().max(30).optional(),
  birth: z.string(),
});

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
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  function ToggleShowUserProfile() {
    setShowUserProfile(!showUserProfile);
  }

  const onSubmitProfile = async (data: IPersonalInformation) => {
    try {
      if (user?.name) {
        await api.put(`users/profiles/${userId}`, data);
        alert("ATUALIZADO!");
      } else {
        await api.post("users/profiles", data);
      }
    } catch (error: any) {
      alert(error.response.data.message);
      console.log("error: ", error.response.data.message);
    }
  };

  return (
    <div>
      <div className="user-profile-form-container">
        <div className="toggle-container">
          <button onClick={ToggleShowUserProfile}>
            {showUserProfile ? "-" : "+"}
          </button>
          <h1>Dados pessoais</h1>
        </div>
        {showUserProfile && user && (
          <form
            onSubmit={handleSubmit(onSubmitProfile)}
            className="user-profile"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Name</p>
                  <p>{user.name}</p>
                  <input type="text" placeholder="Nome" {...field} />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={user.email}
              render={({ field }) => (
                <div>
                  <p>Email</p>
                  <input type="email" placeholder="Email" {...field} />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Gênero</p>
                  <select {...field}>
                    <option value="">Selecione</option>
                    <option value="MASCULINE">Masculino</option>
                    <option value="FEMININE">Feminino</option>
                    <option value="OTHER">Outro</option>
                  </select>
                  {errors.gender && <span>{errors.gender.message}</span>}
                </div>
              )}
            />
            <Controller
              name="rg"
              control={control}
              render={({ field }) => (
                <div>
                  <p>RG</p>
                  <input type="text" placeholder="RG" {...field} />
                  {errors.rg && <span>{errors.rg.message}</span>}
                </div>
              )}
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <div>
                  <p>CPF</p>
                  <input type="text" placeholder="CPF" {...field} />
                  {errors.cpf && <span>{errors.cpf.message}</span>}
                </div>
              )}
            />
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Rua</p>
                  <input type="text" placeholder="Rua" {...field} />
                  {errors.street && <span>{errors.street.message}</span>}
                </div>
              )}
            />
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Número</p>
                  <input type="text" placeholder="Número" {...field} />
                  {errors.number && <span>{errors.number.message}</span>}
                </div>
              )}
            />
            <Controller
              name="neighborhood"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Bairro</p>
                  <input type="text" placeholder="Bairro" {...field} />
                  {errors.neighborhood && (
                    <span>{errors.neighborhood.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Cidade</p>
                  <input type="text" placeholder="Cidade" {...field} />
                  {errors.city && <span>{errors.city.message}</span>}
                </div>
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Estado</p>
                  <input type="text" placeholder="Estado" {...field} />
                  {errors.state && <span>{errors.state.message}</span>}
                </div>
              )}
            />
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <div>
                  <p>CEP</p>
                  <input type="text" placeholder="CEP" {...field} />
                  {errors.zipCode && <span>{errors.zipCode.message}</span>}
                </div>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Telefone</p>
                  <input type="text" placeholder="Telefone" {...field} />
                  {errors.phone && <span>{errors.phone.message}</span>}
                </div>
              )}
            />
            <Controller
              name="cellPhone"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Celular</p>
                  <input type="text" placeholder="Celular" {...field} />
                  {errors.cellPhone && <span>{errors.cellPhone.message}</span>}
                </div>
              )}
            />
            <Controller
              name="passport"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Passaporte</p>
                  <input type="text" placeholder="Passaporte" {...field} />
                  {errors.passport && <span>{errors.passport.message}</span>}
                </div>
              )}
            />
            <Controller
              name="birth"
              control={control}
              render={({ field }) => (
                <div>
                  <p>Data de Nascimento</p>
                  <input type="date" {...field} />
                  {errors.birth && <span>{errors.birth.message}</span>}
                </div>
              )}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
      </div>
    </div>
  );
}
