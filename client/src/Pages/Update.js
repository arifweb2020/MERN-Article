import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Update(props) {
    const [data, setData] = React.useState({})
    const [title, setTitle] = React.useState(data.title);
    const [article, setArticle] = React.useState(data.article);
    const [authorname, setAuthorName] = React.useState(data.authorname);
    const [fileName, setFileName] = React.useState(data.articleImage);
    const { id } = useParams();
    const PF = "http://localhost:5000/images/";

    const onChangeFile = (e) => {
        setFileName(e.target.files[0])
    }

    React.useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/articles/${id}`);
            setData(res.data);
            setTitle(res.data.title)
            setArticle(res.data.article)
            setAuthorName(res.data.authorname)
            setFileName(res.data.articleImage)
        };
        getPost();
    }, [id])

    const updateSubmission = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("articleImage", fileName);
        formData.append("title", title);
        formData.append("article", article);
        formData.append("authorname", authorname);
        

        axios.put(`/articles/update/${id}`, formData)
            .then(res => console.log(res.data))
        //.then(res => res.data && history.push("/"))
    }

    /** without image updation */
    // const updateSubmission = (e) => {

    //     e.preventDefault();

    //     const data = {
    //         title,
    //         article,
    //         authorname
    //     }
    //     axios.put(`/articles/update/${id}`, data)
    //         .then(res => console.log(res.data))
    //     //.then(res => res.data && history.push("/"))
    // }

    return (
        <>
            <div className="container-fluid p-5 bg-primary text-white text-center">
                <h1>Add your Article</h1>
                <p>you will always get lastest tech news!</p>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <form onSubmit={updateSubmission} encType="multipart/form-data">
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    rows="7"
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setArticle(e.target.value)}
                                    value={article}
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    value={authorname} />
                            </div>
                            <div className='mb-3'>
                                {/* <img src={PF + fileName} alt="sdsa" style={{ width: "100px", height: "100px" }} />
                                */}
                                <input
                                    type="file"
                                   // fileName="articleImage"
                                    onChange={onChangeFile}
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-md btn-primary'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Update;