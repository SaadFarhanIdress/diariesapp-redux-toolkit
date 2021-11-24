import { Button } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Entry } from '../../interfaces/entry.interface';
import http from '../../services/api';
import { useAppDispatch } from '../../store';
import { setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import { setEntries } from '../entry/entriesSlice';
import { RootState } from '../rootReducer'

const DiaryEntriesList = () => {
    const {entries} = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const navigate = useNavigate();

    const getEntries = async () => {
        try {
            const {entries: _entries} = await http.get<null, { entries: Entry[] }>
            (`/diaries/entries/${id}`);
            if (_entries) {
                const sortByLastUpdated = _entries.sort((a, b) => (
                    dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                ));
                dispatch(setEntries(sortByLastUpdated));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const buttonStyle: React.CSSProperties = {
        fontSize: '0.7em',
        marginTop: '0.5em',
    };

    useEffect(() => {
        if (id != null) {
            getEntries();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch])
    return (
        <div className="entries">
            <header>
                <Link to="/"><Button style={buttonStyle}>Go Back</Button></Link>
            </header>
            <ul>
                {entries.map((entry) => (
                    <li
                        key={entry.id}
                        className="entry"
                    >
                        <>{entry.title}</>
                        <Button style={{ width: 40 }} onClick={() => {
                            dispatch(setCurrentlyEditing(entry));
                            dispatch(setCanEdit(true));
                            navigate('/editor')
                        }}>Edit</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DiaryEntriesList
