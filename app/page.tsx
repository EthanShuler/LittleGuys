'use client';

import { Container, SimpleGrid } from '@mantine/core';
import myImage from './myImage.png';
import { GuyCard } from '@/components/GuyCard/GuyCard';

const dummyData = [
  {
    id: 0,
    image: myImage,
    name: 'Brim Kimble',
    description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
  },
  {
    id: 1,
    image: myImage,
    name: 'Brim Kimble',
    description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
  },
  {
    id: 2,
    image: myImage,
    name: 'Brim Kimble',
    description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
  },
  {
    id: 3,
    image: myImage,
    name: 'Brim Kimble',
    description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
  },
  {
    id: 4,
    image: myImage,
    name: 'Brim Kimble',
    description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
  },
];

export default function HomePage() {
  return (
    <Container py="l">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {dummyData.map(guy => (
          <GuyCard key={guy.id} name={guy.name} image={guy.image} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
