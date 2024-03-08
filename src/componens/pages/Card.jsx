import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';

import '../style.css'

export default function Card({img_url,kind}) {
    const {t}=useTranslation()

    const text_style={
        fontStyle: "italic",
        fontSize:"large",
        textShadow: "1px 1px 1px rgb(180, 180, 180)",
        fontFamily: "system-ui sans-serif",
      }

  return (
    <div  style={{width:"350px",height:"400px",margin:'10vmin',marginBottom:"20vmax"}}>
        <MDBCard>
      <MDBCardImage src= {img_url} position='top'  alt={kind} />
      <MDBCardBody>
        <MDBCardTitle style={{textTransform:"uppercase",textDecoration:"underline",fontWeight:"600"}}>{t(kind)}</MDBCardTitle>
        <MDBCardText style={text_style}>
          {t(`${kind} home text`)}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </div>
  );
}

