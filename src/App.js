import { async } from "q";
import React, { useEffect, useState } from "react";
import "./App.css";
import Recipes from "./Recipes";

function App() 
{
  const APP_ID = "39081f74";
  const APP_KEY = "2773dd8ab739337452913c4d85c701e6";

  const [recipes, setRecepies] = useState([]);
  const [search , setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(() => {
    console.log("Effect has been run");
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecepies(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSeach = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
  <div className="App">
        <form onSubmit={getSeach} className="search-form">
          <input placeholder='Search Your Recipe Here' className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit" >
            Search
          </button>
        </form>
        <div className='recipes'>
          {
            recipes.map((recipe) => (
              <Recipes
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))
          }
        </div>
  </div>
);
}

export default App;
