import React, { useEffect, useState } from "react";
import { where, collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";

const columnName = [
  {
    title: "Company",
    key: "company_name",
  },
  {
    title: "Job Title",
    key: "title",
  },
  {
    title: "Job location",
    key: "location",
  },
  {
    title: "status",
    key: "status",
  },
  // {
  //   title: "applied on",
  //   key: "createdAt",
  // },
];

function Applications() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);

  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userInfo.uid)
    );
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      data.push(doc.data());
    });
    console.log(data, "data");
    setAllApplications(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable data={allApplications} columnsName={columnName} />
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Applications;
