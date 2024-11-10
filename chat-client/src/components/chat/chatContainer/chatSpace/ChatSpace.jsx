import styled from 'styled-components';
import { useAppStore } from '../../../../store/index.js';
import { useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { ApiService } from '../../../../api/api-client.js';
import userInfo from '../../contactsContainer/userInfo/UserInfo.jsx';

//region [[ Styles ]]
const ChatSpaceView = styled.div`
    overflow-y: auto;
    padding: 1rem 4rem;
`;

const Date = styled.div`
    text-align: center;
    color: #6b7280;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Message = styled.div`
    background-color: ${(props) =>
        props.$isOwnMessage
            ? 'rgba(42, 43, 51, 0.05)'
            : 'rgba(132, 23, 255, 0.05)'};

    color: ${(props) =>
        props.$isOwnMessage
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(132, 23, 255, 0.9)'};

    border: 1px solid
        ${(props) =>
            props.$isOwnMessage
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(132, 23, 255, 0.5)'};

    display: inline-block;
    padding: 0.3rem 1rem;
    border-radius: 0.25rem;
    max-width: 50%;
    word-break: break-word;
`;

const MessageDate = styled.div`
    font-size: 0.75rem;
    color: #4b5563;
    padding-top: 0.3rem;
`;

const MessageContainer = styled.div`
    padding: 1rem 0;
    text-align: ${(props) => (props.$isOwnMessage ? 'left' : 'right')};
`;
//endregion [[ Styles ]]

function ChatSpace() {
    const chatEndRef = useRef();
    const {
        selectedChatType,
        selectedChatData,
        selectedChatMessages,
        setSelectedChatMessages,
        userInfo,
    } = useAppStore();

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChatMessages]);

    useEffect(() => {
        async function getMessages() {
            try {
                const response = await ApiService.getMessages(
                    selectedChatData._id
                );
                if (response.data.messages.length > 0) {
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function getChannelMessages() {
            try {
                const response = await ApiService.getChannelMessages(
                    selectedChatData._id
                );
                if (response.data.messages.length > 0) {
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (selectedChatData._id) {
            if (selectedChatType === 'contact') {
                console.log('XXX-CON');
                getMessages();
            } else if (selectedChatType === 'channel') {
                console.log('XXX-CHN');
                getChannelMessages();
            }
        }
    }, [selectedChatData._id, selectedChatType, setSelectedChatMessages]);

    function renderMessages() {
        let lastDate = null;

        return selectedChatMessages.map((message) => {
            const isOwnMessage = message.sender === selectedChatData._id;

            const messageDate = moment(message.timeStamp).format('YYYY-MM-DD');
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;

            return (
                <MessageContainer key={message.id} $isOwnMessage={isOwnMessage}>
                    {showDate && <Date>{message.date}</Date>}
                    {selectedChatType === 'contact' &&
                        renderDm(message, isOwnMessage)}
                    {selectedChatType === 'channel' &&
                        renderChannelMessages(message, isOwnMessage)}
                </MessageContainer>
            );
        });
    }

    function renderDm(message, isOwnMessage) {
        return (
            <>
                <Message $isOwnMessage={isOwnMessage}>
                    {message.content}
                </Message>
                <MessageDate>
                    {moment(message.timeStamp).format('LT')}
                </MessageDate>
            </>
        );
    }

    function renderChannelMessages(message, isOwnMessage) {
        return (
            <>
                <Message $isOwnMessage={isOwnMessage}>
                    {message.content}
                </Message>
                <MessageDate>
                    {moment(message.timeStamp).format('LT')}
                </MessageDate>
            </>
        );
    }

    return (
        <ChatSpaceView>
            {renderMessages()}
            <div ref={chatEndRef} />
        </ChatSpaceView>
    );
}

export default ChatSpace;
