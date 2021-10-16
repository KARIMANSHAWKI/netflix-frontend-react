import "./home.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { Featured } from "../../components/featured/Featured";
import { List } from "../../components/list/List";
import Register from "../register/Register";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjYyYTMwYjc0MjQxMjE5NTQxMGY5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDQwNzU1NiwiZXhwIjoxNjM0ODM5NTU2fQ.O3whemjRcM3r-JxT8zN0LG3Zu0tmM5Qp9Dqi4yvNMoc`,
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
      <Register />
    </div>
  );
}
