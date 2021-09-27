import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {startSaveNote, startUpdateUrl} from "../../actions/notes";

const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);

    const handleSave = () => {
      dispatch(startSaveNote(active))
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file){
          dispatch(startUpdateUrl(file));
      }
    }

    return (
        <div className={'notes__appbar'}>
            <span>28 de agosts kjnv</span>
            <input
                id={'fileSelector'}
                type="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            <div>
                <button className="btn"
                onClick={handlePictureUpload}>
                    Picture
                </button>
                <button className="btn"
                onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default NotesAppBar;
