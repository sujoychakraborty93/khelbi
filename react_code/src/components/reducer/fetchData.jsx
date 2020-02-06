import React, { Component } from "react";
import axios from "axios";

export function getAllRequests() {
  console.log("fetching data for all requets");
  return axios.get(process.env.REACT_APP_REQUEST_LIST).then(res => {
    return res.data;
  });
}

export const AllRequests = axios
  .get(process.env.REACT_APP_REQUEST_LIST)
  .then(res => {
    return res.data;
  });

export function getAllRequestComments() {
  console.log("fetching data for all comments");
  return axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
    return res.data;
  });
}

export function getAllMatches() {
  console.log("fetching data for all matches");
  return axios.get(process.env.REACT_APP_ALL_MATCHES).then(res => {
    return res.data;
  });
}
export const AllMatches = axios
  .get(process.env.REACT_APP_ALL_MATCHES)
  .then(res => {
    return res.data;
  });

export function getAllTeams() {
  console.log("fetching data for all teams");
  return axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
    return res.data;
  });
}
export function getAllVenues() {
  console.log("fetching data for all venues");
  return axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
    return res.data;
  });
}
export function getAllUmpires() {
  console.log("fetching data for all umpires");
  return axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
    return res.data;
  });
}
export function getAllPlayers() {
  console.log("fetching data for all players");
  return axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
    return res.data;
  });
}
export function getAllCountryStates() {
  console.log("fetching data for all states");
  return axios.get(process.env.REACT_APP_COUNTRY_STATE_LIST).then(res => {
    return res.data;
  });
}
export function getAllCountries() {
  console.log("fetching data for all countries");
  return axios.get(process.env.REACT_APP_COUNTRY_LIST).then(res => {
    return res.data;
  });
}
export function getAllUserRoles() {
  console.log("fetching data for all user roles");
  return axios.get(process.env.REACT_APP_USER_ROLE_LIST).then(res => {
    return res.data;
  });
}
export function getAllSecretQuestions() {
  console.log("fetching data for all secret questions");
  return axios.get(process.env.REACT_APP_SECRET_QUESTION_LIST).then(res => {
    return res.data;
  });
}
export function getAllImagesS3() {
  console.log("fetching data for all images from S3");
  return axios.get(process.env.REACT_APP_GET_IMAGE_S3).then(res => {
    return res.data;
  });
}
