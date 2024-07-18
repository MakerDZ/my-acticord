import { useQuery } from '@tanstack/react-query';
import useConnectionStore from '../store/connection.store';

const useProfileData = () => {
    const { connection } = useConnectionStore();
    const userId = connection.userID;

    const goalQuery = async () => {
        if (userId == '' || userId == undefined) {
            return null;
        }
        const response = await fetch(
            `https://discordlookup.mesalytic.moe/v1/user/${userId}`
        );
        const data = await response.json();
        if (data.code && data.code == '10013') {
            return null;
        }
        return data;
    };

    const {
        data: profileData,
        isLoading: isProfileDataLoading,
        error: profileDataError,
        refetch: profileDataRefetch,
    } = useQuery({
        queryKey: ['profileData'],
        queryFn: () => goalQuery(),
        refetchOnMount: false,
        staleTime: Infinity,
    });

    return {
        profileData,
        isProfileDataLoading,
        profileDataError,
        profileDataRefetch,
    };
};

export default useProfileData;
