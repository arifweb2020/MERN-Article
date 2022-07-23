import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreateArticle(props) {
    const [title, setTitle] = React.useState("");
    const [article, setArticle] = React.useState("");
    const [authorname, setAuthorName] = React.useState("");
    const [fileName,setFileName]= React.useState("");

    const history = useHistory()

    const onChangeFile = (e)=>{
        setFileName(e.target.files[0])
    }

    const formSubmission = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title",title);
        formData.append("article",article);
        formData.append("authorname",authorname);
        formData.append("articleImage",fileName);

       
        axios.post('/articles/add', formData)
            .then(res => res.data && history.push("/"))


    }

    /** without image api call */
    // const formSubmission = (e) => {
    //     e.preventDefault();

    //     const data = {
    //         title,
    //         article,
    //         authorname
    //     }
    //     axios.post('/articles/add', data)
    //         .then(res => res.data && history.push("/"))


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
                        <form onSubmit={formSubmission} encType="multipart/form-data">
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='enter title' required />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    rows="7"
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setArticle(e.target.value)}
                                    placeholder='enter article' required></textarea>
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder='enter author' required />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="file"
                                    fileName="articleImage"
                                    onChange={onChangeFile}
                                    required />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-md btn-primary'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateArticle;