import React from "react";
import { motion as m } from "framer-motion";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <m.div
      initial={{ scale: 0 }}
      animate={{ rotate: 180, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.4,
      }}
      exit={{ scale: 0, rotate: 180}}
      className="w-full flex justify-center items-center"
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#B2A3B5", "#51E5FF", "#429EA6","#0099ff","#0000ff"]}
      />
    </m.div>
  );
};

export default Loader;
