import React, { useEffect } from 'react'
import LoaderFirst from '../../components/Loaders/LoaderFirst'
import FirstBtn from '../../components/Buttons/FirstBtn'
import ThirdBtn from '../../components/Buttons/ThirdBtn'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../../redux/Actions/ServicesAction'
import SecondBtn from '../../components/Buttons/SecondBtn'

const Test = () => {

  
  return (
    <div>
      <LoaderFirst/>
      <FirstBtn/>
      <ThirdBtn/>
      <SecondBtn/>

    </div>
  )
}

export default Test
