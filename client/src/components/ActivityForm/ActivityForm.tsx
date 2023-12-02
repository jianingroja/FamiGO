import { useState, useEffect, ChangeEvent } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import {
  setNewlyPublishedActivity,
  setDraftPublish,
  clearDraft,
  getDraftPublish,
} from '../../redux/activitySlice';
import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from '../../services/apiCloudinary';
import { publishActivity } from '../../services/activity';
import FiltersSelect from '../FiltersSelect/FiltersSelect';
import Modal from '../Modal/Modal';

import {
  FileInfo,
  Activity,
  FiltersWithValues,
  FiltersWithOptions,
  PublishFormInput,
  DraftPublish,
} from '../../types/activity';

import DeleteIcon from '../../assets/close-white.png';
import Logo from '../../assets/logo.png';
import './ActivityForm.css';

const tempImg = Logo;

type Props = {
  showModal: boolean;
  setShowModal: Function;
};

const ActivityForm = ({ showModal, setShowModal }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const draft = getDraftPublish();

  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [fileStatus, setFileStatus] = useState<null | string>(null);

  const [material, setMaterial] = useState<string>('');
  const [materials, setMaterials] = useState<string[]>([]);

  const [submitType, setSubmitType] = useState<string>('publish');
  // const [showModal, setShowModal] = useState<Boolean>(modal);

  const { control, handleSubmit, reset } = useForm<PublishFormInput>({
    defaultValues: {},
  });

  useEffect(() => {
    if (draft) {
      const { image, materials, ...defaultValues } = draft;

      setFileInfo(image);
      setMaterials(materials);
      reset(defaultValues);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      setSubmitType('draft');
    }
  }, [showModal]);

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

  const handleSaveDraft = (info: DraftPublish) => {
    dispatch(setDraftPublish(info));
    setShowModal(false);
    navigate('/feed');
    return;
  };

  const handleCheckPublish = (data: PublishFormInput) => {
    const hasAllInputs = Object.values(data).every(
      (input) => Boolean(input) === true
    );

    if (!hasAllInputs) {
      console.log('fill in all');
      return false;
    }

    if (!fileInfo.secureUrl) {
      console.log('upload an image');
      return false;
    }

    return true;
  };

  const formatOptionsToValues = (filters: FiltersWithOptions) => {
    let filtersCopy = {} as FiltersWithValues;

    Object.entries(filters).forEach(([key, option]) => {
      filtersCopy = {
        ...filtersCopy,
        [key]: option ? option.value : '',
      };
    });

    return filtersCopy;
  };

  const handlePublish = async (info: Activity) => {
    try {
      const publishedActivity = await publishActivity(info);

      console.log('ok, published!');
      dispatch(setNewlyPublishedActivity(publishedActivity));
      navigate('/feed');
    } catch (error) {
      throw error;
    }
  };

  // form
  const onSubmit: SubmitHandler<PublishFormInput> = async (data) => {
    try {
      if (submitType === 'draft') {
        const info: DraftPublish = {
          image: fileInfo,
          materials,
          ...data,
        };

        handleSaveDraft(info);
        return;
      }

      // publish
      const readyToPublish = handleCheckPublish(data);
      if (!readyToPublish) {
        return;
      }

      const { title, description, ...filtersOrigin } = data;
      const filtersWithValues = formatOptionsToValues(filtersOrigin);
      console.log('formatted -->', filtersWithValues);

      const info: Activity = {
        image: fileInfo.secureUrl,
        filters: filtersWithValues,
        title,
        materials,
        description,
      };
      console.log('send to backend -->', info);

      await handlePublish(info);

      return;
    } catch (error) {
      console.log('submit err -->', error);
      throw error;
    }
  };

  // modal
  const modalContent = 'Do you want to save it as a draft?';
  const modalBtnText = { cancel: 'No' };
  const handleModalCancel = () => {
    dispatch(clearDraft());
    setShowModal(false);
    setSubmitType('publish');
    navigate(-1);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSubmitType('publish');
  };

  return (
    <>
      {showModal && (
        <Modal
          content={modalContent}
          btnText={modalBtnText}
          onCancel={handleModalCancel}
          onClose={handleModalClose}
          isForm
          formName="my-form"
        />
      )}

      <div className="activity-form">
        <div className="file-upload-container">
          <div className="file-container">
            {fileStatus === 'loading' ? (
              <img className="spinner" src={tempImg} alt="spinner" />
            ) : (
              <img
                src={fileInfo.secureUrl || tempImg}
                alt="uploaded image"
              ></img>
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

        <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
          <FiltersSelect control={control} />
          <div className="activities-description-fields">
            <div className="title-container">
              <p>Title</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <textarea {...field} />}
              />
            </div>
            <div className="material-container">
              <p>Materials</p>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              <button
                className="buttonAdd"
                type="button"
                onClick={handleAddMaterial}
              >
                add
              </button>
              <div>
                {!!materials.length &&
                  materials.map((material, index) => (
                    <span
                      onClick={() => handleDeleteMaterial(index)}
                      key={index}
                    >
                      - {material}
                    </span>
                  ))}
              </div>
            </div>
            <div className="description-container">
              <p>Description</p>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <textarea {...field} />}
              />
            </div>

            <div className="button-box">
              <button className="button" type="submit">
                publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ActivityForm;
