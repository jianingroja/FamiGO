import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import {
  setNewlyPublishedActivity,
  setDraftPublish,
  clearDraft,
  getDraftPublish,
  getAIDraftPublish,
  getAIId,
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
  PublishInfo,
} from '../../types/activity';

import { IoAddOutline } from 'react-icons/io5';
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
  const AIdraft = getAIDraftPublish();
  const AIId = getAIId();

  const bottomRef = useRef<HTMLDivElement>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo>({} as FileInfo);
  const [fileStatus, setFileStatus] = useState<null | string>(null);

  const [material, setMaterial] = useState<string>('');
  const [materials, setMaterials] = useState<string[]>([]);

  const [submitType, setSubmitType] = useState<string>('publish');

  const { control, handleSubmit, reset } = useForm<PublishFormInput>({
    defaultValues: {},
  });

  useEffect(() => {
    if (draft) {
      const { image, materials, ...defaultValues } = draft;
      console.log('draft', draft);

      setFileInfo(image);
      setMaterials(materials);
      reset(defaultValues);
    }
  }, []);

  useEffect(() => {
    if (AIdraft) {
      const { materials, ...defaultValues } = AIdraft;
      console.log('AIdraft', AIdraft);
      setMaterials(materials);
      reset(defaultValues);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      setSubmitType('draft');
    }
  }, [showModal]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFileStatus('loading');

    const file = event.target.files![0];
    const uploadPromise = uploadFileToCloudinary(file);

    const info = await toast.promise<FileInfo>(uploadPromise, {
      loading: 'uploading',
      success: <b>Uploaded!</b>,
      error: <b>Failed to upload...</b>,
    });

    setFileInfo(info);
    setFileStatus(null);
    scrollToBottom();
  };

  const handleFileDelete = async () => {
    setFileStatus('loading');
    const { publicId } = fileInfo;
    const deletePromise = deleteFileFromCloudinary(publicId);

    await toast.promise(deletePromise, {
      loading: 'deleting',
      success: <b>Deleted!</b>,
      error: <b>Failed to delete...</b>,
    });

    setFileInfo({} as FileInfo);
    setFileStatus(null);
  };

  // todo: upload multiple files

  // material
  const handleAddMaterial = () => {
    setMaterials((prev) => [...prev, material]);
    setMaterial('');
    scrollToBottom();
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
    toast.success('Your activity is saved!');
    setTimeout(() => {
      navigate('/feed');
    }, 2000);
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

  const handlePublish = async (activity: Activity) => {
    try {
      // ai
      const info: PublishInfo = {
        type: AIId ? 'ai' : 'normal',
        id: AIId || null,
      };

      const publishedActivity = await publishActivity(activity, info);

      dispatch(setNewlyPublishedActivity(publishedActivity));
      toast.success('Your activity is now published!');
      setTimeout(() => {
        navigate('/feed');
      }, 2000);
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
        toast('please fill in all inputs', { icon: '☀️' });
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
      dispatch(clearDraft());
      return;
    } catch (error) {
      console.log('submit err -->', error);
      toast.error('fail to submit');
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
            <img
              className={fileStatus === 'loading' ? 'loading' : ''}
              src={fileInfo.secureUrl || tempImg}
              alt="uploaded image"
            ></img>
            <button className="btn-delete-img" onClick={handleFileDelete}>
              <img src={DeleteIcon} alt="delete icon" />
            </button>
          </div>
          <div className="file-input-container">
            <input type="file" onChange={handleFileChange} />
            <label>Upload a image</label>
          </div>
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
              <div className="material-box">
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
                  <IoAddOutline size={20} />
                </button>
              </div>
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
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
      <div ref={bottomRef}></div>
    </>
  );
};

export default ActivityForm;
