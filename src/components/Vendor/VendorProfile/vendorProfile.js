import React, { useState, useEffect } from 'react';
import ImageUpload from 'components/Shared/ImageUpload';
import { Card, Tabs, Form, Input, Button, message } from 'antd';
import { getLocalData, getLocaleMessages } from 'redux/helper';
import { formProps } from 'containers/OnBoarding/constant';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/auth/actions';
import userDetailActions from 'redux/UserDetail/actions';
import { store } from 'redux/store';

const { TabPane } = Tabs;

const VendorProfile = () => {
    const {
        vendorLanguange,
        vendorProfileLoader,
        isVendorProfile,
    } = useSelector((state) => state.Auth);
    const { imageUploadLoader } = useSelector((state) => state.UserProfile);
    const dispatch = useDispatch();

    // let getLanguageDetails = getLocalData('language');
    const [getLanguageIndex, setLangauageindex] = useState(0);
    const [vendorLanguageShortName, setVendorLanguageShortName] = useState(
        null
    );
    const [profileUsedForm] = Form.useForm();

    useEffect(() => {
        if (isVendorProfile) {
            store.dispatch({
                type: actions.VENDOR_EDIT_PROFILE_STATUS,
                payload: false,
            });
            profileUsedForm.resetFields();
        }
    }, [profileUsedForm, isVendorProfile]);

    useEffect(() => {
        if (vendorLanguageShortName === null) {
            setVendorLanguageShortName(
                vendorLanguange[`${getLanguageIndex}`]['languageshortname']
            );
        }
    }, [vendorLanguageShortName, vendorLanguange]);

    const callbackTabKey = (key) => {
        setLangauageindex(key);
        setVendorLanguageShortName(
            vendorLanguange[`${key}`]['languageshortname']
        );
        profileUsedForm.setFieldsValue({
            vendorname: vendorLanguange[`${key}`]['vendorname'],
            vendoraddress: vendorLanguange[`${key}`]['vendoraddress'],
            vendordescription: vendorLanguange[`${key}`]['vendordescription'],
        });
        profileUsedForm.validateFields();
    };

    const onChangeLanguageValue = ({ event, languageid, key }) => {
        event.preventDefault();
        dispatch({
            type: actions.SET_VENDOR_LANGUAGE_DETAILS,
            payload: {
                languageid: languageid,
                value: event.target.value,
                key: key,
            },
        });
    };

    const onDeleteImage = (id) => {
        dispatch({
            type: actions.VENDOR_IMAGE_REMOVED,
            payload: id,
        });
    };

    const onFinish = (values) => {
        let newArrayLanguage = [...vendorLanguange];
        newArrayLanguage = newArrayLanguage.filter(
            (singleLanguageList) =>
                singleLanguageList['vendorname'] &&
                singleLanguageList['vendorname'].length > 0 &&
                singleLanguageList['vendordescription'] &&
                singleLanguageList['vendordescription'].length &&
                singleLanguageList['vendoraddress'] &&
                singleLanguageList['vendoraddress'].length
        );
        if (newArrayLanguage.length === vendorLanguange.length) {
            let vendorProfileData = {
                vendorLanguange,
                firstname: values['firstname'],
                lastname: values['lastname'],
                latitude: values['latitude'],
                longitude: values['longitude'],
                servicelocation: values['servicelocation'],
            };
            if (values['images'] && values['images'].length) {
                values['images'].filter((singleImage) => {
                    let siteparam = new FormData();
                    let uploadImage = [];
                    siteparam.set('files', singleImage, singleImage['name']);
                    dispatch({
                        type: userDetailActions.UPLOAD_IMAGE,
                        payload: siteparam,
                        callBackAction: (signedId) => {
                            uploadImage.push(signedId);
                            if (
                                uploadImage.length === values['images'].length
                            ) {
                                dispatch({
                                    type: actions.VENDOR_EDIT_PROFILE,
                                    payload: {
                                        ...vendorProfileData,
                                        images: [
                                            ...vendorProfileData['images'],
                                            ...uploadImage,
                                        ],
                                        callBackAction: (args) => {
                                            if (args) {
                                                store.dispatch({
                                                    type:
                                                        actions.VENDOR_EDIT_PROFILE_STATUS,
                                                    payload: false,
                                                });
                                                profileUsedForm.resetFields();
                                            }
                                        },
                                    },
                                });
                            }
                        },
                    });
                    return singleImage;
                });
            } else {
                dispatch({
                    type: actions.VENDOR_EDIT_PROFILE,
                    payload: {
                        ...vendorProfileData,
                    },
                    callBackAction: (args) => {
                        if (args) {
                            store.dispatch({
                                type: actions.VENDOR_EDIT_PROFILE_STATUS,
                                payload: false,
                            });
                            profileUsedForm.resetFields();
                        }
                    },
                });
            }
        } else {
            message.error(
                getLocaleMessages({ id: 'errorMessage.allLanguageRequired' })
            );
        }
    };

    const onDropImage = (pictureFiles) => {
        profileUsedForm.setFieldsValue({
            images: pictureFiles,
        });
    };

    const getLocaleLanguage = () => {
        return vendorLanguageShortName ? vendorLanguageShortName : 'en';
    };

    return (
        <Card>
            <div>
                <h4>Profile</h4>
            </div>
            <div>
                <h4>{getLocaleMessages({ id: 'title.profileInformation' })}</h4>
            </div>
            <Form
                initialValues={{
                    firstname: getLocalData('firstname'),
                    lastname: getLocalData('lastname'),
                    latitude: getLocalData('latitude'),
                    longitude: getLocalData('longitude'),
                    servicelocation: getLocalData('servicelocation'),
                    vendorname: vendorLanguange[getLanguageIndex]['vendorname'],
                    vendordescription:
                        vendorLanguange[getLanguageIndex]['vendordescription'],
                    vendoraddress:
                        vendorLanguange[getLanguageIndex]['vendoraddress'],
                    images: [],
                }}
                form={profileUsedForm}
                {...formProps}
                onFinish={onFinish}
            >
                <Tabs onChange={callbackTabKey}>
                    {vendorLanguange.map((languageDetail, index) => {
                        return (
                            <TabPane
                                tab={languageDetail['languagename']}
                                key={index}
                            >
                                <Form.Item
                                    label={getLocaleMessages({
                                        id: 'label.saloonName',
                                        localeLanguage: getLocaleLanguage(),
                                    })}
                                    name="vendorname"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: getLocaleMessages({
                                                id: 'errorMessage.saloonName',
                                                localeLanguage: getLocaleLanguage(),
                                            }),
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={getLocaleMessages({
                                            id: 'placeholder.saloonName',
                                            localeLanguage: getLocaleLanguage(),
                                        })}
                                        onChange={(event) =>
                                            onChangeLanguageValue({
                                                event: event,
                                                languageid:
                                                    languageDetail[
                                                        'languageid'
                                                    ],
                                                key: 'vendorname',
                                            })
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={getLocaleMessages({
                                        id: 'label.saloonDescription',
                                        localeLanguage: getLocaleLanguage(),
                                    })}
                                    name="vendordescription"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: getLocaleMessages({
                                                id:
                                                    'errorMessage.saloonDescription',
                                                localeLanguage: getLocaleLanguage(),
                                            }),
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder={getLocaleMessages({
                                            id: 'placeholder.saloonDescription',
                                            localeLanguage: getLocaleLanguage(),
                                        })}
                                        autoSize={{
                                            minRows: 2.5,
                                            maxRows: 4,
                                        }}
                                        onChange={(event) =>
                                            onChangeLanguageValue({
                                                event: event,
                                                languageid:
                                                    languageDetail[
                                                        'languageid'
                                                    ],
                                                key: 'vendordescription',
                                            })
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={getLocaleMessages({
                                        id: 'label.saloonAddress',
                                        localeLanguage: getLocaleLanguage(),
                                    })}
                                    name="vendoraddress"
                                    rules={[
                                        {
                                            required: true,
                                            message: getLocaleMessages({
                                                id:
                                                    'errorMessage.saloonAddress',
                                                localeLanguage: getLocaleLanguage(),
                                            }),
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder={getLocaleMessages({
                                            id: 'placeholder.saloonAddress',
                                            localeLanguage: getLocaleLanguage(),
                                        })}
                                        autoSize={{
                                            minRows: 2.5,
                                            maxRows: 4,
                                        }}
                                        onChange={(event) =>
                                            onChangeLanguageValue({
                                                event: event,
                                                languageid:
                                                    languageDetail[
                                                        'languageid'
                                                    ],
                                                key: 'vendoraddress',
                                            })
                                        }
                                    />
                                </Form.Item>
                            </TabPane>
                        );
                    })}
                </Tabs>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.firstName',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: getLocaleMessages({
                                id: 'errorMessage.firstName',
                                localeLanguage: getLocaleLanguage(),
                            }),
                        },
                    ]}
                >
                    <Input
                        placeholder={getLocaleMessages({
                            id: 'placeholder.firstName',
                            localeLanguage: getLocaleLanguage(),
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.lastName',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: getLocaleMessages({
                                id: 'errorMessage.lastName',
                                localeLanguage: getLocaleLanguage(),
                            }),
                        },
                    ]}
                >
                    <Input
                        placeholder={getLocaleMessages({
                            id: 'placeholder.lastName',
                            localeLanguage: getLocaleLanguage(),
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.latitude',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="latitude"
                    validateTrigger={['onBlur']}
                    rules={[
                        {
                            required: true,
                            message: getLocaleMessages({
                                id: 'errorMessage.latitude',
                                localeLanguage: getLocaleLanguage(),
                            }),
                        },
                        {
                            type: 'text',
                            validator: (_, value) => {
                                let latitudeDetails = value;
                                if (latitudeDetails.length) {
                                    const reg = /^-?\d*(\.\d*)?$/;
                                    if (reg.test(latitudeDetails)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(
                                            `${getLocaleMessages({
                                                id:
                                                    'errorMessage.numberOnlyAllowed',
                                                localeLanguage: getLocaleLanguage(),
                                            })}`
                                        );
                                    }
                                } else {
                                    return Promise.resolve();
                                }
                            },
                        },
                    ]}
                >
                    <Input
                        placeholder={getLocaleMessages({
                            id: 'placeholder.latitude',
                            localeLanguage: getLocaleLanguage(),
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.longitude',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="longitude"
                    validateTrigger={['onBlur']}
                    rules={[
                        {
                            required: true,
                            message: getLocaleMessages({
                                id: 'errorMessage.longitude',
                                localeLanguage: getLocaleLanguage(),
                            }),
                        },
                        {
                            type: 'text',
                            validator: (_, value) => {
                                let longitudeDetails = value;
                                if (longitudeDetails.length) {
                                    const reg = /^-?\d*(\.\d*)?$/;
                                    if (reg.test(longitudeDetails)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(
                                            `${getLocaleMessages({
                                                id:
                                                    'errorMessage.numberOnlyAllowed',
                                                localeLanguage: getLocaleLanguage(),
                                            })}`
                                        );
                                    }
                                } else {
                                    return Promise.resolve();
                                }
                            },
                        },
                    ]}
                >
                    <Input
                        placeholder={getLocaleMessages({
                            id: 'errorMessage.longitude',
                            localeLanguage: getLocaleLanguage(),
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.serviceLocation',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="servicelocation"
                    rules={[
                        {
                            required: true,
                            message: getLocaleMessages({
                                id: 'errorMessage.serviceLocation',
                                localeLanguage: getLocaleLanguage(),
                            }),
                        },
                    ]}
                >
                    <Input
                        placeholder={getLocaleMessages({
                            id: 'placeholder.serviceLocation',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        readOnly
                    />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({
                        id: 'label.saloonImage',
                        localeLanguage: getLocaleLanguage(),
                    })}
                    name="images"
                    style={
                        (imageUploadLoader || vendorProfileLoader) && {
                            pointerEvents: 'none',
                        }
                    }
                >
                    <ImageUpload
                        onDropImage={onDropImage}
                        keyPath={'image'}
                        images={getLocalData('images')}
                        isRemoved={true}
                        deleteImage={onDeleteImage}
                        buttonText={getLocaleMessages({
                            id: 'label.uploadImages',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        imageLabel={getLocaleMessages({
                            id: 'label.imageLabel',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        fileSizeError={getLocaleMessages({
                            id: 'label.fileSizeError',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        fileTypeError={getLocaleMessages({
                            id: 'label.fileTypeError',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        confirmMessage={getLocaleMessages({
                            id: 'confirmMessage.deleteImage',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        confirmText={getLocaleMessages({
                            id: 'confirmText.yes',
                            localeLanguage: getLocaleLanguage(),
                        })}
                        cancelText={getLocaleMessages({
                            id: 'cancelText.no',
                            localeLanguage: getLocaleLanguage(),
                        })}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={vendorProfileLoader || imageUploadLoader}
                        disabled={vendorProfileLoader || imageUploadLoader}
                    >
                        {getLocaleMessages({ id: 'label.submit' })}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default VendorProfile;
