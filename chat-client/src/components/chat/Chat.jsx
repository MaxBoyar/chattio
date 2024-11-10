import styled from 'styled-components';
import { useAppStore } from '../../store/index.js';
import ContactsContainer from './contactsContainer/ContactsContainer.jsx';
import EmptyChatContainer from './emptyChatContainer/EmptyChatContainer.jsx';
import ChatContainer from './chatContainer/ChatContainer.jsx';

//region [[ Styles ]]
const ChatView = styled.div`
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;
`;
//endregion [[ Styles ]]

function Chat() {
    const { selectedChatType } = useAppStore();

    return (
        <>
            <ChatView>
                <ContactsContainer />
                {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
            </ChatView>
        </>
    );
}

export default Chat;
