import styled from 'styled-components';
import Auth from './auth/Auth.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Chat from './chat/Chat.jsx';
import { useAppStore } from '../store/index.js';
import { useEffect, useState } from 'react';
import { ApiService } from '../api/api-client.js';
import { useNotification } from '../utils/useNotification.js';

//region [[ Styles ]]
const AppView = styled.div``;
//endregion [[ Styles ]]

function App() {
    const { contextHolder } = useNotification('warning');

    const [loading, setLoading] = useState(true);
    const { userInfo, setUserInfo } = useAppStore();
    const isAuthenticated = !!userInfo;

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await ApiService.getUserInfo();
                if (response.status === 200 && response.data.id) {
                    setUserInfo(response.data);
                } else {
                    setUserInfo(undefined);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(undefined);
            } finally {
                setLoading(false);
            }
        }

        if (!userInfo) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, [setUserInfo, userInfo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {contextHolder}
            <AppView>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/auth"
                            element={
                                isAuthenticated ? (
                                    <Navigate to={'/chat'} />
                                ) : (
                                    <Auth />
                                )
                            }
                        />
                        <Route
                            path="/chat"
                            element={
                                isAuthenticated ? (
                                    <Chat />
                                ) : (
                                    <Navigate to={'/auth'} />
                                )
                            }
                        />
                        <Route path="/*" element={<Auth />} />
                    </Routes>
                </BrowserRouter>
            </AppView>
        </>
    );
}

export default App;
