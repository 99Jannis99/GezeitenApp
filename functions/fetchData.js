import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, Component } from "react";
import base64 from "react-native-base64";

export default function fetchData(pfad, postBodyData) {
  let authorization = base64.encode("App:5t346vw46t54re&%$R6esv45e4gszdtgc");
  const recipeUrl = "https://apiv2.nordsee-gezeiten.de/" + pfad + "/";
  const postBody = postBodyData;
  const requestMetadata = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  };
  return fetch(recipeUrl, requestMetadata)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
