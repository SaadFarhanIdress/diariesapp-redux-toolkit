import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Diary } from '../../interfaces/diary.interface'
import { Entry } from '../../interfaces/entry.interface'
import http from '../../services/api'
import { useAppDispatch } from '../../store'
import { showAlert } from '../../utils'
import { updateDiary } from '../diary/diariesSlice'
import { RootState } from '../rootReducer';
import Markdown from 'markdown-to-jsx'
import { setCanEdit, setCurrentlyEditing } from './editorSlice'
import { updateEntry } from './entriesSlice'
import { Link } from 'react-router-dom'

const Editor = () => {
    const {currentlyEditing: entry, canEdit, activeDiaryId} = useSelector((state: RootState) => state.editor)
    
    const [editedEntry, updateEditedEntry] = useState(entry);
    const dispatch = useAppDispatch();

    const saveEntry = async () => {
        if (activeDiaryId == null) {
            return showAlert('Please select a diary.', 'warning');
        }
        if (entry == null) {
                const {diary, entry: _entry} = await http.post<Entry, {diary: Diary; entry: Entry}>(
                `/diaries/entry/${activeDiaryId}`,
                editedEntry);
                console.log(diary, _entry);
                dispatch(setCurrentlyEditing(_entry));
                dispatch(updateDiary(diary));
        } else {
            try {
                const _entry = await http.put<Entry, Entry>(`/diaries/entry/${entry.id}`);
                if (_entry != null) {
                    dispatch(setCurrentlyEditing(_entry));
                    dispatch(updateEntry(_entry));
                }
            } catch (error) {
               console.log(error);
            }
        }
        dispatch(setCanEdit(false));
    }

    const buttonStyle: React.CSSProperties = {
        fontSize: '0.7em',
        margin: '0 0.5em',
        marginBottom: '0.5em',
        marginLeft: 0,
    };

    useEffect(() => {
        updateEditedEntry(entry);
    }, [entry])
    
    return (
        <div className="editor">
            <Link to="/"><button style={buttonStyle}>Go Back</button></Link>
            <header
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: '0.2em',
                    paddingBottom: '0.2em',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
            >
                {entry && !canEdit ? (
                    <h4>
                        {entry.title}
                        <a
                            href="#edit"
                            onClick={(e) => {
                                e.preventDefault();
                                if (entry != null) {
                                    dispatch(setCanEdit(true));
                                }
                            }}
                            style={{ marginLeft: '0.4em' }}
                        >
                            (Edit)
                        </a>
                    </h4>
                ) : (
                    <input
                        value={editedEntry?.title ?? ''}
                        disabled={!canEdit}
                        placeholder="Title"
                        onChange={(e) => {
                            if (editedEntry) {
                                updateEditedEntry({
                                    ...editedEntry,
                                    title: e.target.value,
                                });
                            } else {
                                updateEditedEntry({
                                    title: e.target.value,
                                    content: '',
                                });
                            }
                        }}
                    />
                )}
            </header>
            {entry && !canEdit ? (
                <Markdown>{entry.content}</Markdown>
            ) : (
                <>
                    <textarea
                        disabled={!canEdit}
                        placeholder="Supports markdown!"
                        value={editedEntry?.content ?? ''}
                        onChange={(e) => {
                            if (editedEntry) {
                                updateEditedEntry({
                                    ...editedEntry,
                                    content: e.target.value,
                                });
                            } else {
                                updateEditedEntry({
                                    title: '',
                                    content: e.target.value,
                                });
                            }
                        }}
                    />
                    <button onClick={() => {
                        saveEntry()
                        }} disabled={!canEdit} style={{marginTop: 10, marginBottom: 5}}>
                        Save
                    </button>
                </>
            )}
        </div>
    )
}

export default Editor
