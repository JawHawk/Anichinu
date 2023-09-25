import { Badge, Card, Group, Image, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface Props {
  data: {
    animeId: string;
    episodeId: string;
    animeTitle: string;
    episodeNum: string;
    subOrDub: string;
    animeImg: string;
    episodeUrl: string;
  };
}

const AnimeBox: React.FC<Props> = ({ data }: Props) => {
  const {
    animeId,
    episodeId,
    animeTitle,
    episodeNum,
    subOrDub,
    animeImg,
    episodeUrl,
  } = data;
  return (
    <Card
      shadow="xl"
      component="a"
      href={episodeUrl}
      className="animebox"
      withBorder
      w={220}
      h={360}
      style={{ transition: '0.3s' }}
      onMouseEnter={(event) => {
        event.currentTarget.style.border = '1px solid #228be6';
        event.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.border = 'None';
        event.currentTarget.style.transform = 'scale(1)'; // Reset border on mouse leave
      }}
    >
      <Card.Section>
        <Image h={230} src={animeImg} />
      </Card.Section>
      <Stack justify="space-between" mt={15} h={'100%'}>
        <Text fw={500} size="md" ta={'center'} lineClamp={2}>
          {animeTitle}
        </Text>
        <Group>
          <Text
            fw={600}
            size="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'pink', deg: 90 }}
            lineClamp={2}
          >
            Episode: {episodeNum}
          </Text>
          <Badge>{subOrDub}</Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default AnimeBox;
