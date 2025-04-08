import { Content, MainLayout } from "./styles";
import { Sidebar } from "../../Sidebar";
import { Topbar } from "../../Topbar";

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
