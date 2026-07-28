import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationFail, notificationSuccess, } from "../slice/notificationSlice";
import { API, graphqlOperation } from "aws-amplify";
import { uploadEventMapImg, deleteImg, } from "../../graphql/mutations";


export const uploadImg = createAsyncThunk(
  "uploadImg",
  async (_request: any, { dispatch }) => {
    try {
      const resp = (await API.graphql({
        ...graphqlOperation(uploadEventMapImg, {
          uploadImage: {
            file: _request.file,
            type: _request?.type,
            tenantCode: _request?.tenantCode,
            user_id: _request?.user_id,
          },
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (resp.data.uploadImage.success === "true") {
        if (_request?.setImageUploaded) {
          _request?.setImageUploaded(true);
        }
        dispatch(notificationSuccess("Image Updated Successfully"));
      } else {
        if (_request?.setFiles) {
          _request?.setFiles({
            base64: "",
            path: "",
            name: "",
            size: "",
            type: "",
          });
        }
        dispatch(notificationFail("Something went to wrong"));
      }
      if (_request.callback) {
        _request.callback();
      }
    } catch (err: any) {
      if (_request?.setFiles) {
        _request?.setFiles({
          base64: "",
          path: "",
          name: "",
          size: "",
          type: "",
        });
      }
      dispatch(notificationFail("Something went to wrong"));
    }
  }
);

export const deleteImage = createAsyncThunk(
  "deleteImage",
  async (_request: any, { dispatch }) => {
    try {
      const resp = (await API.graphql({
        ...graphqlOperation(deleteImg, {
          deleteimage: { user_id: _request?.user_id },
        }),
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: any; errors: any[] };

      if (resp?.data?.deleteimage?.success === "true") {
        dispatch(notificationSuccess("Image deleted successfully"));
        if (_request?.setFiles) {
          _request?.setFiles({
            base64: "",
            path: "",
            name: "",
            size: "",
            type: "",
          });
        }
        if (_request?.setProfileURL) {
          _request?.setProfileURL(null);
        }
      } else {
        dispatch(notificationFail("Something went to wrong"));
      }
      if (_request?.callback) {
        _request.callback();
      }
    } catch (err: any) {
      dispatch(notificationFail("Something went to wrong"));
    }
  }
);

