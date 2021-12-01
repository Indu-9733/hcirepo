// Meal.js
import React, { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import Axios from "axios";

export default function Meal({ meal }) {
  Axios.defaults.withCredentials = true;
  const [imageUrl, setImageUrl] = useState("");
  const [prepTime, setprepTime] = useState("");
  const [serve, setserve] = useState("");
  const [sourceUrl, setsourceUrl] = useState("");
  let isFav = false;
  const [userId, setUserId] = useState(0);
  const [recpId, setRecpId] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=696b0c4fb4de43bd9c94815931d4d998&`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
        setprepTime(data.readyInMinutes);
        setserve(data.servings);
        setsourceUrl(data.sourceUrl);
        setRecpId(meal.id);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true)
        setUserId(response.data.user[0].user_id);
    });
  }, []);

  const onSubmit = () => {
    isFav = !isFav;
    console.log(isFav);
    Axios.post("http://localhost:3001/saveFav", {
      isFav: isFav,
      recpId: recpId,
      userId: userId,
    }).then(() => {});
  };

  return (
    <article>
      <h1>{meal.title}</h1>
      <img
        Style="font-size:40px;margin-left:45%;margin-top:70px;font-family:monospace;font-weight:lighter;"
        src={imageUrl}
        alt="recipe"
      />
      <ul
        className="instructions"
        Style="font-size:40px;margin-left:45%;margin-top:70px;font-family:monospace;font-weight:lighter;"
      >
        <li>Preparation time: {prepTime} minutes</li>
        <li>Number of servings: {serve}</li>
      </ul>
      <Heart
        styles="font-size:40px;margin-left:50%;margin-top:70px;font-family:monospace;font-weight:lighter;"
        isClick={isFav}
        onClick={() => {
          onSubmit();
        }}
      />

      <a
        Style="font-size:40px;margin-left:45%;margin-top:70px;font-family:monospace;font-weight:lighter;"
        href={sourceUrl}
      >
        Go to Recipe
      </a>
    </article>
  );
}
