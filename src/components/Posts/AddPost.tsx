    import React from 'react'
    import { AppUseDispatch, AppUseSelector } from '../Redux/ReduxHooks';


    import SinlgePost from '../features/SinlgePost';

    // importing the specific function 
    import { addNewPost } from '../features/PostFeatures';


    export default function AddPost() {


        const [title, setTitle] = React.useState('');
        const [content, setContent] = React.useState('');
        const [user, setUser] = React.useState<number | undefined>(undefined);
        const [_requestStatus, setRequestStatus] = React.useState<string>('idle');


        const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
        };

        const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
        };

        const handleAutherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setUser(Number(event.target.value));
        };

        const AllUserS = AppUseSelector( (state)=>state.userReducerStore );


        const AppDispatch = AppUseDispatch();       
        

        const postSubmitForm = ()=>{
        try{
                setRequestStatus('pending');
                AppDispatch( addNewPost({title,body:content,userId:Number(user)}) )
                setTitle('');
                setContent('');
                setUser(undefined);
        }catch(err){
                console.error("failed to log")
        }finally{
                setRequestStatus('idle');
        }
        }
        
    

        return (
            <div>
                    <input type="text" value={title} onChange={handleTitleChange} />
                    <select value={user} onChange={handleAutherChange}  >
                        <option value={1}></option>
                        { AllUserS.map( item => <option key={item.id} value={item.id}>{item.name}</option> ) }
                    </select>
                    <input type="text" value={content} onChange={handleContentChange} />
                    <button onClick={postSubmitForm} type="submit">Submit</button>


            </div>
        );
    }