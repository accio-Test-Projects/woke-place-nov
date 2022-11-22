import React, { useEffect, useState } from "react";
import {
  where,
  collection,
  query,
  getDocs,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CommonTable from "../../common/CommonTable";
import { doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const columnName = [
  {
    title: "Candidate",
    key: "candidate_name",
  },
  {
    title: "email",
    key: "candidate_email",
  },
  {
    title: "status",
    key: "status",
  },
  {
    title: "Job Title",
    key: "title",
  },
  {
    title: "actions",
    key: "buttons",
  },
  // {
  //   title: "applied on",
  //   key: "createdAt",
  // },
];

function Applicants() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);
  const fetchData = async () => {
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", userInfo.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log(querySnapshot, "querySnapshot");
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAllApplications(data);
      console.log("Current applications: ", data);
    });
  };
  const handleClick = async (action, row) => {
    const last_mesage_id = uuidv4();
    const oneToOneMessageId = uuidv4();
    if (action === "accept") {
      // we need to update the status of the application to approved
      try {
        await setDoc(
          doc(db, "applications", row.applicationId),
          {
            status: "approved",
          },
          {
            merge: true,
          }
        );
      // the conversation should be created

      } catch (err) {
        console.log(err);
      }

      try {
        console.log("row", row);

        await setDoc(doc(db, "last_messages", last_mesage_id), {
          last_message: `hey there we have accepted your application for ${row.title} `, //important
          createdAt: new Date().getTime(),
          employerId: row.employerId, //important
          candidateId: row.candidateId, //important
          jobId: row.jobId,
          applicationId: row.applicationId,
          last_message_id: last_mesage_id,
          candidate_name: row.candidate_name, //important
          employer_name: row.company_name, //important
          conversationId: `${userInfo.uid}-${row.candidateId}`, //important
        });

        await setDoc(doc(db, "one-to-one-messages", oneToOneMessageId), {
          createdAt: new Date().getTime(),
          conversationId: `${userInfo.uid}-${row.candidateId}`,
          userId: userInfo.uid,
          userType: "employer",
          message: `hey there we have accepted your application for ${row.title} `
        });
      } catch (err) {
        console.log(err);
      }
    } else if (action === "reject") {
      // application should be deleted
      await deleteDoc(doc(db, "applications", row.applicationId));
      console.log("reject", row);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {allApplications && allApplications.length > 0 ? (
        <div>
          <CommonTable
            columnsName={columnName}
            handleClick={handleClick}
            data={allApplications}
          />
        </div>
      ) : allApplications && allApplications.length === 0 ? (
        <div>no data</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Applicants;
