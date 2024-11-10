import styled, { css } from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { Button, Empty, List, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import Input from '../../../common/input/Input.jsx';
import { ApiService } from '../../../../api/api-client.js';
import { debounce } from 'lodash';
import { useAppStore } from '../../../../store/index.js';

//region [[ Styles ]]
const CreateChannelView = styled.div`
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
    grid-auto-flow: row;
    gap: 0.5rem;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
`;

const DarkPurpleButton = styled(Button)`
    margin-top: 1rem;
    background-color: #4b0082 !important; // Dark purple color
    color: #fff;
    border: none;
    height: 2.5rem;
    font-size: 1rem;

    &:hover {
        background-color: #5e2d99; // Lighter shade of purple for hover
        color: #fff;
    }

    &:focus {
        background-color: #5e2d99;
        color: #fff;
        border: none;
    }
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

const DarkSelect = styled(Select)`
    min-height: 2.5rem;
    .ant-select-selector {
        background-color: #23252d !important;
        border: 1px solid rgba(55, 65, 81, 1) !important;
        color: #fff;
    }

    .ant-select-arrow {
        color: #fff;
    }

    .ant-select-dropdown {
        background-color: #333 !important;
        color: #fff !important;
    }

    .ant-select-selection-placeholder {
        color: rgba(243, 244, 246, 0.4);
        font-size: 0.8rem;
    }

    .ant-select-item {
        color: #fff !important;

        &:hover {
            background-color: #555;
        }
    }

    .ant-select-item-option-active {
        background-color: #555 !important;
    }
`;
//endregion [[ Styles ]]

function CreateChannel() {
    ////
    const { addChannel } = useAppStore();
    const [channelName, setChannelName] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);

    useEffect(() => {
        async function getAllContacts() {
            const response = await ApiService.getAllContacts();
            setAllContacts(response.data.contacts);
        }
        getAllContacts();
    }, []);

    async function createChannel() {
        try {
            if (channelName.length > 0 && selectedContacts.length > 0) {
                const response = await ApiService.createChannel(
                    channelName,
                    selectedContacts
                );
                if (response.status === 201) {
                    setChannelName('');
                    setSelectedContacts([]);
                    addChannel(response.data.channel);
                    setIsModalVisible(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onContactsSelect(value) {
        setSelectedContacts(value);
    }

    return (
        <CreateChannelView>
            <FaPlus onClick={showModal} />
            <DarkModal
                title="Fill the details to create a channel"
                visible={isModalVisible}
                footer={null}
            >
                <ModalContainer>
                    <Input
                        placeholder={'Channel name #'}
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        $customStyles={CustomInputStyling}
                    />
                    <DarkSelect
                        mode="multiple"
                        placeholder="Select contacts"
                        onChange={onContactsSelect}
                        options={allContacts}
                    />
                    <DarkPurpleButton onClick={createChannel} type="primary">
                        Create channel
                    </DarkPurpleButton>
                </ModalContainer>
            </DarkModal>
        </CreateChannelView>
    );
}

export default CreateChannel;
