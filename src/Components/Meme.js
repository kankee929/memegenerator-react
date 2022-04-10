import React from "react";

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState([])

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((resp) => resp.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const memeUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: memeUrl,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className="Meme">
      <div className="form" action="">
        <input
          className="Meme--i1"
          name="topText"
          placeholder="Top Text"
          type="text"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          className="Meme--i2"
          name="bottomText"
          placeholder="Bottom Text"
          type="text"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="form--Btn" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img className="meme--img" src={meme.randomImage} alt="image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
