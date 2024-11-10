import styled from 'styled-components';
import { Tabs } from 'antd';
import CredentialsForm from './credentialsForm/CredentialsForm.jsx';
import { apiClient } from '../../api/api-client.js';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants.js';
import { useNavigate } from 'react-router-dom';

//region [[ Styles ]]
const AuthView = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MainBox = styled.div`
    padding: 2rem;
    height: 50vh;
    width: 25vw;
    background-color: #ffffff;

    border-width: 2px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    display: grid;
    border-radius: 1.5rem;
`;

const SubMain = styled.div`
    display: grid;
    gap: 1rem;
    align-self: center;
`;

const StyledWelcome = styled.h1`
    font-size: 3rem;
    line-height: 1;
    font-weight: 700;

    @media (min-width: 768px) {
        font-size: 3.75rem;
        line-height: 1;
    }
`;

const StyledP = styled.p`
    font-weight: 500;
`;

const StyledP2 = styled.p`
    font-size: 2.4rem;
    line-height: 1;
    position: relative;
    top: 4px;
`;

const WelcomeContainer = styled.div`
    display: grid;
    justify-content: center;
`;

const WelcomeTitle = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;
`;

const StyledTabs = styled(Tabs)`
    width: 90%;
    justify-self: center;

    .ant-tabs-nav-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .ant-tabs-tab {
        width: 50%;
        justify-content: center;
    }
`;

//endregion [[ Styles ]]
const tabKeys = {
    login: {
        key: 'loginKey',
        title: 'Login',
    },
    signup: {
        key: 'signupKey',
        title: 'Signup',
    },
};

function Auth() {
    const tabs = [
        {
            key: tabKeys.login.key,
            label: tabKeys.login.title,
            children: <CredentialsForm />,
        },
        {
            key: tabKeys.signup.key,
            label: tabKeys.signup.title,
            children: <CredentialsForm signupPhase={true} />,
        },
    ];

    return (
        <AuthView>
            <MainBox>
                <SubMain>
                    <WelcomeContainer>
                        <WelcomeTitle>
                            <StyledWelcome>Welcome</StyledWelcome>
                            <StyledP2>✌️</StyledP2>
                        </WelcomeTitle>

                        <StyledP>
                            Fill in the details to get started with the chat
                        </StyledP>
                    </WelcomeContainer>
                    <StyledTabs
                        defaultActiveKey={tabKeys.login.key}
                        items={tabs}
                    />
                </SubMain>
            </MainBox>
        </AuthView>
    );
}

export default Auth;
