import styled from 'styled-components';
import { useAppStore } from '../../../../store/index.js';

//region [[ Styles ]]
const ContactsListView = styled.div`
    max-height: 20vh;
    overflow-y: auto;
`;

const Contact = styled.div`
    display: flex;
    grid-auto-flow: column;
    place-items: center;
    gap: 0.5rem;

    color: white;
    padding-left: 2.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    transition: all 0.3s;
    cursor: pointer;

    background-color: ${(props) => (props.$isSelected ? '#8417ff' : 'none')};
    &:hover {
        background-color: ${(props) =>
            props.$isSelected ? '#7417ff' : '#f1f1f111'};
    }
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

function ContactsList({ contacts, isChannel = false }) {
    const {
        selectedChatData,
        setSelectedChatData,
        setSelectedChatType,
        setSelectedChatMessages,
    } = useAppStore();

    function onClick(contact) {
        if (isChannel) {
            setSelectedChatType('channel');
        } else {
            setSelectedChatType('contact');
        }
        setSelectedChatData(contact);
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    }

    return (
        <ContactsListView>
            {contacts.map((contact) => {
                const isSelected =
                    selectedChatData && selectedChatData._id === contact._id;
                const name = isChannel ? contact.name : contact.email;
                const iconLetter = isChannel ? '#' : (contact.email[0] ?? 'U');

                return (
                    <Contact
                        key={contact._id}
                        onClick={() => onClick(contact)}
                        $isSelected={isSelected}
                    >
                        <ContactCircleIcon $isChannel={isChannel}>
                            {iconLetter}
                        </ContactCircleIcon>
                        {name}
                    </Contact>
                );
            })}
        </ContactsListView>
    );
}

export default ContactsList;
