import { GuyCard } from './GuyCard';
import myImage from './myImage.png';

export default {
  title: 'GuyCard',
};

export const Default = () => <GuyCard id={0} name="Test" image={myImage} />;
