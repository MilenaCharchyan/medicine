import React from 'react';
import './App.scss';
import { useGetCompanyQuery } from './features/company/companyAPI';
import { RouterProvider } from 'react-router-dom';
import { router } from './component/MyRouter';

function App() {
  // const { data, error, isLoading } = useGetCompanyQuery('')
  // console.log(data, isLoading);
  // if(isLoading){
  //   return(
  //     <h1>loading ...</h1>
  //   )
  // }
  
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;