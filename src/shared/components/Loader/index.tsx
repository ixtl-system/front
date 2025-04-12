import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

const Loader = () => {
  return (
    <Flex align="center" justify='center' gap="middle" style={{ width: "100%", height: "40vh" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  )
}

export default Loader