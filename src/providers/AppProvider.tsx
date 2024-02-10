import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Contract } from 'starknet'
import { connect, disconnect } from 'starknetkit'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../configs/config'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'

const initialData = {
    contract: null as any,
    account: null as any,
    address: null as any,
    connection: null as any,
    handleConnetWalletBtnClick: null as any
}

export const AppContext = createContext(initialData)

export const useAppContext = () => {
    return useContext(AppContext)
}

interface IAppProvider {
    children: ReactNode
}

const AppProvider = ({ children }: IAppProvider) => {

    const [contract, setContract] = useState<null | any>()
    const [connection, setConnection] = useState<null | any>();
    const [account, setAccount] = useState<null | any>();
    const [address, setAddress] = useState<null | any>("");

    const connectWallet = async () => {
        const connection = await connect({
            webWalletUrl: "https://web.argent.xyz",
            dappName: "Kiboko Oframp",
        });

        if (connection && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);
        }
    };

    const disconnectWallet = async () => {
        await disconnect({ clearLastWallet: true });
        setConnection(null);
        setAccount(null);
        setAddress("");
    };


    const openConfirmDisconnectModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        centered: true,
        radius: "md",
        children: (
            <Text size="sm">
                Are you sure you want to disconnect your account?
            </Text>
        ),
        labels: { confirm: 'Disconnect', cancel: 'Cancel' },
        confirmProps: { radius: "md", variant: "light" },
        cancelProps: { radius: "md", variant: "light" },
        onCancel: () => { },
        onConfirm: () => disconnectWallet(),
    });


    // const makeContractConnection = () => {
    //     if (account) {
    //         const contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, account)
    //         setContract(contract)
    //     }
    // }

    const handleConnetWalletBtnClick = () => {
        console.log("clicked connect wallet")
        if (!account) {
            connectWallet()
        }
        else {

            disconnectWallet()

        }
    }

    const connectToStarknet = async () => {
        try {
        const connection = await connect({
            modalMode: "neverAsk",
            webWalletUrl: "https://web.argent.xyz",
            dappName: "Kiboko Offramp",
        
        
        });

        if (connection && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);
        }
    }catch(err){
console.log(err);
    }
    };

    const contextValue = useMemo(() => ({
        contract,
        account,
        address,
        connection,
        handleConnetWalletBtnClick
    }), [account, contract, address]);

    useEffect(() => {
       
        connectToStarknet();
    }, []);

    // useEffect(() => {
    //     makeContractConnection()
    // }, [account, address])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider