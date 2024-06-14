import "./App.css";
import { useCallback, useEffect, useState } from "react";

interface User {
  results: {
    name: {
      first: string;
      last: string;
    };
    picture: {
      large: string;
    };
  }[];
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>();

  const showData = useCallback(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setBackgroundColor(generateRandomColor());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    showData();
  }, [showData]);

  return user ? (
    <div className="container" style={{ backgroundColor: backgroundColor }}>
      <div className="card">
        <h2 className="userName">
          {user.results[0].name.first} {user.results[0].name.last}
        </h2>
        <img
          className="img"
          src={user.results[0].picture.large}
          alt="avatar image"
        />
      </div>
      <button className="button" onClick={showData}>
        <span>CLICK</span>
        <span>HERE</span>
      </button>
    </div>
  ) : (
    <h1>Data pending...</h1>
  );
}

export default App;
