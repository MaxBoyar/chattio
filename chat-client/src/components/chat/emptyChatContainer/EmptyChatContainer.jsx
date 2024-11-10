import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '../../../assets/cat-lot.json';
import { ProjectColors } from '../../../utils/colors.js';

//region [[ Styles ]]
const EmptyChatContainerView = styled.div`
    background: ${ProjectColors.DARK_BACKGROUND};
    display: grid;
    grid-auto-flow: row;
    justify-content: center;
    align-content: center;
`;

const WelcomeText = styled.div`
    position: relative;
    bottom: 4.5rem;
    font-size: 1rem;
    line-height: 2.5rem;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
    position: relative;
    bottom: 4rem;
    right: 2rem;
`;
//endregion [[ Styles ]]

function EmptyChatContainer() {
    return (
        <>
            <EmptyChatContainerView>
                <Container>
                    <div>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: animationData,
                            }}
                            height={400}
                            width={400}
                        />
                    </div>
                    <WelcomeText>
                        <h1>Welcome to Chattio App</h1>
                        <p>Chat with your close friends</p>
                    </WelcomeText>
                </Container>
            </EmptyChatContainerView>
        </>
    );
}

export default EmptyChatContainer;
