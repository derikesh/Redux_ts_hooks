import React, { InputHTMLAttributes, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppUseSelector, AppUseDispatch } from '../Redux/ReduxHooks';
import { selectPostById } from './PostFeatures';
import { updatePost , deletePost} from './PostFeatures';
export default function EditPost() {

    const {singlePostId} = useParams();

    const navigate = useNavigate();
    const EditDispatch = AppUseDispatch();

    const users = AppUseSelector( (state)=> state.userReducerStore );
    const SelectedEDIT = AppUseSelector( (state)=> selectPostById(state,Number(singlePostId)) );


    const [title, setTitle] = useState(SelectedEDIT.title);
    const [userId, setUserId] = useState<number | undefined>(SelectedEDIT.userId);
    const [content, setContent] = useState(SelectedEDIT.body);
    const [_requestStatus, setRequestStatus] = useState('idle');
        

    const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>)=>setTitle( e.target.value );

    const onAuthorChanged = (e:React.ChangeEvent<HTMLSelectElement>)=> setUserId(Number(e.target.value));

    const onContentChanged = (e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const onUpateChange = ()=>{        
        try {
            EditDispatch( updatePost( {id:Number(singlePostId),title,body:content,userId:Number(userId),reactions:SelectedEDIT.reactions} ) );
            setTitle('');
            setUserId(undefined);
            setContent(''); 
            navigate(`/post/${singlePostId}`)
        }catch(err){
            throw new Error("some error occured during the process")
        }

    }


    const handelDelete = ()=>{
            try {
                EditDispatch( deletePost( {id:Number(SelectedEDIT.id)} ) );
                setTitle('')
            setContent('')
            setUserId(undefined)
            navigate('/')
            }catch(err){
                throw new Error("item has been deleted")
            }finally {
                setRequestStatus('idle')
            }
    }


return (
    <section>
        <h2 style={{ marginBottom: '1rem' }}>Edit Post</h2>
        <form style={{display:'flex',flexDirection:'column',gap:20}} >
            <label htmlFor="postTitle" style={{ marginBottom: '0.5rem' }}>Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
                style={{ marginBottom: '1rem', padding: '0.5rem' }}
            />
            <label htmlFor="postAuthor" style={{ marginBottom: '0.5rem' }}>Author:</label>
            <select
                id="postAuthor"
                value={userId}
                onChange={onAuthorChanged}
                style={{ marginBottom: '1rem', padding: '0.5rem' }}
            >
                <option value=""></option>
                {users.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <label htmlFor="postContent" style={{ marginBottom: '0.5rem' }}>Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                style={{ marginBottom: '1rem', padding: '0.5rem', minHeight: '10rem' }}
            />
            <div>
            <button
                type="button"
                onClick={onUpateChange}
                style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
            >
                Save Post
            </button>
            <button
                className="deleteButton"
                type="button"
                onClick={handelDelete}
                style={{ padding: '0.5rem 1rem' }}
            >
                Delete Post
            </button>
            </div>
        </form>
    </section>
);
}
