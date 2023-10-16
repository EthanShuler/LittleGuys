import { Container, SimpleGrid, Grid, GridCol } from '@mantine/core';
import { GuyCard } from '@/components/GuyCard/GuyCard';
import myImage from '../../littleguy/[id]/myImage.png';

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

const UserGuys = () => (
  <Container>
    <SimpleGrid cols={{ base: 1, sm: 3 }}>
      {dummyData.map(guy => (
        <GuyCard key={guy.id} name={guy.name} image={guy.image} />
      ))}
    </SimpleGrid>
  </Container>
);

export default function Profile() {
  return (
    <Grid>
      <GridCol span={3} bg="blue">
        <h1>hi</h1>
      </GridCol>
      <GridCol span={9} bg="red">
        <UserGuys />
      </GridCol>
    </Grid>
  );
}
