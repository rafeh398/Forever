import React, { useEffect, useState } from 'react'
import { useShop } from "../context/shopContext"
import { assets } from "../assets/assets";
import Title from "../Components/common/Title";
import ProductItem from "../Components/common/ProductItem";


function Collection() {
  const { products,search,showSearch } = useShop();
  const [showFilter, setShowFilter] = useState(false)
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");


  const ToggleCategory = (e) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory(prev => prev.filter((item) => item !== value))

    } else {
      setCategory(prev => [...prev, value])
    }

  }
  const ToggleSubCategory = (e) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter((item) => item !== value))

    } else {
      setSubCategory(prev => [...prev, value])
    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search){
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setCollectionProducts(productsCopy)
  }
  const sortProduct = () => {
    let sortCopy = collectionProducts.slice();
   switch (sortType) {
    case "low-high":
      setCollectionProducts(sortCopy.sort((a,b)=>a.price-b.price))
      break;
      case "high-low":
        setCollectionProducts(sortCopy.sort((a,b)=>b.price-a.price))
        break;
   
    default:
   applyFilter();
      break;
   } 

  }





  useEffect(() => {
    applyFilter();
  }, [category,subCategory,search,showSearch,products])

  useEffect(()=>{
sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={() => setShowFilter(!showFilter)}>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
        </p>

        {/* Category filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} onChange={ToggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} onChange={ToggleCategory} />Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} onChange={ToggleCategory} />Kids
            </p>

          </div>

        </div>
        {/* SUb category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Topwear"} onChange={ToggleSubCategory} />Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bottomwear"} onChange={ToggleSubCategory} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Winterwear"} onChange={ToggleSubCategory} />Winterwear
            </p>

          </div>

        </div>

      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* {product sort} */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 ">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>

          </select>

        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {collectionProducts.map((item) => (<ProductItem key={item._id} id={item._id} image={item.image}
            name={item.name} price={item.price} />))}

        </div>

      </div>


    </div>
  )
}

export default Collection
