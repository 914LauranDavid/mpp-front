import { useState } from "react";
import { useParams } from "react-router-dom";

function CatDetails({
  allCats,
  setAllCats,
}: {
  allCats: any[];
  setAllCats: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const params = useParams<{ id: string }>();
  const id = params.id;
  if (!id) {
    return <h1>bad</h1>;
  }
  const cat = allCats.find((cat) => cat.id === parseInt(id));

  return (
    <div>
      <h1>Cat details</h1>
      <h2>{cat.name}</h2>
    </div>
  );
}

export default CatDetails;
