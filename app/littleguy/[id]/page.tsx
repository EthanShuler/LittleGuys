import { SimpleGrid, Image, Text, Title, Grid, GridCol } from '@mantine/core';
import NextImage from 'next/image';
import { IconUserCircle } from '@tabler/icons-react';
import classes from './Guy.module.css';
import myImage from './myImage.png';

const dummyData = {
  image: myImage,
  name: 'Brim Kimble',
  description: 'lorem impsum and allsldjfla lkjdlkfj sldjflsajdffls jlkjslfjsalkjflsjd flsajlf slfj laskdj laskjd lasdl kl ',
};

const stats = [
  {
    id: 0,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
  {
    id: 1,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
  {
    id: 2,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
];

interface StatisticProps {
  title: string;
  description: string;
}

const Statistic = ({ title, description }: StatisticProps) => (
  <Grid py="1rem">
    <GridCol span={2}>
      <Title order={3}>{title}:</Title>
    </GridCol>
    <GridCol span={10}>
      <Text>{description}</Text>
    </GridCol>
  </Grid>
);

const Description = () => (
  <>
    <Title order={1} mb={20}>{dummyData.name}</Title>
    { stats.map(stat => (
      <Statistic key={stat.id} title={stat.title} description={stat.description} />
    ))}
  </>
);

const ImageContainer = () => (
  <>
    <Grid align="center">
      <GridCol span={2}>
        <IconUserCircle width="6rem" height="6rem" stroke={1.5} />
      </GridCol>
      <GridCol span={10}>
        <Title order={1}>NAME</Title>
      </GridCol>
    </Grid>
    <Image
      component={NextImage}
      src={dummyData.image}
      fit="contain"
      alt="My image"
    />
  </>

);

export default function Guy() {
  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <div className={classes.leftColumn}>
          <ImageContainer />
        </div>
        <div>
          <Description />
        </div>
      </SimpleGrid>
    </>
  );
}
