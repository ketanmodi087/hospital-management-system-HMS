
export const changeRolePermissionMutation = /* GraphQL */ `
  mutation changeRolePermission($rolePermission: permissionRequest!) {
    changeRolePermission(rolePermission: $rolePermission) {
      success
    }
  }
`;

export const createTenantMutation = /* GraphQL */ `
  mutation createTenant($tenant: TenantRequest!) {
    createTenant(tenant: $tenant) {
      success
      message
    }
  }
`;

export const changeTenantStatusMutation = /* GraphQL */ `
  mutation changeTenantStatus($changeStatus: changeStatusRequest!) {
    changeTenantStatus(changeStatus: $changeStatus) {
      success
    }
  }
`;

export const deleteTenantMutation = /* GraphQL */ `
  mutation deleteTenant($deleteTenant: deleteTenantRequest!) {
    deleteTenant(deleteTenant: $deleteTenant) {
      success
    }
  }
`;

export const createNewTenantUserMutation = /* GraphQL */ `
  mutation createNewTenantUser($user: TenantUserRequest!) {
    createNewTenantUser(user: $user) {
      success
      message
    }
  }
`;

export const createUserCallProfileMutation = /* GraphQL */ `
  mutation createUserCallProfile($userCallProfile: userCallProfileRequest!) {
    createUserCallProfile(userCallProfile: $userCallProfile) {
      success
      message
    }
  }
`;

export const updateUserCallProfileMutation = /* GraphQL */ `
  mutation updateUserCallProfile($updateUserCallProfile: updateUserCallProfileRequest!) {
    updateUserCallProfile(updateUserCallProfile: $updateUserCallProfile) {
      success
      message
    }
  }
`;

export const deleteUserProfileMutation = /* GraphQL */ `
  mutation deleteUserProfile($deleteUserProfileData: [deleteUserProfileRequest]!) {
    deleteUserProfile(deleteUserProfileData: $deleteUserProfileData) {
      success
    }
  }
`;

export const recoverUserProfileMutation = /* GraphQL */ `
  mutation recoverUserProfile($recoverUserProfileData: [deleteUserProfileRequest]!) {
    recoverUserProfile(recoverUserProfileData: $recoverUserProfileData) {
      success
    }
  }
`;

export const createNewCreateNewAdminMutation = /* GraphQL */ `
  mutation createNewAdmin($admin: AdminRequest!) {
    createNewAdmin(admin: $admin) {
      success
    }
  }
`;

export const deleteTenantUserMutation = /* GraphQL */ `
  mutation deleteTenantUser($userId: [String]!) {
    deleteTenantUser(userId: $userId) {
      success
    }
  }
`;

export const enableDisableUserMutation = /* GraphQL */ `
  mutation enableDisableUser($statusRequest: changeUserStatusRequest!) {
    enableDisableUser(statusRequest: $statusRequest) {
      success
    }
  }
`;


export const getUserDetailsMutation = /* GraphQL */ `
  mutation getUserDetails($userDetail: userDetailRequest!) {
    getUserDetails(userDetail: $userDetail) {
      tenantId
      name
      middle_name
      public_sso
      tenantCode
      isActive
      default_location
      default_type
      group
      created_at
      permission
      userFacility
      profile
      email_message
      message
      notification
      enable_mfa
      phone
      force_mfa
      dashboard_view
      tenant_info
      timezone
      last_login
      last_updated
      profile_updated
    }
  }
`;

export const updateUserConfigMutation = /* GraphQL */ `
  mutation updateUserConfig($userConfig: userConfigRequest!) {
    updateUserConfig(userConfig: $userConfig) {
      success
      message
    }
  }
`;


export const saveTenantAnalysisData = `
  mutation saveTenantAnalysisData($reportData: SetTenantReportData!) {
    saveTenantAnalysisData(reportData: $reportData) {
      message
      success
    }
  }
`;

export const addLogsAws = /* GraphQL */ `
  mutation addLogs($addLogs: addlogsRequest!) {
    addLogs(addLogs: $addLogs) {
      success
    }
  }
`;

export const recoverTenantMutation = /* GraphQL */ `
  mutation recoverTenant($recoverId: deleteTenantRequest!) {
    recoverTenant(recoverId: $recoverId) {
      success
    }
  }
`;

export const recoverTenantUserMutation = /* GraphQL */ `
  mutation recoverTenantUser($userId: [String]!) {
    recoverTenantUser(userId: $userId) {
      success
    }
  }
`;
export const resetUserPasswordMutation = /* GraphQL */ `
  mutation changeTenantPasswordAdmin(
    $adminChangePassword: adminChangePasswordRequest!
  ) {
    changeTenantPasswordAdmin(adminChangePassword: $adminChangePassword) {
      success
      message
    }
  }
`;

export const udpateRoleMutation = /* GraphQL */ `
  mutation updateRole($roleUpdate: updateRoleRequest!) {
    updateRole(roleUpdate: $roleUpdate) {
      success
    }
  }
`;

export const deleteRoleMutation = /* GraphQL */ `
  mutation deleteRole($roleDelete: deleteRoleRequest!) {
    deleteRole(roleDelete: $roleDelete) {
      success
    }
  }
`;

export const addNewRoleMutation = /* GraphQL */ `
  mutation addNewRole($role: addNewRoleRequest!) {
    addNewRole(role: $role) {
      success
    }
  }
`;

export const recoverRoleMutation = /* GraphQL */ `
  mutation recoverRole($roleRecover: deleteRoleRequest!) {
    recoverRole(roleRecover: $roleRecover) {
      success
    }
  }
`;

export const resetPasswordMutation = /* GraphQL */ `
  mutation resetUserPassword($reset: resetPasswordRequest!) {
    resetUserPassword(reset: $reset) {
      success
    }
  }
`;

export const getUserDataMutation = /* GraphQL */ `
  mutation getUserData($accessToken: getUserDataRequest!) {
    getUserData(accessToken: $accessToken) {
      success
    }
  }
`;



export const uploadEventMapImg = `
mutation uploadImage($uploadImage: imageUploadRequest!) {
  uploadImage(uploadImage: $uploadImage) {    
    success
    imageUrl
  }
}
`;

export const deleteImg = `
mutation deleteimage($deleteimage: deleteImageRequest!) {
  deleteimage(deleteimage: $deleteimage) {
    imageUrl
    success
  }
}
`;

export const enableMFAMutation = /* GraphQL */ `
  mutation userEnableMFA($userEnableMFA: mfaEnableRequest!) {
    userEnableMFA(userEnableMFA: $userEnableMFA) {
      success
      message
    }
  }
`;
export const updateUserProfileMutation =
  /* GraphQL */
  `
    mutation updateUserProfile($userProfile: updateProfileRequest!) {
      updateUserProfile(userProfile: $userProfile) {
        success
        message
      }
    }
  `;
export const sendOTPCodeMutation =
  /* GraphQL */
  `
    mutation sendOTPCode($sendCode: sendCodeRequest!) {
      sendOTPCode(sendCode: $sendCode) {
        success
        message
      }
    }
  `;

export const verifyOTPCodeMutation =
  /* GraphQL */
  `
    mutation verifyOTPCode($verifyOtp: verifyOTPCodeRequest!) {
      verifyOTPCode(verifyOtp: $verifyOtp) {
        success
        message
      }
    }
  `;




