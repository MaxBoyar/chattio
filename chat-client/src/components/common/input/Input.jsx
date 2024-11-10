import styled from 'styled-components';

//region [[ Styles ]]
const StyledInput = styled.input`
    height: 2.5rem;
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
    ${(props) => props.$customStyles}
`;
//endregion [[ Styles ]]

function Input(props) {
    return (
        <StyledInput
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e)}
            value={props.value}
            $customStyles={props.$customStyles}
        />
    );
}

export default Input;
