import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import useThemeStore from '../../store/theme.store';
import { Button } from '@nextui-org/react';
import useConnectionStore from '../../store/connection.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    makeConnection,
    TypeMakeConnectionSchema,
} from '../../validation/connection.validation';
import { Spinner } from '@nextui-org/spinner';
import { useQueryClient } from '@tanstack/react-query';

type ConnectionModalProp = {
    isOpen: any;
    onOpenChange: any;
    onClose: any;
};

function ConnectionModal({
    isOpen,
    onOpenChange,
    onClose,
}: ConnectionModalProp) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm<TypeMakeConnectionSchema>({
        resolver: zodResolver(makeConnection),
    });
    const { theme } = useThemeStore();
    const { updateDisplay, updateConnection, connection } =
        useConnectionStore();

    const [rpcError, setRPCError] = useState(false);
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = window.ipc.on('rpc-validation', (message: any) => {
            if (message.success) {
                //close the form

                setLoading(false);
                setRPCError(false);
                updateDisplay(true);
                onClose();
            } else {
                //show the error message
                setLoading(false);
                setRPCError(true);
                updateDisplay(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleConnection = handleSubmit((data) => {
        updateConnection('userID', data.userID);
        if (data.clientID != connection.clientID) {
            setLoading(true);
            updateConnection('clientID', data.clientID);

            if (window.ipc) {
                window.ipc.send('test-rpc', {
                    clientId: data.clientID,
                });
            }
        } else {
            queryClient.invalidateQueries({ queryKey: ['profileData'] });
            onClose();
        }
    });

    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
        >
            <ModalContent
                className={`${theme == 'dark' ? 'bg-dark-dc-normal text-dark-dc-text' : 'bg-white'}`}
            >
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center pb-0">
                            <h1 className="text-lg font-black">
                                Profile Connection
                            </h1>
                            <p
                                className={`text-sm font-medium ${theme == 'dark' ? 'text-dark-dc-menu-text' : ''} `}
                            >
                                Set Up Activity Connection to Customize
                            </p>
                        </ModalHeader>
                        <ModalBody className="space-y-2 my-5">
                            <div className="space-y-1">
                                <p
                                    className={`text-xs mb-[5px] font-extrabold ${theme == 'dark' ? 'text-dark-dc-menu-text' : ''} `}
                                >
                                    Bot ClientID
                                    {rpcError ? (
                                        <span className="text-red-500">{` *Invalid`}</span>
                                    ) : (
                                        ''
                                    )}
                                </p>
                                <input
                                    defaultValue={connection.clientID}
                                    {...register('clientID')}
                                    className={`w-full  outline-none px-3 rounded-md py-[10px] text-sm ${theme == 'dark' ? 'text-dark-dc-menu-text bg-dark-dc-primary' : 'bg-light-dc-menu-text'} `}
                                    type="text"
                                />
                            </div>

                            <div className="space-y-1">
                                <p
                                    className={`text-xs mb-[5px] font-extrabold ${theme == 'dark' ? 'text-dark-dc-menu-text' : ''} `}
                                >
                                    Discord UserID (Optional)
                                </p>
                                <input
                                    defaultValue={connection.userID}
                                    {...register('userID')}
                                    className={`w-full  outline-none px-3 rounded-md py-[10px] text-sm ${theme == 'dark' ? 'text-dark-dc-menu-text bg-dark-dc-primary' : 'bg-light-dc-menu-text'} `}
                                    type="text"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter
                            className={`${theme == 'dark' ? 'bg-dark-dc-secondary' : 'bg-light-dc-secondary'}`}
                        >
                            <Button
                                disabled={!isValid || loading}
                                onClick={handleConnection}
                                className={`bg-dc-blue text-white ${isValid || !loading ? '' : 'opacity-75'}`}
                            >
                                {loading ? (
                                    <Spinner size="sm" color="default" />
                                ) : (
                                    'Connect'
                                )}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ConnectionModal;
