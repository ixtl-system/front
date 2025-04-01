import { Content, MainLayout } from "./styles";
import { Sidebar } from "../../Sidebar";

interface ILayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: ILayoutProps) => {
  return (
    <MainLayout>
      <Sidebar />

      <Content>
        {children}
      </Content>
    </MainLayout>
  );
};
