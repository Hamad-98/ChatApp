import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <WhatsAppIcon
          style={{ width: "100px", height: "100px", marginBottom: 10 }}
        />
        <h3>Loading....</h3>
      </div>
    </center>
  );
};

export default Loading;
