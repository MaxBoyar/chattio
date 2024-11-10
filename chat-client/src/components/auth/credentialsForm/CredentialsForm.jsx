import styled from 'styled-components';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useNotification } from '../../../utils/useNotification.js';
import { useAuthUtils } from '../_utils/AuthUtils.js';

//region [[ Styles ]]
const CredentialsFormView = styled.form`
    display: grid;
    gap: 1rem;
`;

const StyledInput = styled(Input)`
    display: grid;
    gap: 1rem;
    ${(props) => props.$isError && 'border-color: red;'}
`;

const StyledPasswordInput = styled(Input.Password)`
    ${(props) => props.$isError && 'border-color: red;'}
`;
//endregion [[ Styles ]]

function CredentialsForm(props) {
    const submitButtonText = props.signupPhase ? 'Sign Up' : 'Login';
    const { contextHolder, notify } = useNotification('warning');
    const { handleLogin, handleSignup } = useAuthUtils();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formError, setFormError] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });

    function inputValidation(formData) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = { email: false, password: false, confirmPassword: false };
        let errorMessages = [];

        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = true;
            errorMessages.push('Please enter a valid email.');
        }
        if (!formData.password) {
            errors.password = true;
            errorMessages.push('Password is required.');
        }
        if (
            props.signupPhase &&
            formData.password !== formData.confirmPassword
        ) {
            errors.confirmPassword = true;
            errorMessages.push('Passwords do not match.');
        }

        setFormError(errors);
        if (errorMessages.length > 0) {
            notify('Error occurred.', errorMessages.join('\n'));
        }

        return !errors.email && !errors.password && !errors.confirmPassword;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    async function onSubmit(event) {
        event.preventDefault();
        if (inputValidation(formData)) {
            const handler = props.signupPhase ? handleSignup : handleLogin;
            try {
                await handler(formData.email, formData.password + '1');
            } catch (error) {
                notify('Error occurred.', error.message);
            }
        }
    }

    return (
        <>
            {contextHolder}
            <CredentialsFormView>
                <StyledInput
                    onChange={handleChange}
                    name={'email'}
                    type="email"
                    size="large"
                    placeholder="Email"
                    $isError={formError.email}
                />
                <StyledPasswordInput
                    onChange={handleChange}
                    name={'password'}
                    size="large"
                    placeholder="Password"
                    $isError={formError.password}
                />
                {props.signupPhase && (
                    <StyledPasswordInput
                        onChange={handleChange}
                        name={'confirmPassword'}
                        size="large"
                        placeholder="Confirm Password"
                        $isError={formError.confirmPassword}
                    />
                )}
                <Button
                    type="primary"
                    shape="round"
                    size={'large'}
                    onClick={onSubmit}
                >
                    {submitButtonText}
                </Button>
            </CredentialsFormView>
        </>
    );
}

export default CredentialsForm;
