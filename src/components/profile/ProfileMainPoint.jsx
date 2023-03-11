import React, { useEffect, useState } from "react";
import ProfilePointDetails from "./ProfilePointDetails";
// import ProfilePointGraph from "./ProfilePointGraph";
/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { getPointListByUserId } from "../../api/appointment";

const ProfileMainPoint = () => {
  const userId = window.localStorage.getItem("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    getPointListByUserId(userId).then((response) => {
      setData(response[0]);
    });
  }, []);
  return (
    <div>
      <ProfilePointDetails data={data} />
      {/* <ProfilePointGraph data={data} /> */}
    </div>
  );
};

export default ProfileMainPoint;
