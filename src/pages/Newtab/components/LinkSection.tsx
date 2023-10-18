import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Grid,
  Image,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import youtubeIcon from '../../../assets/img/youtube.png';
import driveIcon from '../../../assets/img/drivestat.png';
import mailIcon from '../../../assets/img/mailstat.png';
import { DotsVertical, Plus } from 'tabler-icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { toast } from 'react-hot-toast';
import saveLocalstorage from '../util/saveLocalstorage';

interface Props {}

interface linkData {
  name: string;
  link: string;
}

const LinkSection: React.FC<Props> = ({}: Props) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const storedLinkData = JSON.parse(
    localStorage.getItem('anichinu-links') || '[]'
  );
  const [LinkData, setLinkData] = useState<linkData[]>(storedLinkData);
  const [opened, { open, close }] = useDisclosure(false);
  const [nameInput, setnameInput] = useState<string>('');
  const [linkInput, setlinkInput] = useState<string>('');
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [editActive, seteditActive] = useState<number | null>(null);

  const defaultLinks = [
    { name: 'Youtube', link: 'https://www.youtube.com/', icon: youtubeIcon },
    { name: 'Gmail', link: 'https://mail.google.com/', icon: mailIcon },
  ];

  function submitForm(event: any) {
    event.preventDefault();

    if (regex.test(linkInput)) {
      if (nameInput.replaceAll(' ', '') === '') {
        toast.error("Name can't be empty");
      } else {
        if (editActive != null) {
          setLinkData((pre) => {
            let newData = [...pre];
            newData[editActive] = {
              name: nameInput,
              link: linkInput,
            };
            saveLocalstorage('anichinu-links', newData);
            return newData;
          });
        } else {
          setLinkData((pre) => [
            ...pre,
            {
              name: nameInput,
              link: linkInput,
            },
          ]);
          saveLocalstorage('anichinu-links', [
            ...LinkData,
            {
              name: nameInput,
              link: linkInput,
            },
          ]);
        }
        seteditActive(null);
        setnameInput('');
        setlinkInput('');
        close();
      }
    } else {
      toast.error('Enter valid Link');
      return null;
    }
  }

  return (
    <Stack w={'68%'} gap={40}>
      <Grid w={'100%'} gutter={40} justify="center">
        {defaultLinks.map((el, index) => (
          <Grid.Col span={4} key={index}>
            <a href={el['link']} style={{ textDecoration: 'none' }}>
              <Stack gap={5}>
                <Image src={el['icon']} w={60} h={60} />
                <Text fz={'sm'} fw={600} c={'#228be6'}>
                  {el['name']}
                </Text>
              </Stack>
            </a>
          </Grid.Col>
        ))}
        {LinkData.map((el, index) => (
          <Grid.Col
            span={4}
            key={index}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => {
              setHoveredLink(null);
              setOpenedMenu(false);
            }}
            id="gridcol"
            pos={'relative'}
          >
            <a href={el['link']} style={{ textDecoration: 'none' }}>
              <Stack gap={5}>
                <Image src={youtubeIcon} w={60} h={60} />
                <Text
                  fz={'sm'}
                  fw={600}
                  truncate="end"
                  w={'100%'}
                  ta={'center'}
                  c={'#228be6'}
                >
                  {el['name']}
                </Text>
              </Stack>
            </a>
            {index == hoveredLink && (
              <Menu
                shadow="md"
                position="left-start"
                opened={openedMenu}
                onChange={setOpenedMenu}
              >
                <Menu.Target>
                  <ActionIcon
                    pos={'absolute'}
                    top={20}
                    right={20}
                    variant="subtle"
                  >
                    <DotsVertical />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      seteditActive(index);
                      setnameInput(LinkData[index]['name']);
                      setlinkInput(LinkData[index]['link']);
                      open();
                    }}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      setLinkData((pre) => {
                        let newData = pre.filter((el, i) => i != index);
                        saveLocalstorage('anichinu-links', newData);
                        return newData;
                      })
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Grid.Col>
        ))}
        {LinkData.length < 4 && (
          <Grid.Col span={4}>
            <Stack
              gap={5}
              align="center"
              justify="center"
              h={'100%'}
              onClick={() => {
                open();
              }}
              className="addlink"
            >
              <Plus size={60} />
              <Text fz={'sm'} fw={600} c={'#228be6'}>
                Add new
              </Text>
            </Stack>
          </Grid.Col>
        )}
      </Grid>

      <Modal
        centered
        opened={opened}
        onClose={close}
        title={
          editActive != null
            ? `Edit Link ${editActive + 1}`
            : `Add Link ${LinkData.length + 3}`
        }
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
          <Button mt={20} type="submit" variant="outline" mr={25}>
            Done
          </Button>
        </form>
      </Modal>
    </Stack>
  );
};

export default LinkSection;
