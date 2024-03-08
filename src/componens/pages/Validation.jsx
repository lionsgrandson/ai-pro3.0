import React from 'react'
import Page from './Page'
import { validation_img_url } from '../../assets'

export default function Validation() {

  return (
    <div><Page kind={"validation"} img_url={validation_img_url}/></div>
  )
}
