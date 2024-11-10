import styled from 'styled-components';
import LogoSource from '../../../assets/logo.png';
import { ProjectColors } from '../../../utils/colors.js';
import UserInfo from './userInfo/UserInfo.jsx';
import NewDm from './newDm/NewDm.jsx';
import { Tooltip } from 'antd';
import { useEffect } from 'react';
import { ApiService } from '../../../api/api-client.js';
import { useAppStore } from '../../../store/index.js';
import ContactsList from './contactsList/ContactsList.jsx';
import CreateChannel from './createChannel/CreateChannel.jsx';

//region [[ Styles ]]
const ContactsContainerView = styled.div`
    width: 18rem;
    background: ${ProjectColors.DARK_BACKGROUND};
    border-right: #2f303b solid 2px;

    display: grid;
    grid-template-rows: auto 1fr auto;
`;

const LogoImage = styled.img`
    height: 3rem;
`;

const LogoContainer = styled.div`
    padding-top: 1rem;
    display: flex;
    justify-content: center;
`;

const ChatOptionsContainer = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-self: start;
`;

const Option = styled.div`
    display: grid;
    grid-auto-flow: column;
    color: #9ca3af;
    padding: 0.5rem 0 0.5rem 2.5rem;

    font-size: 0.8rem;
    line-height: 1.25rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

const OptionTitle = styled.div``;
const OptionOpenPlus = styled.div`
    cursor: pointer;
`;
//endregion [[ Styles ]]

function ContactsContainer() {
    const {
        directMessagesContacts,
        setDirectMessagesContacts,
        channels,
        setChannels,
    } = useAppStore();

    useEffect(() => {
        async function getData() {
            const [contactsResponse, channelsResponse] = await Promise.all([
                ApiService.getDmContacts(),
                ApiService.getUserChannels(),
            ]);
            if (contactsResponse.data.contacts) {
                setDirectMessagesContacts(contactsResponse.data.contacts);
            }
            if (channelsResponse.data.channels) {
                setChannels(channelsResponse.data.channels);
            }
        }
        getData();
    }, [setChannels, setDirectMessagesContacts]);

    return (
        <>
            <ContactsContainerView>
                <LogoContainer>
                    <LogoImage src={LogoSource} />
                </LogoContainer>
                <ChatOptionsContainer>
                    <Option>
                        <OptionTitle>Direct Messages</OptionTitle>
                        <OptionOpenPlus>
                            <Tooltip
                                placement="topRight"
                                title={'Search contacts'}
                                arrow={false}
                            >
                                <>
                                    <NewDm />
                                </>
                            </Tooltip>
                        </OptionOpenPlus>
                    </Option>
                    <ContactsList contacts={directMessagesContacts} />
                    <Option>
                        <OptionTitle>Channels</OptionTitle>
                        <OptionOpenPlus>
                            <Tooltip
                                placement="topRight"
                                title={'Start channel'}
                                arrow={false}
                            >
                                <>
                                    <CreateChannel />
                                </>
                            </Tooltip>
                        </OptionOpenPlus>
                    </Option>
                    <ContactsList contacts={channels} isChannel={true} />
                </ChatOptionsContainer>
                <UserInfo />
            </ContactsContainerView>
        </>
    );
}

export default ContactsContainer;
