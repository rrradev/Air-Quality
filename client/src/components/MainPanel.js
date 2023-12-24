import React from 'react';
import ChartGroup from './charts/ChartGroup';
import CardGroup from './cards/CardGroup';
import NavBar from './NavBar';
import './MainPanel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPanel = (props) => {
    const notify = (error) => toast.error(error.message, {
        position: "bottom-right",
        autoClose: false,
        draggable: true,
        closeOnClick: false,
        theme: 'colored',
        icon: "☄️",
        toastId: "error",
    });

    const dismissToast = () => toast.dismiss("error");

    return (
        <div id="panel">
            <ToastContainer />
            <NavBar isBulbOn={props.themeToggler} />
            <CardGroup notify={notify} dismissToast={dismissToast} />
            <ChartGroup />
        </div>
    );
}

export default MainPanel;