import { useState, ChangeEvent } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from '../../services/apiCloudinary';
import { publishActivity } from '../../services/activity';
import FiltersSelect from '../FiltersSelect/FiltersSelect';

import { Activity, FiltersWithValues } from '../../types/activity';

import DeleteIcon from '../../assets/close-white.png';
import Logo from '../../assets/logo.png';
import './ActivityForm.css';

const tempImg = Logo;

type FileInfo = {
  secureUrl: string;
  publicId: string;
};

type Option = {
  label: string;
  value: string;
};

type FormInput = {
  topic: Option;
  numOfKids: Option;
  age: Option;
  difficulty: Option;
  place: Option;
  duration: Option;
  title: string;
  materials: string[];
  description: string;
};

const ActivityForm = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [isFileLoading, setIsFileLoading] = useState(false);

  const { control, handleSubmit } = useForm<FormInput>();

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

  // form
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
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

    const { title, materials, description, ...filtersOrigin } = data;
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
    }
  };

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
          <Controller
            name="materials"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
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

// todo: materials should be an array
