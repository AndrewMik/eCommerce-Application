import { Divider } from 'antd';

interface DividerTextProps {
  text: string;
}

const DividerText: React.FC<DividerTextProps> = ({ text }) => <Divider orientation="center">{text}</Divider>;

export default DividerText;
