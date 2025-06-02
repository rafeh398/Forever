import React from 'react';
import { useShop } from "../../context/shopContext";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useShop();
  const location = useLocation();

  useEffect(() => {

    
  if(location.pathname === "/collection" ) {
    setShowSearch(false)}
    else{
      setShowSearch(false)
    }
  }, [location,setShowSearch])

  return showSearch  ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
          value={search} onChange={(e)=>setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="" className="w-4"/>
      </div>
      <img src={assets.cross_icon} alt="" className="inline w-3 cursor-pointer" onClick={()=>setShowSearch(false)}/>
    </div>
  ) : null;
}

export default SearchBar;
