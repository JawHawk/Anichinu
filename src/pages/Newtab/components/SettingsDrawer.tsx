import {
  ActionIcon,
  Card,
  Drawer,
  Group,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { InfoCircle, Moon, Settings, Sun } from 'tabler-icons-react';
import saveLocalstorage from '../util/saveLocalstorage';

type Props = {
  settingsOpened: boolean;
  closeSettings: () => void;
  showBackground: boolean;
  setshowBackground: React.Dispatch<React.SetStateAction<boolean>>;
  showAnichinu: boolean;
  setshowAnichinu: React.Dispatch<React.SetStateAction<boolean>>;
  imageCategory: string;
  setimageCategory: React.Dispatch<React.SetStateAction<string>>;
  animeRedirect: AnimeRedirectType;
  setanimeRedirect: React.Dispatch<React.SetStateAction<AnimeRedirectType>>;
};

type AnimeRedirectType = 'gogoanime' | 'aniwatch';

const SettingsDrawer: React.FC<Props> = ({
  settingsOpened,
  closeSettings,
  showBackground,
  setshowBackground,
  showAnichinu,
  setshowAnichinu,
  imageCategory,
  setimageCategory,
  animeRedirect,
  setanimeRedirect,
}: Props) => {
  const sfwCategories = [
    'waifu',
    'oppai',
    'maid',
    'uniform',
    'selfies',
    'marin-kitagawa',
  ];
  const nsfwCategories = [
    'ass',
    'hentai',
    'milf',
    'oral',
    'paizuri',
    'ecchi',
    'ero',
    'waifu',
    'oppai',
    'uniform',
  ];

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Drawer
      position="right"
      opened={settingsOpened}
      onClose={closeSettings}
      size={525}
    >
      <Group justify="center" mb={35}>
        <Settings size={26} color="#228be6" />
        <Title order={2} c={'blue'}>
          Settings
        </Title>
      </Group>
      <Stack align="center" justify="space-between" h={'100%'}>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group justify="space-between">
            <Text>Show Background Image</Text>
            <Switch
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              checked={showBackground}
              onChange={(event) => {
                setshowBackground(event.currentTarget.checked);
                saveLocalstorage('anichinu-bg', event.currentTarget.checked);
              }}
              radius={'md'}
            />
          </Group>
        </Card>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group w={'100%'} justify="space-between">
            <Text>Show Anichinu Section</Text>
            <Switch
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              checked={showAnichinu}
              onChange={(event) => {
                setshowAnichinu(event.currentTarget.checked);
                saveLocalstorage(
                  'anichinu-section',
                  event.currentTarget.checked
                );
              }}
              radius={'md'}
            />
          </Group>
        </Card>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group w={'100%'} justify="space-between">
            <Text>Image Category</Text>
            <Select
              value={imageCategory}
              onChange={(val) => {
                if (val) {
                  setimageCategory(val);
                  saveLocalstorage('animechinu-imgCategory', val);
                }
              }}
              variant="filled"
              data={sfwCategories}
              maxDropdownHeight={150}
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 160, overflowY: 'auto' } }}
            />
          </Group>
        </Card>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group w={'100%'} justify="space-between">
            <Text>Color Theme</Text>

            <Tooltip
              label={
                colorScheme === 'light'
                  ? 'Turn on Dark mode'
                  : 'Turn on Light mode'
              }
              position="left"
              offset={10}
              withArrow
              arrowSize={5}
            >
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === 'light' ? 'dark' : 'light'
                  )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {colorScheme == 'light' ? (
                  <Sun color="#FF5349" />
                ) : (
                  <Moon color="#228be6" />
                )}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group w={'100%'} justify="space-between">
            <Text>Anime Redirect Site</Text>
            <SegmentedControl
              value={animeRedirect}
              onChange={(val: AnimeRedirectType) => {
                setanimeRedirect(val);
                saveLocalstorage('anichinu-redirect', val);
              }}
              color="blue"
              data={[
                { label: 'Gogoanime', value: 'gogoanime' },
                { label: 'Aniwatch', value: 'aniwatch' },
              ]}
            />
          </Group>
        </Card>
        <Card mt={75} w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group wrap="nowrap" justify="center">
            <InfoCircle size={22} color="orange" />
            <Text c={'#FFA500'}>Nsfw feature will come soon</Text>
          </Group>
        </Card>
        <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
          <Group w={'100%'} justify="center">
            <Text>Created By:</Text>
            <a href="https://github.com/JawHawk">Chinmay J</a>
          </Group>
        </Card>
      </Stack>
    </Drawer>
  );
};

export default SettingsDrawer;
