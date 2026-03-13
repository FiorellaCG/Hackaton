import React, { createContext, useContext, useState } from 'react';
import StatusModal from './Components/StatusModal';
import ConfirmationModal from './Components/ConfirmationModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        confirmText: 'Aceptar'
    });

    const [confirmConfig, setConfirmConfig] = useState({
        isOpen: false,
        onConfirm: () => {},
        title: '',
        message: '',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        isDanger: false,
        requiresInput: false,
        inputPlaceholder: '',
        expectedInput: ''
    });

    const showModal = ({ type = 'info', title = '', message = '', confirmText = 'Aceptar' }) => {
        setModalConfig({
            isOpen: true,
            type,
            title,
            message,
            confirmText
        });
    };

    const hideModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const showConfirm = (options) => {
        setConfirmConfig({
            ...options,
            isOpen: true
        });
    };

    const hideConfirm = () => {
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    };

    const showError = (message, title = 'Error') => showModal({ type: 'error', title, message });
    const showSuccess = (message, title = 'Éxito') => showModal({ type: 'success', title, message });
    const showWarning = (message, title = 'Aviso') => showModal({ type: 'warning', title, message });

    return (
        <ModalContext.Provider value={{ showModal, hideModal, showError, showSuccess, showWarning, showConfirm, hideConfirm }}>
            {children}
            <StatusModal 
                isOpen={modalConfig.isOpen}
                onClose={hideModal}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
            />
            <ConfirmationModal 
                isOpen={confirmConfig.isOpen}
                onClose={hideConfirm}
                onConfirm={confirmConfig.onConfirm}
                title={confirmConfig.title}
                message={confirmConfig.message}
                confirmText={confirmConfig.confirmText}
                cancelText={confirmConfig.cancelText}
                isDanger={confirmConfig.isDanger}
                requiresInput={confirmConfig.requiresInput}
                inputPlaceholder={confirmConfig.inputPlaceholder}
                expectedInput={confirmConfig.expectedInput}
            />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
