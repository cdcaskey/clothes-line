import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to the{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'dodgerBlue', to: 'blue' }}>
          Clothes Line
        </Text>
      </Title>
    </>
  );
}
