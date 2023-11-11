import React from "react";
import adv from "/Images/Lands/adv_tr.png";
import dis from "/Images/Lands/dis_tr.png";
import dvh from "/Images/Lands/dvh_tr.png";
import fan from "/Images/Lands/fan_tr.png";
import fro from "/Images/Lands/fro_tr.png";
import msu from "/Images/Lands/msu_tr.png";
import wds from "/Images/Lands/wds_tr.png";
import castle from "/Images/chateau.png";

export default function LandCard() {
  const landImgs = [castle, adv, dis, fan, fro, msu, wds, dvh];

  return landImgs.map((element, index) => (
    <img
      key={index}
      className="object-center"
      src={element}
      alt={`Land image ${index}`}
    />
  ));
}
