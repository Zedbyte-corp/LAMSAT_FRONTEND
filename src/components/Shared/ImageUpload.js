import React from 'react';
import ImageUploader from 'react-images-upload';
import { Popconfirm, Radio } from 'antd';
import PropTypes from 'prop-types';
import { DeleteTwoTone } from '@ant-design/icons';
import { getLocaleMessages } from 'redux/helper';

const CustomImageUpload = (props) => {
  const {
    isSingleImage,
    onDropImage,
    images,
    buttonText,
    imageLabel,
    fileSizeError,
    fileTypeError,
    image_url,
    onDefaultImageChange,
  } = props;

  const constructImageList = (imageData, index) => {
    const {
      isRemoved,
      keyPath,
      deleteImage,
      confirmMessage,
      cancelText,
      confirmText
    } = props;

    return (
      <>
        {imageData ? (
          <Radio
            value={`${imageData['path']}`}
            selected={image_url === imageData['path'] ? 'true' : 'false'}
          >
            <div
              className="periview-section"
              id={`${imageData['id']}display`}
              key={index}
            >
              {isRemoved ? (
                <>
                  <Popconfirm
                    title={confirmMessage}
                    onConfirm={() => deleteImage(imageData['id'])}
                    okText={confirmText}
                    cancelText={cancelText}
                  >
                    <DeleteTwoTone />
                  </Popconfirm>
                  <img
                    id={imageData['id']}
                    alt={'please check'}
                    src={`${imageData['path']}`}
                  />
                </>
              ) : (
                <img alt={'please check'} src={`${imageData}`} />
              )}
              {/* )} */}
            </div>
          </Radio>
        ) : (
          {}
        )}
      </>
    );
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="imgPreview">
          <Radio.Group onChange={onDefaultImageChange}>
            {images.map((imageList, index) =>
              constructImageList(imageList, index)
            )}
          </Radio.Group>
        </div>
      )}
      <div>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          buttonText={buttonText}
          onChange={onDropImage}
          imgExtension={['.jpeg', '.jpg', '.png', '.svg']}
          maxFileSize={1048576}
          singleImage={isSingleImage}
          label={imageLabel}
          fileSizeError={fileSizeError}
          fileTypeError={fileTypeError}
          buttonText={buttonText}
        />
      </div>
    </div>
  );
};

CustomImageUpload.defaultProps = {
  isSingleImage: false,
  images: [],
  isRemoved: false,
  keyPath: '',
  buttonText: getLocaleMessages({ id: 'label.uploadImages' }),
  imageLabel: getLocaleMessages({ id: 'label.imageLabel' }),
  fileSizeError: getLocaleMessages({ id: 'label.fileSizeError' }),
  fileTypeError: getLocaleMessages({ id: 'label.fileTypeError' }),
  confirmMessage: getLocaleMessages({ id: 'confirmMessage.deleteImage' }),
  confirmText: getLocaleMessages({ id: 'confirmText.yes' }),
  cancelText: getLocaleMessages({ id: 'cancelText.no' }),
};

CustomImageUpload.propTypes = {
  isSingleImage: PropTypes.bool,
  onDropImage: PropTypes.func.isRequired,
  images: PropTypes.array,
  isRemoved: PropTypes.bool,
  keyPath: PropTypes.string,
  deleteImage: PropTypes.func
};

export default CustomImageUpload;
