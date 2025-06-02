import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostAPI"
import "../App.css"
import Form from "./Form";

function Post() {

  const [data, setData] = useState([])
  const [updateDataApi,setUpdateDataApi]=useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const[search,setSearch]=useState("");


  async function fetchData() {
    try {
      const response = await getPost()



      setData(response.data)



    } catch (error) {
      setError("Something went wrong");
    }
    finally {
      setLoading(false)
    }

  }

  async function onHandleDelete(id) {
    try {
      const response = await deletePost(id)

      if (response.status === 200) {
        const updatedData = data.filter((item) => (item.id !== id))
        setData(updatedData)
      
        

      }







    } catch (error) {
      setError("Something went wrong");
    }
    

  }

  useEffect(() => {

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const onHandleUpdate=(curElem)=>(
    setUpdateDataApi(curElem)

  )
  
//handle search

const handleSearch=(e)=>(setSearch(e.target.value))
//filter
const filteredData=data.filter((post)=>post.title.toLowerCase().includes(search.toLowerCase())||post.body.toLowerCase().includes(search.toLowerCase()) )

  return (
    <>
    <section className="section-form">
      <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
    </section>
    <section>
      <input type="text" placeholder="search..." value={search} onChange={handleSearch} className="search" />
    </section>

      <section className="section-post">
        <ol>
          {filteredData.length===0 ? (<li>
            No posts found
          </li>):(
          filteredData.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button
                onClick={()=>onHandleUpdate(curElem)}
                >
                  Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => onHandleDelete(id)}

                >
                  Delete
                </button>
              </li>
            );
          }))}
        </ol>
      </section>
    </>
  );
}

export default Post
