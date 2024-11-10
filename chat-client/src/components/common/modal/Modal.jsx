import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { Modal } from 'antd';
import { useState } from 'react';

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
//endregion [[ Styles ]]

function CustomModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

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
                {props.children}
            </DarkModal>
        </NewDmView>
    );
}

export default CustomModal;
