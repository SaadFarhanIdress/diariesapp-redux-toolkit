import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Diary } from '../../interfaces/diary.interface';
import http from '../../services/api';
import { Grid, Paper, Button } from '@mui/material';
import { useAppDispatch } from '../../store';
import { showAlert } from '../../utils';
import { setActiveDiaryId, setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import { updateDiary } from './diariesSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
    diary: Diary
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em',
};

const DiaryTile: React.FC<Props> = ({ children, diary: _diary }) => {

    const [diary, setDiary] = useState(_diary);
    const [editing, isEditing] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const totalEntries = _diary?.entryIds?.length;

    const saveChanges = async () => {
        try {
            const res = await http.put<Diary, Diary>(`/diaries/${_diary.id}`);
            if (res) {
                dispatch(updateDiary(diary));
                showAlert('Saved!', 'success');
            }
            isEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid item xs={2}>
            <Paper className="diary-tile">
                <h4 className="date">{new Date(diary.createdAt!).toDateString()}</h4>
                <h2 className="title" title="Click to edit" onClick={() => isEditing(true)} style={{
                    cursor: 'pointer',
                }}
                >
                    {editing ? (
                        <input value={diary.title} onChange={(e) => { setDiary({ ...diary, title: e.target.value, }); }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    saveChanges();
                                }
                            }}
                        />
                    ) : (
                        <span>{diary.title} <br /> <span className="meta">({diary.type} Diary)</span></span>
                    )}
                </h2>
                <p className="subtitle">{totalEntries ?? '0'} saved entries</p>

                <div style={{ display: 'flex', marginTop: 10, justifyContent: "space-between" }}>
                    <Button
                        style={buttonStyle}
                        onClick={() => {
                            dispatch(setCanEdit(true));
                            dispatch(setActiveDiaryId(diary.id as string));
                            dispatch(setCurrentlyEditing(null));
                            navigate('/editor')
                        }}
                    >
                        Add Entry
                    </Button>
                    <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
                        <Button style={buttonStyle}>
                            View all
                        </Button>
                    </Link>
                </div>
            </Paper>
        </Grid>
    );
}

export default DiaryTile;
