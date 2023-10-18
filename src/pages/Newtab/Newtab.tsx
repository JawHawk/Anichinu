import React, { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';
import {
  ActionIcon,
  Button,
  Drawer,
  Flex,
  Image,
  Loader,
  ScrollArea,
  Select,
  Stack,
  Text,
  Center,
  Tooltip,
  Group,
  Paper,
  Switch,
  Title,
  Card,
  useMantineColorScheme,
  useMantineTheme,
  rem,
  useComputedColorScheme,
  OptionsFilter,
  ComboboxItem,
  SegmentedControl,
} from '@mantine/core';
import LinkSection from './components/LinkSection';
import anichinuLogo from '../../assets/img/anichinu.png';
import { useDisclosure } from '@mantine/hooks';
import AnimeBox from './components/AnimeBox';
import {
  AlertTriangle,
  Moon,
  MoonStars,
  Search,
  Settings,
  Sun,
} from 'tabler-icons-react';
import { Toaster, toast } from 'react-hot-toast';
import fetchImage from './util/fetchImage';
import gogoanimeData from './assets/gogoanimeData.json';
import aniwatchData from './assets/aniwatchData.json';
import SettingsDrawer from './components/SettingsDrawer';

interface Props {
  title: string;
}

interface Anime {
  animeId: string;
  episodeId: string;
  animeTitle: string;
  episodeNum: string;
  subOrDub: string;
  animeImg: string;
  episodeUrl: string;
}
type AnimeRedirectType = 'gogoanime' | 'aniwatch';

const Newtab: React.FC<Props> = ({ title }: Props) => {
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  const [latestAnimeData, setlatestAnimeData] = useState<Anime[] | null>(null);
  const [latestAnimeError, setlatestAnimeError] = useState<boolean>(false);
  const [showBackground, setshowBackground] = useState<boolean>(
    JSON.parse(localStorage.getItem('anichinu-bg') || 'true')
  );
  const [imageCategory, setimageCategory] = useState<string>(
    localStorage.getItem('animechinu-imgCategory') || sfwCategories[0]
  );
  const theme = useMantineTheme();

  const [showAnichinu, setshowAnichinu] = useState<boolean>(
    JSON.parse(localStorage.getItem('anichinu-section') || 'true')
  );

  const [animeRedirect, setanimeRedirect] = useState<AnimeRedirectType>(
    (localStorage.getItem('anichinu-redirect') as AnimeRedirectType) ||
      'aniwatch'
  );

  async function changeBg() {
    let imgURL = await fetchImage(imageCategory);
    if (imgURL) {
      setImageUrl(imgURL);
    } else {
      toast.error('Background Fetch Failed');
    }
  }

  useEffect(() => {
    changeBg();
  }, [imageCategory]);

  useEffect(() => {
    fetch('https://webdis-vta0.onrender.com/recent-release')
      .then((res) => res.json())
      .then((data: Anime[]) => {
        setlatestAnimeData(data);
      })
      .catch((err) => {
        setlatestAnimeError(true);
      });
  }, []);

  const sunIcon = (
    <Sun
      style={{ width: rem(16), height: rem(16) }}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <MoonStars
      style={{ width: rem(16), height: rem(16) }}
      color={theme.colors.blue[6]}
    />
  );

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter(
      (option) =>
        option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
      // includesString(option.label, search)
    );

    return filtered.slice(0, 10);
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Flex h={'100vh'} w={'100vw'} justify={'center'}>
        {showBackground && (
          <Flex
            w={showAnichinu ? '62%' : '100%'}
            miw={200}
            justify={'center'}
            align={'center'}
          >
            {imageUrl ? (
              <Image key={imageUrl} fit="contain" src={imageUrl} h={'100%'} />
            ) : (
              <Loader />
            )}
          </Flex>
        )}
        {showAnichinu && (
          <Stack w={showBackground ? '38%' : '40%'} align="center" miw={350}>
            <Stack h={'50%'} w={'100%'} justify="flex-end">
              <Image h={115} fit="contain" src={anichinuLogo} mb={20} />
              <LinkSection />
            </Stack>
            <Stack h={'50%'} w={'100%'}>
              <Select
                mt={25}
                placeholder="Search Anime name"
                data={
                  animeRedirect === 'gogoanime'
                    ? gogoanimeData['Trending_animes'].map((el) => ({
                        label: el.name,
                        value: el.link,
                      }))
                    : aniwatchData['Trending_animes'].map((el) => ({
                        label: el.name,
                        value: el.link,
                      }))
                }
                searchable
                miw={300}
                radius={'lg'}
                w={'70%'}
                filter={optionsFilter}
                size="md"
                styles={{
                  input: {
                    border: '2px solid #228be6',
                  },
                }}
                onChange={(el) => {
                  if (el) {
                    chrome.tabs.update({ url: el });
                  }
                }}
                rightSection={
                  <ActionIcon variant="transparent" size={'md'} mr={15}>
                    <Search color="#228be6" />
                  </ActionIcon>
                }
              />
            </Stack>
          </Stack>
        )}
      </Flex>
      <Stack
        w={60}
        justify="center"
        align="flex-end"
        pos={'fixed'}
        right={-10}
        top={0}
        h={'100%'}
      >
        <Tooltip label={'Settings'} position="left">
          <Button
            onClick={openSettings}
            style={{ borderRadius: '50% 0 0 50%' }}
            h={50}
            w={50}
            p={0}
            variant="light"
          >
            <Settings size={25} />
          </Button>
        </Tooltip>
        <Tooltip
          label={'Recently released Anime Episodes'}
          position="left"
          multiline
        >
          <Button
            w={50}
            onClick={open}
            style={{ borderRadius: '50% 0 0 50%' }}
            h={50}
          >
            <Text fw={800} size="md">
              &lt;
            </Text>
          </Button>
        </Tooltip>
      </Stack>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        size={525}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Text mb={50} fz={30} fw={600} ta={'center'}>
          Latest Episodes
        </Text>
        {latestAnimeError ? (
          <Paper withBorder p={15} shadow="xl">
            <Group w={'100%'} justify="center">
              <AlertTriangle color="red" size={26} />
              <Text size="lg">There's some error, please try again later.</Text>
            </Group>
          </Paper>
        ) : latestAnimeData ? (
          <Group px={10} gap={25} justify="space-between">
            {latestAnimeData.map((el, index) => (
              <AnimeBox data={el} key={index} />
            ))}
          </Group>
        ) : (
          <Center>
            <Loader />
          </Center>
        )}
      </Drawer>
      <SettingsDrawer
        settingsOpened={settingsOpened}
        closeSettings={closeSettings}
        showBackground={showBackground}
        setshowBackground={setshowBackground}
        showAnichinu={showAnichinu}
        setshowAnichinu={setshowAnichinu}
        imageCategory={imageCategory}
        setimageCategory={setimageCategory}
        animeRedirect={animeRedirect}
        setanimeRedirect={setanimeRedirect}
      />
    </>
  );
};

export default Newtab;
