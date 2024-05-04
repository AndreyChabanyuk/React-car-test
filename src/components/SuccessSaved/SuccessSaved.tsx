import './style.scss'
import React from 'react';


interface SuccessSavedProps {
  nextItem: () => void;
  hidden: boolean;
}


const SuccessSaved:React.FC<SuccessSavedProps> = ({nextItem,hidden}) => {
    


    return(
        <div className={`success ${hidden ? 'none' : ''}`}>
            Данные успешно сохранены!
            <button onClick={()=>{
                nextItem()
            }}className='success-btn'>
                Продолжить
            </button>
        </div>
    )
}


export default SuccessSaved