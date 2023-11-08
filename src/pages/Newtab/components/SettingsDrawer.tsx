import {
  ActionIcon,
  Button,
  Card,
  Drawer,
  Group,
  Modal,
  SegmentedControl,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { InfoCircle, Moon, Settings, Sun } from 'tabler-icons-react';
import saveLocalstorage from '../util/saveLocalstorage';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';

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
  bgType: bgType;
  setbgType: React.Dispatch<React.SetStateAction<bgType>>;
};

type AnimeRedirectType = 'gogoanime' | 'aniwatch';
type bgType = 'sfw' | 'nsfw';

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
  bgType,
  setbgType,
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
    'hentai',
    'ass',
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
  const [opened, { open, close }] = useDisclosure(false);
  const [nsfwPassword, setnsfwPassword] = useState<string>('');

  useEffect(() => {
    if (bgType == 'sfw' && !sfwCategories.includes(imageCategory)) {
      setimageCategory(sfwCategories[0]);
    }
    if (bgType == 'nsfw' && !nsfwCategories.includes(imageCategory)) {
      setimageCategory(nsfwCategories[0]);
    }
  }, [imageCategory, bgType]);

  return (
    <>
      <Drawer
        position="right"
        opened={settingsOpened}
        onClose={closeSettings}
        size={525}
      >
        <Modal opened={opened} onClose={close} title="Nsfw Key Password">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (nsfwPassword === '36116158234121') {
                setbgType('nsfw');
                close();
                setnsfwPassword('');
              } else {
                toast.error('Wrong Password');
              }
            }}
          >
            <Stack>
              <TextInput
                value={nsfwPassword}
                onChange={(event) => setnsfwPassword(event.currentTarget.value)}
                placeholder="Enter Key"
              />
              <Text size="xs">
                Note: <span style={{ color: 'red' }}>Nsfw are 18+ Images</span>.
                Visit Anichinu Chrome Store Page for Key.
              </Text>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Modal>
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
                  }
                }}
                variant="filled"
                data={bgType == 'sfw' ? sfwCategories : nsfwCategories}
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
          <Card w={'100%'} shadow="xs" p={15} radius={'md'} withBorder>
            <Group w={'100%'} justify="space-between">
              <Text>Image Type</Text>
              <SegmentedControl
                value={bgType}
                onChange={(val: bgType) => {
                  if (val == 'nsfw') {
                    open();
                  } else {
                    setbgType(val);
                  }
                }}
                color="blue"
                data={[
                  { label: 'Sfw', value: 'sfw' },
                  { label: 'Nsfw', value: 'nsfw' },
                ]}
              />
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
    </>
  );
};

export default SettingsDrawer;
