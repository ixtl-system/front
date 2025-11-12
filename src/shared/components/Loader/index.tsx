import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

type LoaderProps = {
  fullScreen?: boolean;
};

const Loader = ({ fullScreen = false }: LoaderProps) => {
  return (
    <Flex align="center" justify="center" gap="middle" style={{ width: "100%", height: fullScreen ? "100vh" : "40vh" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  );
};

export default Loader;
