import { useDispatch } from 'react-redux';
import { setSwarm } from '@/redux/swarmSlice';
import { setCurrentSwarm, setUserSwarms } from '@/redux/userSlice';

const useDeleteSwarm = () => {
    const dispatch = useDispatch();

    const handleSwarm = (swarm_ids: string[], swarm_names: { [swarm_id: string]: string }) => {
        dispatch(setUserSwarms({ swarm_ids, swarm_names }));
        dispatch(setCurrentSwarm(''));
    };

    const handleDeleteSwarm = async (swarm_id: string) => {
        try {
            const response = await fetch('/api/spawn/deleteSwarm', {
                method: 'POST',
                body: JSON.stringify({ swarm_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleSwarm(data.user_swarms.swarm_ids, data.user_swarms.swarm_names);
            } else {
                throw new Error('Creating swarm failed due to server error');
            }
        } catch (error) {
            console.error("Error creating swarm:", error);
            throw error;
        }
    };

    return { handleDeleteSwarm };
};

export default useDeleteSwarm;
