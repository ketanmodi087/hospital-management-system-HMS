export const getAllRollListQuery = /* GraphQL */ `
  query getAllRoles($is_deleted: Boolean, $tenantCode: String) {
    getAllRoles(is_deleted: $is_deleted, tenantCode: $tenantCode) {
      pk
      permission_pages
      role_name
      role_code
      sk
      updated_at
      is_deleted
      created_at
    }
  }
`;

export const getRolePermissionQuery = /* GraphQL */ `
  query MyQuery {
    getRolePermission {
      label
      menuId
      menukey
      userRoles
      child {
        label
        menukey
        userRoles
      }
    }
  }
`;

export const getTenantsQuery = /* GraphQL */ `
  query getTenants(
    $search: String
    $key: String
    $limit: String!
    $pageNo: String!
    $is_deleted: Boolean!
  ) {
    getTenants(
      search: $search
      key: $key
      limit: $limit
      pageNo: $pageNo
      is_deleted: $is_deleted
    ) {
      tenants {
        description
        email
        isActive
        lastLogin
        tenant_name
        phone
        industry
        tenantId
        tenantCode
        userName
        middle_name
        is_deleted
        created_at
        updated_at
        email_message
        notification
        message
        public_sso
        enterprise_sso
        force_mfa
        enable_mfa
        userStatus
      }
      count
    }
  }
`;

export const getTenantsDropDownQuery = /* GraphQL */ `
  query getTenants($all: String) {
    getTenants(all: $all) {
      tenants {
        tenantCode
        tenant_name
        tenantId
      }
    }
  }
`;

export const getTenantUsersQuery = /* GraphQL */ `
  query getTenantUsers(
    $tenantId: String!
    $userName: String!
    $is_deleted: Boolean
  ) {
    getTenantUsers(
      tenantId: $tenantId
      userName: $userName
      is_deleted: $is_deleted
    ) {
      email
      group
      enabled
      userStatus
      name
      middle_name
      tenantId
      userName
      phone
      lastLogin
      created_at
      modified_at
      userFacility
      email_message
      notification
      message
      enable_mfa
      force_mfa
      sub_units
      pk
      sk
    }
  }
`;
export const getAdminQuery = /* GraphQL */ `
  query getAdmin(
    $is_deleted: Boolean
    $is_scoring: Boolean
    $roleName: String
  ) {
    getAdmin(
      is_deleted: $is_deleted
      is_scoring: $is_scoring
      roleName: $roleName
    ) {
      email
      group
      enabled
      name
      middle_name
      userName
      phone
      lastLogin
      created_at
      modified_at
      tenants
    }
  }
`;

export const getTenantReportQuery = `
query getTenantReport($tenants:[getTenantUserReportRequest!]) {
    getTenantReport(tenants: $tenants) {
      tenantId
      info {
        users
        ssoUsers
        loginUser
        callsCount
        transcriptedCallsCount
        s3Size
      }
    }
  }
`;

export const getTenantReportNodeQuery = `
query getTenantReportDataList($startDate: String!, $endDate: String!, $tenant_ids: [String!]!) {
  getTenantReportDataList(tenantData: {startDate: $startDate, endDate: $endDate, tenant_ids: $tenant_ids}) {
    tenant_id
    users {
      email
      middlename
      name
      username
      statistics {
        export_count
        login_count
        mobile_summary
        mobile_login_history {
          os
          time
          version
        }
        mobile_summary_history {
          time
          total_spend_time
        }
        notification_count
        reset_count
        version_history {
          os
          time
          version
        }
        web_login_history {
          os
          time
          version
        }
        web_summary
        web_summary_history {
          time
          total_spend_time
        }
      }
    }
  }
}
`;
