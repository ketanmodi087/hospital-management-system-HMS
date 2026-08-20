export interface CardItem {
  subTitle: string;
  title: string;
  increase: boolean;
  footerTxt: string;
}

export interface IMENU_ID {
  [key: string]: {
    route: string;
    menuId: number;
    label: string;
    onlyAdmin?: boolean;
    showInRole?: boolean;
  };
}

export interface Notification {
  assigned_agent?: string;
  assigned_agent_name?: string;
  callId: string;
  createdAt: string;
  message: string;
  pk: string;
  seen: boolean;
  sk: string;
  notification_type: string;
  updated_by?: string;
  scoring_status?: string;
  agent_id: string;
  tenant_code: string;
}
