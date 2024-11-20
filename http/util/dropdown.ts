import axios from "axios";
import axiosInstance from "../axiosInstance";
import axiosInstanceAuth from "../axiosInstanceAuth";


export const getDropDown = async (_id: string) => {
  const res = await axiosInstance.get(`/dropdown/${_id}`);
  return res.data;
}

export const getCounty = async (stateName: string) => {
  const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-united-states-of-america-county/records?select=coty_name&where=ste_name="${stateName}"&limit=100`);
  return res.data;
}

export const getAgencyNames = async (county: string, agency: string) => {
  const res = await axiosInstanceAuth.post(`/clinician/agency/on-roll`, {
    county: county,
    agencyType: agency
  });
  return res.data;
}