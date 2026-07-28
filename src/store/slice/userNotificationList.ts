import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
    notificationListList: any;
    activeTab: string;
    loading: boolean;
}

const initialState: InitialState = {
    notificationListList: [{
        id: 1,
        patientName: "John Doe",
        doctorName: "Dr. Emily Carter",
        specialty: "Cardiologist",
        status: "assigned",
        date: "2025-04-20",
        time: "10:30 AM",
        location: "City Health Hospital – Room 402",
        message: "Your appointment has been assigned. Please arrive 15 minutes early."
      },
      {
        id: 2,
        patientName: "Sarah Miller",
        doctorName: "Dr. Alan Singh",
        specialty: "Dermatologist",
        status: "rejected",
        date: "2025-04-18",
        time: "2:00 PM",
        location: "Downtown Clinic – Room 305",
        message: "Your requested appointment was rejected due to scheduling conflicts."
      },
      {
        id: 3,
        patientName: "Michael Brown",
        doctorName: "Dr. Olivia Nguyen",
        specialty: "Orthopedic Specialist",
        status: "completed",
        date: "2025-04-15",
        time: "9:00 AM",
        location: "Health Plus Center – Room 210",
        message: "Appointment completed. Follow-up notes are available in your portal."
      },
      {
        id: 4,
        patientName: "Jessica Lee",
        doctorName: "Dr. Richard Kim",
        specialty: "Neurologist",
        status: "reopened",
        date: "2025-04-25",
        time: "11:00 AM",
        location: "City Health Hospital – Room 501",
        message: "Your appointment has been reopened. We apologize for the inconvenience."
      },
      {
        id: 5,
        patientName: "David Clark",
        doctorName: "Dr. Hannah Wright",
        specialty: "Psychiatrist",
        status: "pending",
        date: "2025-04-22",
        time: "3:00 PM",
        location: "MindWell Clinic – Room 107",
        message: "Your appointment request is pending approval. You will be notified shortly."
      }],
    activeTab: "All",
    loading: false,
};

const notificationListSlice = createSlice({
    name: "notificationList",
    initialState,
    reducers: {
        setNotificationListList: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            notificationListList: action.payload,
        }),
        setActiveTab: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            activeTab: action.payload,
        }),
        setNotificationLoading: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
            ...state,
            loading: action.payload,
        }),
    }
})

export const { setNotificationListList,setActiveTab,setNotificationLoading } =
  notificationListSlice.actions;

export default notificationListSlice.reducer
