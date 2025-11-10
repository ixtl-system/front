import { Sidebar } from "../../Sidebar";
import { Topbar } from "../../Topbar";
import { Content, MainLayout } from "./styles";

interface ILayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: ILayoutProps) => {
  return (
    <MainLayout>
      <Topbar />
      <Sidebar />

      <Content>
        {children}
      </Content>
    </MainLayout>
  );
};
