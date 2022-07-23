import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Home(props) {
    const [articel, setArticle] = useState([])
    const history = useHistory();
    const PF = "http://localhost:5000/images/";

    useEffect(() => {

        const fetchPosts = async () => {
            const res = await axios.get("/articles");
            setArticle(res.data.reverse())
        };
        fetchPosts();

    }, [])

    // delete fn

    const deleFn = (del) => {
        const res = axios.delete(`/articles/${del}`);
        res.then(res => alert(res.data))
        const newData = articel.filter((ele) => ele._id !== del)
        setArticle(newData)
    }

    return (
        <>
            <div className="container-fluid p-5 bg-primary text-white text-center">
                <h1>Welcome 2 my blog</h1>
                <p>you will always get lastest tech news!</p>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {
                            articel.map((ele) => {
                                return <div key={ele._id} className="card mt-4 mb-5 p-3">
                                    <img src={PF + ele.articleImage} className="img-fluid" alt="article" style={{ height: "300px" }} />
                                    <h2>{ele.title}</h2>
                                    <p>{ele.article}</p>
                                    <h6>{ele.authorname}</h6>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <button className='btn btn-md btn-info' onClick={() => history.push(`/update/${ele._id}`)}>Update</button>
                                        <button className='btn btn-md btn-danger' onClick={() => deleFn(ele._id)}>Delete</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;