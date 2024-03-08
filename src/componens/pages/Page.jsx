import React from 'react'
import { useTranslation } from 'react-i18next';


export default function Page({kind ,img_url}) {
    const {t,i18n}=useTranslation()

    const text_style = {
      fontStyle: "italic",
      fontSize: "large",
      textShadow: "1px 1px 1px rgb(180, 180, 180)",
      fontFamily: "system-ui sans-serif",
    };
    document.body.dir = i18n.dir();

  

  return (
    <div className='col12 d-flex flex-column flex-md-row' style={{height:"100vm0in"}}>
        <div className='col-12 col-md-4' style={{height:"100vmin"}}>
            <img src={img_url}
            width="100%"
            height="100%"/>
        </div>

        <div className='col-12 col-md-8 d-flex flex-column align-items-center justify-content-center' >
            <div className='mt-5 mb-5 mt-md-0 mb-md-0' style={{width:"70vmin",height:"100vimn"}}>

            <h1 style={{borderBottom:"1px solid"}}>{t(kind)}</h1>
            <p style={text_style}>{t(`${kind} page text`)}</p>
            </div>
            
        </div>



    </div>
  )
}
