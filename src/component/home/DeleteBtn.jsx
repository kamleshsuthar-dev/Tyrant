import React, { useState } from 'react';
import { Trash2, X, Check, Loader } from 'lucide-react';

const DeleteIconButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDelete = () => {

    setIsDeleting(true);
   
    setTimeout(() => {
      setIsDeleting(false);
     
    }, 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`
          relative
          p-2
          rounded-full
          transition-all
          duration-300
          flex
          items-center
       
          ${isDeleting ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        {!isDeleting &&  (
          <Trash2 
            className="w-5 h-5 text-white"
          />
        )}
           
        {isDeleting && (
          <Loader 
            className="w-5 h-5 text-[#FFFFFF] animate-spin"
          />
        )}
      </button>
    </div>
  );
};

export default DeleteIconButton;

// import React, { useState } from 'react';
// import { Trash2, X, Check, Loader } from 'lucide-react';

// const DeleteIconButton = () => {
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);

//   const handleDelete = () => {
//     if (!isConfirming) {
//       setIsConfirming(true);
//       return;
//     }

//     setIsDeleting(true);
//     // Simulating deletion process
//     setTimeout(() => {
//       setIsDeleting(false);
//       setIsConfirming(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={handleDelete}
//         disabled={isDeleting}
//         className={`
//           relative
//           p-2
//           rounded-full
//           transition-all
//           duration-300
//           flex
//           items-center
//           justify-center
//           ${isConfirming 
//             ? 'bg-red-100 hover:bg-red-200' 
//             : 'bg-gray-100 hover:bg-gray-200'
//           }
//           ${isDeleting ? 'cursor-not-allowed opacity-50' : ''}
//         `}
//       >
//         {!isDeleting && !isConfirming && (
//           <Trash2 
//             className="w-5 h-5 text-gray-600"
//           />
//         )}
        
//         {isConfirming && !isDeleting && (
//           <Check 
//             className="w-5 h-5 text-red-600 animate-in"
//           />
//         )}
        
//         {isDeleting && (
//           <Loader 
//             className="w-5 h-5 text-gray-600 animate-spin"
//           />
//         )}
//       </button>

//       {isConfirming && !isDeleting && (
//         <button
//           onClick={() => setIsConfirming(false)}
//           className="
//             p-2
//             rounded-full
//             bg-gray-100
//             hover:bg-gray-200
//             transition-all
//             duration-300
//           "
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default DeleteIconButton;