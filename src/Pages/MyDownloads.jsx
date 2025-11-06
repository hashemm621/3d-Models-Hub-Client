import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ModelCard } from '../Components/ModelCard';

const MyDownloads = () => {
    const {user} = useContext(AuthContext)
    const [models, setModels] = useState([])
   

     useEffect(() => {
  if (!user?.email) return; // user না থাকলে fetch না করবে
  fetch(`http://localhost:3000/my-downloads?email=${user.email}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => setModels(data))
    .catch(err => console.error(err));
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

export default MyDownloads;