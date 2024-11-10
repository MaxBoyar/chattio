import styled from 'styled-components';
import { useAppStore } from '../../store/index.js';
import { Input } from 'antd';

//region [[ Styles ]]
const ProfileView = styled.div`
    background: #1b1c24;
    height: 100vh;

    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    justify-content: center;
    align-items: center;
`;

const ProfileView2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 80vw;
`;
const DarkInput2 = styled(Input)`
    background-color: #1f1f1f;
    border-color: #333;
    color: #fff;

    &::placeholder {
        color: #aaa;
    }

    //&:hover,
    //&:focus {
    //    border-color: #555;
    //    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    //}
`;
const DarkInput = styled(Input)`
    background-color: #2a2a2a; /* Dark background */
    border-color: #444; /* Darker border */
    color: #e0e0e0; /* Light text color */

    &::placeholder {
        color: #777; /* Dark gray for placeholder */
    }

    &:hover {
        border-color: #555; /* Slightly lighter border on hover */
        background-color: #2a2a2a; /* Dark background */
    }

    &:focus {
        border-color: #888; /* Light border on focus */
        box-shadow: 0 0 5px rgba(136, 136, 136, 0.5); /* Soft gray glow */
        background-color: #2a2a2a; /* Dark background */
    }
`;

//maxi
const FormContainer = styled.div`
    width: 400px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
`;

const Title = styled.p`
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
`;

const Form = styled.form`
    margin-top: 1.5rem;
    display: grid;
    gap: 1rem;
`;

const InputGroup = styled.div`
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;

    label {
        display: block;
        color: rgba(156, 163, 175, 1);
        margin-bottom: 4px;
    }

    input {
        width: 100%;
        border-radius: 0.375rem;
        border: 1px solid rgba(55, 65, 81, 1);
        outline: 0;
        background-color: rgba(17, 24, 39, 1);
        padding: 0.75rem 1rem;
        color: rgba(243, 244, 246, 1);
    }

    input:focus {
        border-color: rgba(167, 139, 250, 1);
    }
`;

const SubmitButton = styled.button`
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 6%;
`;

const SocialMessage = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;

    .line {
        height: 1px;
        flex: 1 1 0%;
        background-color: rgba(55, 65, 81, 1);
    }

    .message {
        padding: 0 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: rgba(156, 163, 175, 1);
    }
`;
//endregion [[ Styles ]]

function Profile() {
    const { userInfo } = useAppStore();
    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target.username1.value, event.target.value);
    }
    return (
        <ProfileView>
            <FormContainer>
                <Title>Profile Setup</Title>
                <Form onSubmit={onSubmit}>
                    <InputGroup>
                        <input
                            id="username1"
                            name="username1"
                            type="text"
                            placeholder="123-45-678"
                            value={userInfo.email}
                        />
                    </InputGroup>
                    <InputGroup>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="First name"
                        />
                    </InputGroup>
                    <InputGroup>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Last name"
                        />
                    </InputGroup>
                    <SubmitButton className="sign" type={'submit'}>
                        Save Changes
                    </SubmitButton>
                </Form>
                {/*<SocialMessage>*/}
                {/*    <div className="line"></div>*/}
                {/*    <p className="message">*/}
                {/*        Enter Details to view Virtual Tour*/}
                {/*    </p>*/}
                {/*    <div className="line"></div>*/}
                {/*</SocialMessage>*/}
            </FormContainer>
            {/*<ProfileView2>*/}
            {/*    <p>Profile</p>*/}
            {/*    <div>Email:{userInfo.email}</div>*/}
            {/*    <DarkInput placeholder="Enter text" />*/}
            {/*</ProfileView2>*/}
        </ProfileView>
    );
}

export default Profile;
