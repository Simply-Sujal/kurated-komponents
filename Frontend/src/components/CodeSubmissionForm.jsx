import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

const CodeSubmissionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        category: '',
        codeImage: null,
    });

    const { storingTokenInLS } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('code', formData.code);
        data.append('category', formData.category);
        data.append('codeImage', formData.codeImage);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/v1/code/codesubmission', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                storingTokenInLS(result.token);

                setFormData({
                    title: '',
                    code: '',
                    category: '',
                    codeImage: null,
                });

                navigate('/');
            } else {
                const errorResult = await response.json();
                console.error('Error:', errorResult.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-[110px] md:pt-[135px]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm md:shadow-lg w-full max-w-[650px]">
                <h2 className="text-4xl font-roboto font-extrabold mb-3">Submit Your Code</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-roboto font-bold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title for your code"
                        className="mt-1 p-2 w-full border rounded font-roboto font-semibold bg-[#f7fbff] placeholder-opacity-75 md:placeholder-opacity-50 placeholder-gray-800 placeholder:font-bold"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-roboto font-bold">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category for your code"
                        className="mt-1 p-2 w-full border rounded font-roboto font-semibold bg-[#f7fbff] placeholder-opacity-75 md:placeholder-opacity-50 placeholder-gray-800 placeholder:font-bold"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code_editor">
                        Code
                    </label>
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        value={formData.code}
                        onChange={(code) => setFormData({ ...formData, code })}
                        name="code_editor"
                        editorProps={{ $blockScrolling: true }}
                        placeholder="Write your code here..."
                        width="100%"
                        height="400px"
                        className="border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-roboto font-bold">Code Image (WebP format, max 128kb)</label>
                    <input
                        type="file"
                        name="codeImage"
                        accept=".webp"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded font-roboto font-semibold bg-[#f7fbff] placeholder-opacity-75 md:placeholder-opacity-50 placeholder-gray-800 placeholder:font-bold"
                    />
                </div>
                <button type="submit" className="inline-flex items-center justify-center px-5 py-3 text-[18px] font-roboto font-bold tracking-wide leading-6 text-white whitespace-no-wrap bg-orange-600 border border-orange-700 rounded-lg shadow-sm hover:bg-orange-700 focus:outline-none transition-all duration-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CodeSubmissionForm;
