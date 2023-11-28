import { useState, ChangeEvent } from 'react';
import Select from 'react-select';

import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from '../../services/apiCloudinary';

import { filterGroups } from '../../utils/mock/filters';

import DeleteIcon from '../../assets/close-white.png';
import Logo from '../../assets/logo.png';
import './ActivityForm.css';

const tempImg = Logo;

type FileInfo = {
  secureUrl: string;
  publicId: string;
};

const ActivityForm = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [isFileLoading, setIsFileLoading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      setIsFileLoading(true);

      const file = event.target.files![0];
      const info = (await uploadFileToCloudinary(file)) as FileInfo;

      setFileInfo(info);
      setIsFileLoading(false);
    } catch (error) {
      console.log('Upload file error!');
    }
  };

  const handleFileDelete = async () => {
    setIsFileLoading(true);

    const { publicId } = fileInfo;
    await deleteFileFromCloudinary(publicId);

    setFileInfo({} as FileInfo);
    setIsFileLoading(false);
  };

  // todo: upload multiple files

  // select
  // !problem: can select multiple from every option group
  const formatGroupLabel = (data: any) => (
    <div style={{ color: 'red' }}>
      <span>{data.label}</span>
    </div>
  );

  return (
    <div className="activity-form">
      <div className="file-upload-container">
        <div className="file-container">
          {isFileLoading ? (
            <img className="spinner" src={tempImg} alt="spinner" />
          ) : (
            <img src={fileInfo.secureUrl || tempImg} alt="uploaded image"></img>
          )}
          <button className="btn-delete-img" onClick={handleFileDelete}>
            <img src={DeleteIcon} alt="delete icon" />
          </button>
        </div>
        <div className="file-input-container">
          <input type="file" onChange={handleFileChange} />
          <label>upload a image</label>
        </div>
      </div>
      <div className="filter-container">
        filters
        <Select
          // <ColourOption | FlavourOption>
          defaultValue={filterGroups[0].options[0]}
          options={filterGroups}
          isMulti
          formatGroupLabel={formatGroupLabel}
        />
      </div>
      <div className="title-container">title</div>
      <div className="material-container">materials</div>
      <div className="description-container">description</div>
      <div className="button">publish</div>
    </div>
  );
};

export default ActivityForm;
