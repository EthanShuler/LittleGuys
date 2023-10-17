import { Container, SimpleGrid } from '@mantine/core';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import { GuyCard } from '@/components/GuyCard/GuyCard';
import myImage from './myImage.png';

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

export default async function HomePage() {
  // const supabase = createServerComponentClient({ cookies });
  // const { data } = await supabase.auth.getSession();
  // if (!data.session) {
  //   return redirect('/auth');
  // }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {dummyData.map(guy => (
          <GuyCard key={guy.id} name={guy.name} image={guy.image} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
