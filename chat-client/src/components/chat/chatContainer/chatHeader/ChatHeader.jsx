import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { useAppStore } from '../../../../store/index.js';
import { Tooltip } from 'antd';
import { ProjectColors } from '../../../../utils/colors.js';

//region [[ Styles ]]
const ChatHeaderView = styled.div`
    height: 5rem;
    border-bottom: #2f303b solid 2px;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 1rem 4rem;
`;

const ProfileIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #233d26a1;
    border: 2px solid #2e4730;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #9ca3af;
`;

const CloseButtonContainer = styled.div`
    display: grid;
    align-items: center;
    cursor: pointer;
`;

const ProfileContainer = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    gap: 1rem;
`;

const ProfileName = styled.div`
    color: white;
`;

const ContactCircleIcon = styled.div`
    text-transform: uppercase;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #9c27b0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    background-color: ${(props) => (props.$isChannel ? '#706d75' : 'none')};
    border: 1px solid ${(props) => (props.$isChannel ? 'white' : '#9c27b0')};
`;
//endregion [[ Styles ]]

function ChatHeader() {
    const { closeChat, selectedChatData, selectedChatType } = useAppStore();
    const isChannel = selectedChatType === 'channel';
    const name = isChannel ? selectedChatData.name : selectedChatData.email;
    const iconLetter = isChannel ? '#' : (selectedChatData.email[0] ?? 'U');

    return (
        <ChatHeaderView>
            <ProfileContainer>
                <ContactCircleIcon $isChannel={isChannel}>
                    {iconLetter}
                </ContactCircleIcon>
                <ProfileName>{name}</ProfileName>
            </ProfileContainer>
            <CloseButtonContainer onClick={closeChat}>
                <Tooltip title={'close chat'}>
                    <IoClose
                        color={ProjectColors.LIGHT_WHITE}
                        size={30}
                        onClick={closeChat}
                    />
                </Tooltip>
            </CloseButtonContainer>
        </ChatHeaderView>
    );
}

export default ChatHeader;
