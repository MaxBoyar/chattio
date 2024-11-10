import styled, { css } from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { Empty, List, Modal } from 'antd';
import { useState } from 'react';
import Input from '../../../common/input/Input.jsx';
import { ApiService } from '../../../../api/api-client.js';
import { debounce } from 'lodash';
import { useAppStore } from '../../../../store/index.js';

//region [[ Styles ]]
const NewDmView = styled.div`
    display: grid;
    padding-top: 3px;
`;

const DarkModal = styled(Modal)`
    .ant-modal-content {
        background-color: #171920 !important;
    }

    .ant-modal-header {
        //background-color: #1e1e1e !important;
        background-color: transparent !important;
        color: #ffffff !important;
    }

    .ant-modal-title {
        color: #d0d2d5 !important;
        text-align: center;
    }

    .ant-modal-body {
        background-color: transparent !important;
        color: #ffffff !important;
    }

    .ant-modal-footer {
        background-color: transparent !important;
    }

    .ant-btn-primary {
        background-color: #4a90e2 !important;
        border-color: #4a90e2 !important;
    }

    .ant-btn-default {
        background-color: #333333 !important;
        color: #ffffff !important;
        border-color: #333333 !important;
    }
    .ant-modal-close-x {
        color: #ffffff !important;
    }
`;

const ModalContainer = styled.div`
    display: grid;
    padding: 1rem 0.5rem 1rem 0.5rem;
    height: 16rem;
`;

const StyledEmpty = styled(Empty)`
    .ant-empty-description {
        color: #959595;
    }
`;

const ListContainer = styled.div`
    overflow-y: auto;
`;

const ListItem = styled(List.Item)`
    padding-left: 0.5rem !important;
    cursor: pointer;
    &:hover {
        background-color: #1f222f;
        border-radius: 0.375rem;
    }
`;

const CustomInputStyling = css`
    margin-bottom: 1rem;
`;

const Avatars = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #9c27b0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ContactItem = styled.div`
    position: relative;
    top: 3px;
    color: white;
`;
//endregion [[ Styles ]]

function NewDm() {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [search, setSearch] = useState('');
    const [foundContacts, setFoundContacts] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

    const debouncedSearchContacts = debounce(async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const response = await ApiService.searchContacts(searchTerm);
                if (response.status === 200 && response.data.contacts) {
                    setFoundContacts(response.data.contacts);
                }
            } else {
                setFoundContacts([]);
            }
        } catch (error) {
            console.log(error);
        }
    }, 500);

    function onSelectContact(contact) {
        setIsModalVisible(false);
        setSearch('');
        setFoundContacts([]);

        setSelectedChatType('contact');
        setSelectedChatData(contact);
    }

    const onChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        debouncedSearchContacts(searchTerm);
    };

    return (
        <NewDmView>
            <FaPlus onClick={showModal} />
            <DarkModal
                title="Select a contact"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <ModalContainer>
                    <Input
                        placeholder={'Search contacts'}
                        value={search}
                        onChange={onChange}
                        $customStyles={CustomInputStyling}
                    />
                    {foundContacts.length <= 0 ? (
                        <StyledEmpty description={'Search contacts'} />
                    ) : (
                        <ListContainer>
                            <List
                                className="custom-scrollbar"
                                itemLayout="horizontal"
                                dataSource={foundContacts}
                                renderItem={(item, index) => (
                                    <ListItem
                                        key={index}
                                        onClick={() => onSelectContact(item)}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatars>M</Avatars>}
                                            description={
                                                <ContactItem>
                                                    {item.email}
                                                </ContactItem>
                                            }
                                        />
                                    </ListItem>
                                )}
                            />
                        </ListContainer>
                    )}
                </ModalContainer>
            </DarkModal>
        </NewDmView>
    );
}

export default NewDm;
