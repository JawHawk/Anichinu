import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Center,
  Grid,
  Image,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import youtubeIcon from '../../../assets/img/youtube.png';
import driveIcon from '../../../assets/img/drivestat.png';
import mailIcon from '../../../assets/img/mailstat.png';
import plusIcon from '../../../assets/img/add-new.png';
import { BrandYoutube, Plus } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-hot-toast';

interface Props {}

interface linkData {
  name: string | undefined;
  link: string | undefined;
}

const LinkSection: React.FC<Props> = ({}: Props) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const linkData1 = localStorage.getItem('anichinu-link1');

  let parsedLinkData1 = null;
  if (linkData1) {
    try {
      parsedLinkData1 = JSON.parse(linkData1);
    } catch (error) {
      console.log(error);
    }
  }
  const linkData2 = localStorage.getItem('anichinu-link2');

  let parsedLinkData2 = null;
  if (linkData2) {
    try {
      parsedLinkData2 = JSON.parse(linkData2);
    } catch (error) {
      console.log(error);
    }
  }
  const linkData3 = localStorage.getItem('anichinu-link3');

  let parsedLinkData3 = null;
  if (linkData3) {
    try {
      parsedLinkData3 = JSON.parse(linkData3);
    } catch (error) {
      console.log(error);
    }
  }

  const [firstLink, setfirstLink] = useState<linkData>({
    name: parsedLinkData1 ? parsedLinkData1.name : null,
    link: parsedLinkData1 ? parsedLinkData1.link : null,
  });

  const [secondLink, setsecondLink] = useState<linkData>({
    name: parsedLinkData2 ? parsedLinkData2.name : null,
    link: parsedLinkData2 ? parsedLinkData2.link : null,
  });

  const [thirdLink, setthirdLink] = useState<linkData>({
    name: parsedLinkData3 ? parsedLinkData3.name : null,
    link: parsedLinkData3 ? parsedLinkData3.link : null,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [active, setactive] = useState<number | null>(null);
  const [nameInput, setnameInput] = useState<string>('');
  const [linkInput, setlinkInput] = useState<string>('');

  useEffect(() => {
    let linkData = localStorage.getItem(`anichinu-link${active}`);

    if (active) {
      if (linkData) {
        let parsedData = JSON.parse(linkData);
        setnameInput(parsedData['name']);
        setlinkInput(parsedData['link']);
      } else {
        setnameInput('');
        setlinkInput('');
      }
    }
  }, [active]);

  function submitForm(event: any) {
    event.preventDefault();

    if (regex.test(linkInput)) {
      if (nameInput.replaceAll(' ', '') === '') {
        toast.error("Name can't be empty");
      } else {
        localStorage.setItem(
          `anichinu-link${active}`,
          JSON.stringify({ name: nameInput, link: linkInput })
        );
        switch (active) {
          case 1:
            setfirstLink({ name: nameInput, link: linkInput });
            break;
          case 2:
            setsecondLink({ name: nameInput, link: linkInput });
            break;
          case 3:
            setthirdLink({ name: nameInput, link: linkInput });
        }
        close();
      }
    } else {
      toast.error('Enter valid Link');
      return null;
    }
  }

  return (
    <Stack w={'65%'} gap={40}>
      <Grid w={'100%'}>
        <Grid.Col span={4} p={5}>
          <a href="https://www.youtube.com/" style={{ textDecoration: 'none' }}>
            <Stack gap={5}>
              <Image src={youtubeIcon} w={60} h={60} />
              <Text fz={'sm'} fw={600} c={'#228be6'}>
                Youtube
              </Text>
            </Stack>
          </a>
        </Grid.Col>
        <Grid.Col span={4} p={5}>
          <a
            href="https://drive.google.com/"
            style={{ textDecoration: 'none' }}
          >
            <Stack gap={5}>
              <Image src={driveIcon} w={60} h={60} />
              <Text fz={'sm'} fw={600} c={'#228be6'}>
                Drive
              </Text>
            </Stack>
          </a>
        </Grid.Col>
        <Grid.Col span={4} p={5}>
          <a href="https://mail.google.com/" style={{ textDecoration: 'none' }}>
            <Stack gap={5}>
              <Image src={mailIcon} w={60} h={60} />
              <Text fz={'sm'} fw={600} c={'#228be6'}>
                Gmail
              </Text>
            </Stack>
          </a>
        </Grid.Col>
      </Grid>
      <Grid w={'100%'}>
        <Grid.Col span={4} p={5}>
          {firstLink.name ? (
            <a href={firstLink.link} style={{ textDecoration: 'None' }}>
              <Stack gap={5} align="center" justify="center" h={'100%'}>
                <Image src={youtubeIcon} w={60} h={60} />
                <Text fz={'sm'} fw={600} c={'#228be6'}>
                  {firstLink['name']}
                </Text>
              </Stack>
            </a>
          ) : (
            <Stack
              gap={5}
              align="center"
              justify="center"
              h={'100%'}
              onClick={() => {
                setactive(1);
                open();
              }}
              className="addlink"
            >
              <Plus size={60} />
              <Text fz={'sm'} fw={600} c={'#228be6'}>
                Add new
              </Text>
            </Stack>
          )}
        </Grid.Col>
        <Grid.Col span={4} p={5}>
          <Stack gap={5} align="center" justify="center" h={'100%'}>
            {secondLink.name ? (
              <a href={secondLink.link} style={{ textDecoration: 'None' }}>
                <Stack gap={5} align="center" justify="center" h={'100%'}>
                  <Image src={youtubeIcon} w={60} h={60} />
                  <Text fz={'sm'} fw={600} c={'#228be6'}>
                    {secondLink['name']}
                  </Text>
                </Stack>
              </a>
            ) : (
              <Stack
                gap={5}
                align="center"
                justify="center"
                h={'100%'}
                onClick={() => {
                  setactive(2);
                  open();
                }}
                className="addlink"
              >
                <Plus size={60} />
                <Text fz={'sm'} fw={600} c={'#228be6'}>
                  Add new
                </Text>
              </Stack>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4} p={5}>
          <Stack gap={5} align="center" justify="center" h={'100%'}>
            {thirdLink.name ? (
              <a href={thirdLink.link}>
                <Stack gap={5} align="center" justify="center" h={'100%'}>
                  <Image src={youtubeIcon} w={60} h={60} />
                  <Text fz={'sm'} fw={600} c={'#228be6'}>
                    {thirdLink['name']}
                  </Text>
                </Stack>
              </a>
            ) : (
              <Stack
                gap={5}
                align="center"
                justify="center"
                h={'100%'}
                onClick={() => {
                  setactive(3);
                  open();
                }}
                className="addlink"
              >
                <Plus size={60} />
                <Text fz={'sm'} fw={600} c={'#228be6'}>
                  Add new
                </Text>
              </Stack>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={`Add new Link ${active}`}
      >
        <form onSubmit={submitForm}>
          <TextInput
            label="Name"
            value={nameInput}
            onChange={(event) => setnameInput(event.currentTarget.value)}
          />
          <TextInput
            label="Link"
            mt={10}
            value={linkInput}
            error={
              linkInput !== '' && !regex.test(linkInput)
                ? 'Enter valid Link'
                : null
            }
            onChange={(event) => setlinkInput(event.currentTarget.value)}
          />
          <Button mt={20} type="submit">
            Done
          </Button>
        </form>
      </Modal>
    </Stack>
  );
};

export default LinkSection;
