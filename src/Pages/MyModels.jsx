import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModelCard } from "../Components/ModelCard";

const MyModels = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);

  console.log(models);

  useEffect(() => {
    fetch(
      `https://3d-model-server-orcin.vercel.app/my-models?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        setModels(data);
      });
  }, [user?.email, user?.accessToken]);
  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map(model => (
          <ModelCard
            key={model._id}
            model={model}
          />
        ))}
      </div>
    </div>
  );
};

export default MyModels;
