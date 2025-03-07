"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const RecipeDetailsPageComponent = () => {
  const params = useParams();
  const id = params.id;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`);
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
          console.log("Failed to fetch recipe details");
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="md:flex items-start gap-12">

        <img src={recipe.image} alt={recipe.title} className="w-full h-[500px] object-cover rounded-md mb-4" />
        <div>
          <h1 className="text-4xl font-bold mb-8">{recipe.title}</h1>
      {recipe.summary && (
        <div className="mb-4">
          <h2 className="font-semibold text-2xl mb-3">Summary:</h2>
          <div className="text-lg" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
      )}
      <p className="text-2xl font-semibold mb-2">Preparation Time: {recipe.readyInMinutes} minutes</p>
   <p className="text-2xl font-semibold mb-3">Servings: {recipe.servings}</p>
      </div>
      </div>
      <h3 className="text-2xl font-semibold mb-3">Ingredients:</h3>
      <ul className="list-disc pl-5 text-lg">
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={ingredient.id + index} className="mb-1">{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetailsPageComponent;
