import { GuyCard } from './GuyCard';
import myImage from './myImage.png';

export default {
  title: 'GuyCard',
};

export const Default = () => <GuyCard name="Test" image={myImage} />;
