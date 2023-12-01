import { useState, ChangeEvent } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { setNewlyPublishedActivity } from '../../redux/activitySlice';
import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from '../../services/apiCloudinary';
import { publishActivity } from '../../services/activity';
import FiltersSelect from '../FiltersSelect/FiltersSelect';

import {
  FileInfo,
  PublishFormInput,
  Activity,
  FiltersWithValues,
} from '../../types/activity';

import DeleteIcon from '../../assets/close-white.png';
import Logo from '../../assets/logo.png';
import './ActivityForm.css';

const tempImg = Logo;

const ActivityForm = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [fileStatus, setFileStatus] = useState<null | string>(null);

  const [material, setMaterial] = useState<string>('');
  const [materials, setMaterials] = useState<Array<string>>([]);

  const { control, handleSubmit } = useForm<PublishFormInput>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      setFileStatus('loading');

      const file = event.target.files![0];
      const info = (await uploadFileToCloudinary(file)) as FileInfo;

      setFileInfo(info);
      setFileStatus(null);
    } catch (error) {
      console.log('Upload file error!');
      setFileStatus('failed');
    }
  };

  const handleFileDelete = async () => {
    try {
      setFileStatus('loading');

      const { publicId } = fileInfo;
      await deleteFileFromCloudinary(publicId);

      setFileInfo({} as FileInfo);
      setFileStatus(null);
    } catch (error) {
      console.log('Delete file error!');
      setFileStatus('failed');
    }
  };

  // todo: upload multiple files

  // material
  const handleAddMaterial = () => {
    setMaterials((prev) => [...prev, material]);
    setMaterial('');
  };

  const handleDeleteMaterial = (index: number) => {
    setMaterials((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  // form
  const onSubmit: SubmitHandler<PublishFormInput> = async (data) => {
    // check all inputs are provided=
    const hasAllInputs = Object.values(data).every(
      (input) => Boolean(input) === true
    );

    if (!hasAllInputs) {
      console.log('fill iin all');
      return;
    }

    if (!fileInfo.secureUrl) {
      console.log('upload an image');
      return;
    }

    const { title, description, ...filtersOrigin } = data;
    let filtersCopy = {} as FiltersWithValues;

    Object.entries(filtersOrigin).forEach(([key, { value }]) => {
      filtersCopy = {
        ...filtersCopy,
        [key]: value,
      };
    });

    console.log('formatted -->', filtersCopy);

    const info: Activity = {
      image: fileInfo.secureUrl,
      filters: filtersCopy,
      title,
      materials,
      description,
    };

    console.log('send to backend -->', info);
    const publishedActivity = await publishActivity(info);

    // todo
    // save data to redux, go to feed, render  new activity

    if (publishedActivity) {
      console.log('ok, published!');
      dispatch(setNewlyPublishedActivity(publishedActivity));
      navigate('/feed');
    }
  };

  return (
    <div className="activity-form">
      <div className="file-upload-container">
        <div className="file-container">
          {fileStatus === 'loading' ? (
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
        {fileStatus && <p className="status">{fileStatus}...</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FiltersSelect control={control} />

        <div className="title-container">
          <label>Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
        </div>
        <div className="material-container">
          <label>Materials</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <button type="button" onClick={handleAddMaterial}>
            add
          </button>
          <div>
            {!!materials.length &&
              materials.map((material, index) => (
                <span onClick={() => handleDeleteMaterial(index)} key={index}>
                  - {material}{' '}
                </span>
              ))}
          </div>
        </div>
        <div className="description-container">
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
        </div>
        <button type="submit">publish</button>
      </form>
    </div>
  );
};

export default ActivityForm;
