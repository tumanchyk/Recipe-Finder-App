import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const RecipeDetails = dynamic(() => import("../../../components/RecipeDetails"), {
  suspense: true,
});

export default function RecipeDetailsPage() {
  return (
    <Suspense fallback={<div>Loading recipe details...</div>}>
      <RecipeDetails />
    </Suspense>
  );
}
