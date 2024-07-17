import React, { useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import { getProfiles } from '../../utils/database/ipc';
import useThemeStore from '../../store/theme.store';
import { Button } from '@nextui-org/react';

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
    const { theme } = useThemeStore();

    useEffect(() => {
        loadProfiles();
    }, []);

    async function loadProfiles() {
        const fetchedProfiles = await getProfiles();
        console.log(fetchedProfiles);
    }

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
                                    ClientID
                                </p>
                                <input
                                    className={`w-full  outline-none px-3 rounded-md py-[10px] text-sm ${theme == 'dark' ? 'text-dark-dc-menu-text bg-dark-dc-primary' : 'bg-light-dc-menu-text'} `}
                                    type="text"
                                />
                            </div>

                            <div className="space-y-1">
                                <p
                                    className={`text-xs mb-[5px] font-extrabold ${theme == 'dark' ? 'text-dark-dc-menu-text' : ''} `}
                                >
                                    UserID
                                </p>
                                <input
                                    className={`w-full  outline-none px-3 rounded-md py-[10px] text-sm ${theme == 'dark' ? 'text-dark-dc-menu-text bg-dark-dc-primary' : 'bg-light-dc-menu-text'} `}
                                    type="text"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter
                            className={`${theme == 'dark' ? 'bg-dark-dc-secondary' : 'bg-light-dc-secondary'}`}
                        >
                            <Button className="bg-dc-blue text-white">
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ConnectionModal;
