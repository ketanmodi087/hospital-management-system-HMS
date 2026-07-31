import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Top.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import supervisorWhite from "../assets/supervisor-white.png";
import supervisorBlack from "../assets/supervisor-black.png";
import workgroupWhite from "../assets/workgroup-white.png";
import workgroupBlack from "../assets/workgroup-black.png";
import agentWhite from "../assets/agent-white.png";
import agentBlack from "../assets/agent-black.png";
import { useAppDispatch, useAppSelector } from "store/store";
import { setuserHierarchy } from "store/slice/commonSlice";

interface Label {
  title: string;
  total_no: number;
  value: string;
  img: string;
  imgActive: string;
}

interface SubUnit {
  groupId: string;
  name: string;
}

// Define the structure of orgUnit
interface OrgUnit {
  name: string;
  parent: string;
  pk: string;
  sk: string;
  created_at: string;
  updated_at: string;
  index: string;
}

// Define the structure of the state slice
interface OrgStructureState {
  orgStructure: OrgUnit[];
  subUnits: SubUnit[];
}

const labelsBaseData: Label[] = [
  { title: "Info", value: "Info", total_no: 0, img: agentBlack, imgActive: agentWhite },
  { title: "Agent", value: "Agent", total_no: 0, img: agentBlack, imgActive: agentWhite },
  { title: "Supervisor", value: "Supervisor", total_no: 0, img: supervisorBlack, imgActive: supervisorWhite },
  { title: "Workgroup", value: "workgroup", total_no: 0, img: workgroupBlack, imgActive: workgroupWhite },
];

const Top: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  // const [userLocation, setUserLocation]=useState<any[]>([])
  const [labelsBase, setLabelsBase]=useState<any[]>(labelsBaseData)
  const [userLabels, setUserLabels]=useState<any>([]);
  const { userData } = useAppSelector((state) => state.authReducer);
  const orgStructure:any  = []


  useEffect(() => {
    if (orgStructure.length !== 0) {
      const updatedLabelsBase = labelsBase.map((label) => {
        if (label.title === "Workgroup") {
          const newTitle = orgStructure[0]?.name;
          const sk = orgStructure[0]?.sk;
          return { ...label, title: newTitle, groupId: sk }; // Update the title dynamically
        } else if (label.title === "Supervisor") {
          const newTitle = orgStructure[1]?.name;
          const sk = orgStructure[1]?.sk;
          return { ...label, title: newTitle, groupId: sk }; // Update the title dynamically
        }
        return label;
      });
      setLabelsBase(updatedLabelsBase);
    }
  }, [orgStructure]);

  useEffect(() => {
    if (userData?.userLocation) {
      // setUserLocation(userData?.userLocation)
      const labels: Label[] = getLabels(userData?.userLocation);
      dispatch(setuserHierarchy(labels));
      setUserLabels(labels)
    }

  }, [userData?.userLocation , labelsBase])

  const findMinArrayLength = (arr: string[]): number => {
    return arr
        .map((str: string): number => str.split('|').length) // Split each string by '|' and get the lengths
        .reduce((min: number, len: number): number => Math.min(min, len), Infinity); // Find the minimum length
  };

  const getLabels = (arr: string[]): Label[] => {
    // Step 1: Find minimum array length

    if (userData?.group == "admin" || userData?.group === "tenantAdmin") return labelsBase.filter(label => label.title !== "Info");
    const minArrayLength = findMinArrayLength(arr);

    // Step 2: Handle different conditions based on minArrayLength
    if (minArrayLength === 1) {
      console.log("Array length is 1, including all labels.");
      // Include all labels
      return labelsBase;
    } else if (minArrayLength === orgStructure.length + 1) {
      // Step 3: Split the input array by '|' and find the minimum length index
      const splitArrays = arr.map(str => str.split('|'));
      console.log("Split Arrays:", splitArrays);

      const minLengthIndices = splitArrays
        .map((subArray, index) => (subArray.length === minArrayLength ? index : -1))
        .filter(index => index !== -1);

      console.log("Minimum Length Indices:", minLengthIndices);

      // Variables to track whether Agent or Supervisor exists in any of the min length arrays
      let includesAgent = false;
      let includesSupervisor = false;

      // Step 4: Check each index that has the min length
      minLengthIndices.forEach(index => {
        includesAgent = includesAgent || splitArrays[index]?.includes("Agent");
        includesSupervisor = includesSupervisor || splitArrays[index]?.includes("Supervisor");
      });

      console.log("Includes Agent:", includesAgent);
      console.log("Includes Supervisor:", includesSupervisor);

      if (includesAgent && includesSupervisor) {
        console.log("Both Agent and Supervisor found.");
        // Both Agent and Supervisor
        return [
          labelsBase[0], // Info
          labelsBase[1], // Agent
          labelsBase[2], // Supervisor
          labelsBase[3],
        ];
      } else if (includesSupervisor) {
        console.log("Only Supervisor found.");
        // Only Supervisor
        return [
          labelsBase[0], // Info
          labelsBase[1], // Agent
          labelsBase[2], // Supervisor
          labelsBase[3]
        ];
      } else if (includesAgent) {
        console.log("Only Agent found.");
        // Only Agent
        return [
          labelsBase[0], // Info
          labelsBase[2], // Agent
        ];
      }
    }

    // Step 5: Default case when none of the conditions are met
    console.log("No valid case found, returning empty array.");
    return [];
  };

  return (
    <div className={styles.container}>
      <div className={styles.lower}>
        <div className={styles.left}>
          {location?.pathname?.includes("agent-scorecard") &&
            userLabels?.map((item:any, index:any) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.filter_btn} ${styles.active}`
                    : styles.filter_btn
                }
                to={`/agent-scorecard/${item.value.toLowerCase()}`}>
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.imgActive : item.img}
                      alt="icon"
                      className={styles.duotone}
                    />
                    <span className={styles.text}>{item.title}</span>
                    {item.total_no > 0 ? (
                      
                      <span className={styles.tag}>{item.total_no}</span>
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Top;
