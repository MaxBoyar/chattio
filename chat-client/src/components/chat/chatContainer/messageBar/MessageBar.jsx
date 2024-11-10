import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { useState } from 'react';
import { useAppStore } from '../../../../store/index.js';
import { useSocket } from '../../../../context/SocketContext.jsx';

//region [[ Styles ]]
const MessageBarView = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-self: end;
    padding: 1rem;
`;

const ChatInput = styled.input`
    height: 3rem;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    background-color: #23252d;

    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);

    &:focus {
        border: none;
        outline: none;
    }
`;

const SendButton = styled.button`
    height: 2.95rem;
    align-items: center;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    font-family: 'Phantomsans', sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 100px;
    padding: 19px 24px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;

    &:hover,
    &:active {
        outline: 0;
    }
`;
//endregion [[ Styles ]]

function MessageBar() {
    const { selectedChatType, selectedChatData, userInfo } = useAppStore();
    const socket = useSocket();
    const [message, setMessage] = useState('');

    async function onSendMessage() {
        if (message.length > 0 && selectedChatType === 'contact') {
            socket.emit('sendMessage', {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData._id,
                messageType: 'text',
            });
        } else if (selectedChatType === 'channel') {
            socket.emit('sendChannelMessage', {
                sender: userInfo.id,
                content: message,
                messageType: 'text',
                channelId: selectedChatData._id,
            });
        }
        setMessage('');
    }

    function onHandleKeyDown(event) {
        if (event.key === 'Enter') {
            onSendMessage();
        }
    }

    return (
        <>
            <MessageBarView>
                <ChatInput
                    type={'text'}
                    placeholder={'Enter Message'}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onHandleKeyDown}
                    value={message}
                />

                <SendButton onClick={onSendMessage}>
                    <IoMdSend />
                </SendButton>
            </MessageBarView>
        </>
    );
}

export default MessageBar;
