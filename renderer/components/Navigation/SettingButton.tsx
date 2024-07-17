import React from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/dropdown';
import useThemeStore from '../../store/theme.store';
import ConnectionModal from '../ProfileConnection/ConnectionModal';
import { useDisclosure } from '@nextui-org/modal';

function SettingButton() {
    const { theme, setTheme } = useThemeStore();
    const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

    return (
        <>
            <ConnectionModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
            <Dropdown className="p-0">
                <DropdownTrigger>
                    <div className="dark:bg-dark-dc-secondary bg-light-dc-secondary w-12 h-12 rounded-full hover:cursor-pointer flex flex-col justify-center ">
                        <CgMenuGridO
                            className="mx-auto"
                            size={25}
                            color={theme == 'dark' ? '#DBDEE1' : '#303338'}
                        />
                    </div>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Static Actions"
                    className={`${theme == 'dark' ? 'bg-dark-dc-menu text-dark-dc-menu-text' : 'bg-white'}  rounded-md p-2`}
                >
                    <DropdownItem onClick={onOpen} key="connection">
                        My Connection
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            setTheme(theme == 'dark' ? 'light' : 'dark');
                        }}
                        key="theme"
                    >
                        Change Theme
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}

export default SettingButton;
