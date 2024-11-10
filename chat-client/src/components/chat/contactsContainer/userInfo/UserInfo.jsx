import styled from 'styled-components';
import { FaUserAstronaut } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { ProjectColors } from '../../../../utils/colors.js';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../../store/index.js';
import { ApiService } from '../../../../api/api-client.js';
import * as userInfo from 'react-router-dom';

//region [[ Styles ]]
const UserInfoView = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    background: #25262e;
    align-self: end;
    height: 5rem;
    align-content: center;
    padding: 1rem;
`;

const UserIconContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #c4c4c4;
    display: grid;
    justify-content: center;
    align-content: center;
`;

const LogoutIconContainer = styled.div`
    display: grid;
    justify-content: center;
    align-content: center;
`;

const ProfileName = styled.h6`
    position: relative;
    top: 2px;
    font-size: 1rem;
    color: ${ProjectColors.LIGHT_WHITE};
`;

const ProfileNameContainer = styled.div`
    display: grid;
    align-content: center;
    padding-left: 0.5rem;
`;
//endregion [[ Styles ]]

function UserInfo() {
    const { userInfo, setUserInfo } = useAppStore();
    const navigate = useNavigate();
    console.log(userInfo.email, 'XXX - ?12');

    async function logout() {
        try {
            const response = await ApiService.logout();
            if (response.status === 200) {
                navigate('/auth');
                setUserInfo(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserInfoView>
            <UserIconContainer>
                <FaUserAstronaut size={30} color="#9ca3af" />
            </UserIconContainer>
            <ProfileNameContainer>
                <ProfileName>{userInfo.email}</ProfileName>
            </ProfileNameContainer>
            <LogoutIconContainer>
                <CiLogout size={30} color="#9ca3af" onClick={logout} />
            </LogoutIconContainer>
        </UserInfoView>
    );
}

export default UserInfo;
