import React from "react";

function Images({ item }) {
  console.log(item);
  return (
    <div>
      <img src={item.urls.thumb} alt="" />
    </div>
  );
}

export default Images;
