import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { authUser, setAuthUser } = useAuthContext();
    const [fullName, setFullName] = useState(authUser?.fullName || '');
    const [profilePic, setProfilePic] = useState(authUser?.profilePic || '');
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans le localStorage
            const response = await axios.put('http://localhost:5000/api/users/profile', 
                { fullName, profilePic },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const updatedUser = response.data;
            console.log('Profil mis à jour:', updatedUser);
            setAuthUser(updatedUser); // Mettre à jour le contexte utilisateur

            // Afficher les notifications
            if (fullName !== authUser.fullName && profilePic !== authUser.profilePic) {
                toast.success("Nom complet et photo de profil ont été modifiés !");
            } else if (fullName !== authUser.fullName) {
                toast.success("Nom complet a été modifié !");
            } else if (profilePic !== authUser.profilePic) {
                toast.success("Photo de profil a été modifiée !");
            }

            onClose(); // Ferme le modal après la soumission
        } catch (error) {
            setErrorMessage('Erreur lors de la mise à jour du profil');
            console.error('Erreur:', error);
            toast.error("Une erreur est survenue lors de la mise à jour du profil.");
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div 
                className='p-5 rounded shadow-lg w-96 h-auto max-h-[80vh] overflow-auto' 
                style={{
                    background: 'linear-gradient(rgba(5, 5, 25, 1), rgba(0, 0, 0, 1))',
                }}
            >
                <h2 className='text-lg font-bold text-white'>Modifier le Profil</h2>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-white'>Nom Complet</label>
                        <input
                            type='text'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className='mt-1 block w-full border rounded-md p-2'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-white'>URL de la Photo de Profil</label>
                        <input
                            type='text'
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            className='mt-1 block w-full border rounded-md p-2'
                        />
                    </div>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                    <div className='flex justify-end'>
                        <button type='button' onClick={onClose} className='mr-2 btn btn-secondary'>
                            Annuler
                        </button>
                        <button type='submit' className='btn btn-primary'>
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;