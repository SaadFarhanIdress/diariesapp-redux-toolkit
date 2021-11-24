import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Diary } from '../../interfaces/diary.interface';
import http from '../../services/api';
import { useAppDispatch } from '../../store';
import { RootState } from '../rootReducer'
import Swal from 'sweetalert2';
import { addDiary } from './diariesSlice';
import { User } from '../../interfaces/user.interface';
import { setUser } from '../auth/userSlice';
import { Route, Routes } from 'react-router';
import DiaryEntriesList from './DiaryEntriesList';
import DiaryTile from './DiaryTile';
import { Grid } from '@mui/material';

const Diaries = () => {

    const dispatch = useAppDispatch();

    const diaries = useSelector((state: RootState) => state.diaries);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        (async () => {
            if (user) {
                const res = await http.get<null, Diary[]>(`/diaries/${user.id}`);
                if (res && res.length > 0) {
                    const sortedByUpdatedAt = res.sort((a, b) => (
                        dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                    ));
                    dispatch(addDiary(sortedByUpdatedAt))
                }
            }
        })();
    }, [dispatch, user]);

    const steps: string[] = ['1', '2'];

    const createDiary = async () => {

        const swalQueueStep = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next >',
            showCancelButton: true,
            progressSteps: steps,
            confirmButtonColor: '#7b68ee'
        });

        let result: any = [];
        const values = [{ titleText: 'Diary title' }, { titleText: 'Private or public diary?' }];
        const result_values: any = [0, 0];

        for (let currentStep = 0; currentStep < steps.length; currentStep++) {
            result = await swalQueueStep.fire({
                titleText: values[currentStep].titleText,
                input: 'text',
            });
            result_values[currentStep] = result.value;
        }

        if (result_values[0]) {

            const { diary, user: _user } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
                title: result_values[0],
                type: result_values[1],
                userId: user?.id
            });

            if (diary && user) {

                dispatch(addDiary([diary] as Diary[]));
                dispatch(addDiary([diary] as Diary[]));
                dispatch(setUser(_user));

                return Swal.fire({
                    titleText: 'All done!',
                    confirmButtonText: 'OK!'
                });

            }

        }

    };

    const DiariesContent = () => {
        return (<>
            <button onClick={createDiary}>Create New</button>
            <Grid container spacing={3} style={{marginTop: -15}}>
            {diaries.map((diary, idx) => (
                    <DiaryTile key={idx} diary={diary} />
            ))}
            </Grid>
        </>);
    }

    return (
        <div style={{ padding: '1em 0.4em' }}>
            <Routes>
                <Route path="/diary/:id" element={<DiaryEntriesList />} />
                <Route path="/" element={<DiariesContent />} />
            </Routes>
        </div>
    );
}

export default Diaries;
