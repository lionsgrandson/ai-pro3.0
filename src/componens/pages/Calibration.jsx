import React from "react";
import Page from "./Page";
import { calibration_img_url } from "../../assets";

export default function Calibration() {
  return <Page kind="calibration" img_url={calibration_img_url} />;
}
