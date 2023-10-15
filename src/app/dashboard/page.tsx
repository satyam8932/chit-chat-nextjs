"use client"

import Navbar from "../Components/Navbar";
import OrgTemp from "./OrgTemp";
import AiModel from "./AiModel";
import {  getOrganizationById, getAiModelById } from "../api/apiCall";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Prompt from "../Components/Prompt";


const page = () => {
  let UserId: string | null=null;
  if (typeof window !== 'undefined') {
    
    UserId = localStorage.getItem('UserId')
  }
  else{
    toast.error("Please Login !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const [Data, setData] = useState({
    response:{
      data:[]
    }
  })
  const [AI, setAI] = useState({
    response:{
      data:[]
    }
  })
  const value = async()=>{
    const data = await getOrganizationById(UserId)
    setData(data)
  }
  useEffect(() => {
    value()
  }, [])

  const valueAi = async()=>{
    const data = await getAiModelById(UserId)
    setAI(data)
  }
  useEffect(() => {
    valueAi()
  }, [])
  
  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <Navbar />
        {
          UserId?(
            <div className="grid md:grid-cols-7 grid-cols-1 sm:pt-20 pt-52 h-screen shadow-2xl">
          <div className="md:col-span-3 overflow-y-auto scrollbar-hide max-h-[calc(100vh-64px)]">
            <div className="flex justify-center p-2 font-serif text-gray-800 font-bold text-2xl">
              Organizations
            </div>
            <div className=" grid grid-cols-2">
              {Data && Data.response && Data.response.data && Data.response.data.map(
                (
                  value: {
                    OrganizationName: string;
                    OrganizationPhone: number;
                    OrganizationWebsite: string;
                    createdAt: string;
                  },
                  index: number
                ) => (
                  <OrgTemp
                    key={index}
                    OrganizationName={value.OrganizationName}
                    OrganizationPhone={value.OrganizationPhone}
                    OrganizationWebsite={value.OrganizationWebsite}
                    createdAt={value.createdAt}
                  />
                )
              )}
            </div>
          </div>
          <div className="md:col-span-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-64px)]">
            <div className="flex justify-center p-2 font-serif text-gray-800 font-bold text-2xl">
              Ai Trained Models
            </div>

            <div className="flex p-3">
              <div className="text-start py-2 font-bold font-sans">Name</div>
              <div className="flex-grow text-center py-2 font-bold font-sans">
                API Key
              </div>
            </div>

            <div className="p-4 overflow-y-auto">
              {AI && AI.response && AI.response.data && AI.response.data.map(
                (
                  value: {
                    organizationName: string;
                    uploadKnowledge: string;
                    embeddedKnowlege: string;
                    apiKey: string;
                    createdAt: string;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <AiModel
                    key={index}
                    organizationName={value.organizationName}
                    uploadKnowledge={value.uploadKnowledge}
                    embeddedKnowlege={value.embeddedKnowlege}
                    apiKey={value.apiKey}
                    createdAt={value.createdAt}
                  />
                )
              )}
            </div>
          </div>
        </div>
          ):(
            <Prompt/>
          )
        }
      </div>
    </>
  );
};

export default page;