import {
  AddAPhotoOutlined,
  BorderColorOutlined,
  CameraAlt,
  Cancel,
  DeleteOutlineOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import moment from "moment-timezone";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import { blobToWebP } from "webp-converter-browser";
import { deepOrange } from "@mui/material/colors";
import { setLoader as setLoaderGlobal } from "store/slice/authSlice";
import { HtmlTooltip } from "../constants";

import { useAppDispatch, useAppSelector } from "store/store";
import { useCallback, useMemo, useRef, useState } from "react";
import { userAuthDetails } from "store/thunk/authThunk";
import { deleteImage, uploadImg } from "store/thunk/eventMapThunk";
import { hideModal, showModal } from "store/slice/modalSlice";
import {
  ProfileImageDeleteModal,
  ProfileNotificationTab,
  ProfileOverviewTab,
  ProfilePasswordTab,
  ProfileSecurityTab,
  ProfileTabs,
} from "molecules";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.authReducer);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const items = JSON.parse(localStorage.getItem("tenantId") || "{}");

  const [currentTab, setCurrentTab] = useState<any>(1);
  const [fileError, setFileError] = useState<any>("");
  const [profileURL, setProfileURL] = useState<any>("");
  const [files, setFiles] = useState<any>({
    base64: "",
    path: "",
    name: "",
    size: "",
    type: "",
  });
  const [imageUploaded, setImageUploaded] = useState<any>(false);

  const getBase64 = (filep: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      let reader = new FileReader();
      reader.readAsDataURL(filep);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: any, fileRejections: any) => {
      fileRejections.forEach((file: any) => {
        file.errors.forEach((err: any) => {
          if (err.code === "file-too-large") {
            setFileError("File is larger than 1MB");
            setFiles({
              base64: "",
              path: "",
              name: "",
              size: "",
              type: "",
            });
          }
          if (err.code === "file-invalid-type") {
            setFileError(err.message);
            setFiles({
              base64: "",
              path: "",
              name: "",
              size: "",
              type: "",
            });
          }
        });
      });
      if (acceptedFiles.length) {
        setImageUploaded(false);
        let filep: any = acceptedFiles[0];
        filep = await convertImageToWebp(filep);
        getBase64(filep)
          .then((result) => {
            setFiles({
              ...files,
              base64: result,
              name: filep.name,
              type: filep.type,
              size: filep.size,
            });
            setFileError("");
          })
          .catch((err: any) => { });
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxSize: 1000000,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });
  const baseStyle = {};
  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? {} : {}),
      ...(isDragAccept ? {} : {}),
      ...(isDragReject ? {} : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const convertImageToWebp = async (files: any, type: any = "blob") => {
    dispatch(setLoaderGlobal(true));
    try {
      const webpBlob: any = await blobToWebP(files, { quality: 0.35 });
      const file: any = new File([webpBlob], `${type}.webp`, {
        type: "image/png",
        lastModified: new Date().getTime(),
      });
      dispatch(setLoaderGlobal(false));
      return file;
    } catch (error: any) {
      dispatch(setLoaderGlobal(false));
    }
    return null;
  };

  const manageUploadPhoto = () => {
    dispatch(setLoaderGlobal(true));
    let params = {
      file: files.base64,
      type: "profile",
      tenantCode:
        items && items.tenantId ? items.tenantCode : userData.tenantCode,
      user_id: userData?.username,
      setImageUploaded,
      setFiles,
    };
    dispatch(uploadImg(params)).then(() => {
      dispatch(userAuthDetails({ user: userData })).then(() => {
        dispatch(setLoaderGlobal(false));
      });
    });
  };

  const handleProfileImageDelete = () => {
    dispatch(setLoaderGlobal(true));
    const params = {
      user_id: userData.username,
      setProfileURL,
      setFiles,
    };
    dispatch(deleteImage(params)).then(() => {
      dispatch(userAuthDetails({ user: userData })).then(() => {
        dispatch(hideModal());
        dispatch(setLoaderGlobal(false));
      });
    });
  };

  return (
    <>
      {/* <h1
        style={{
          borderBottom: "1px solid #c7c9c8",
          fontWeight: "bold",
          minHeight: 50,
          paddingInline: 25,
          display: "flex",
          alignItems: "center",
        }}
      >
        Profile
      </h1> */}

      <Grid
        container
        spacing={2}
        sx={{ p: 2, flexDirection: { xs: "column", sm: "row", md: "row" } }}
      >
        {/* Left side section */}
        <Grid item sm={12} md={5}>
          <Card
            style={{
              border: "none",
              borderRadius: 20,
              backgroundImage: `url("../assets/images/profileBack.png")`,
              backgroundSize: "cover",
              height: 180,
              display: "flex",
              alignItems: "center",
              gap: "20px",
              color: "#fff",
              marginBottom: 5,
              paddingInline: 10,
            }}
          >
            <Box
              {...getRootProps({ style })}
              className="profile-pic-change-box"
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: "2 !important",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  position: "absolute",
                  bgcolor: "#B2BEB5",
                  top: 0,
                  left: 0,
                  zIndex: 11,
                }}
                src={userData?.profile}
              />
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  {...getInputProps()}
                  type="file"
                  className="profile-pic-input input-zone"
                  id="pic-inp"
                  ref={fileInputRef}
                  accept="image/*"
                />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AddAPhotoOutlined
                    className="addPhotoIcon"
                    sx={{ position: "relative", zIndex: 1 }}
                  />
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      bgcolor: "#B2BEB5",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    src={profileURL}
                  />
                </div>
              </div>
              <Box
                sx={{
                  position: "relative",
                  zIndex: 20,
                  width: "100%",
                  height: "100%",
                }}
              >
                {files?.base64 && (
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      bgcolor: "#B2BEB5",
                      zIndex: "1 !important",
                    }}
                    src={files.base64}
                  />
                )}
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: "24px", fontWeight: 700, mb: 0 }}
              >
                {`${userData?.name || ""} ${userData?.middle_name || ""}`}
              </Typography>
              <Typography
                sx={{
                  marginTop: "2px",
                  marginBottom: "1rem",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
                variant="h6"
                color="#bbb0b0"
              >
                {userData?.profile_updated && (
                  <>
                    {`${t("misc.lastUpdatedOn")} ${moment(userData?.profile_updated).format("MM/DD/YYYY, hh:mm A")}`}
                  </>
                )}

              </Typography>
              <div>
                {files?.base64 && !imageUploaded ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <HtmlTooltip
                      title={t("profile.setProfilePicture")}
                      placement="bottom"
                    >
                      <LoadingButton
                        sx={{ mr: 1 }}
                        // loading={loader}
                        variant="contained"
                        color="success"
                        startIcon={<FileUploadOutlined />}
                        onClick={manageUploadPhoto}
                      >
                        {t("misc.upload")}
                      </LoadingButton>
                    </HtmlTooltip>
                    <HtmlTooltip title={t("misc.cancel")} placement="bottom">
                      <Button
                        variant="contained"
                        startIcon={<Cancel />}
                        onClick={() => {
                          setFiles({
                            base64: "",
                            path: "",
                            name: "",
                            size: "",
                            type: "",
                          });
                          setImageUploaded(true);
                        }}
                      >
                        {t("misc.cancel")}
                      </Button>
                    </HtmlTooltip>
                  </Box>
                ) : userData?.profile ? (
                  <>
                    <HtmlTooltip title={t("profile.editProfilePic")} placement="bottom">
                      <LoadingButton
                        sx={{ mr: 1 }}
                        variant="contained"
                        startIcon={<BorderColorOutlined />}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {t("misc.edit")}
                      </LoadingButton>
                    </HtmlTooltip>
                    <HtmlTooltip
                      title={t("profile.removeProfilePic")}
                      placement="bottom"
                    >
                      <LoadingButton
                        sx={{ mr: 1 }}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteOutlineOutlined />}
                        onClick={() => {
                          dispatch(
                            showModal(
                              <ProfileImageDeleteModal
                                onDelete={handleProfileImageDelete}
                              />
                            )
                          );
                        }}
                      >
                        {t("misc.delete")}
                      </LoadingButton>
                    </HtmlTooltip>
                  </>
                ) : (
                  <HtmlTooltip title={t("profile.uploadProfilePic")} placement="bottom">
                    <LoadingButton
                      sx={{ mr: 1 }}
                      variant="contained"
                      startIcon={<CameraAlt />}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {t("misc.add")}
                    </LoadingButton>
                  </HtmlTooltip>
                )}
              </div>
            </Box>
          </Card>

          <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </Grid>

        <Grid item sm={12} md={7}>
          <Card
            style={{ border: "none", borderRadius: 20, minHeight: "420px" }}
          >
            {currentTab === 1 && <ProfileOverviewTab />}
            {currentTab === 2 && <ProfileNotificationTab />}
            {currentTab === 3 && <ProfileSecurityTab />}
            {currentTab === 4 && <ProfilePasswordTab />}

          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
