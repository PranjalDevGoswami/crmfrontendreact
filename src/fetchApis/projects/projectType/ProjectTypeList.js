import React, { useEffect } from 'react'
import { PROJECTTYPES } from '../../../../../utils/Apis'

export const ProjectTypeList =  async () =>{
            const response = await fetch(PROJECTTYPES);
            const responseJson = await response.json()
            return responseJson;
        }
