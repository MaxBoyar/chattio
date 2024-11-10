import styled from 'styled-components';
import ChatHeader from './chatHeader/ChatHeader.jsx';
import ChatSpace from './chatSpace/ChatSpace.jsx';
import MessageBar from './messageBar/MessageBar.jsx';
import { ProjectColors } from '../../../utils/colors.js';

//region [[ Styles ]]
const ChatContainerView = styled.div`
    background: ${ProjectColors.DARK_BACKGROUND};
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
`;
//endregion [[ Styles ]]

function ChatContainer() {
    return (
        <>
            <ChatContainerView>
                <ChatHeader />
                <ChatSpace />
                <MessageBar />
            </ChatContainerView>
        </>
    );
}

export default ChatContainer;
