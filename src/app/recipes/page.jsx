"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const maxTime = searchParams.get('maxTime') || '';
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;

        if (query) url += `&query=${encodeURIComponent(query)}`;
        if (cuisine) url += `&cuisine=${encodeURIComponent(cuisine)}`;
        if (maxTime) url += `&maxReadyTime=${encodeURIComponent(maxTime)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, cuisine, maxTime]);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[350px] object-cover"
          />
          <h3 className="text-2xl font-bold py-6 px-5 text-center">{recipe.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default RecipesPage;
