import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../../context/AuthContext";
import EditProfileModal from "./EditProfileModal"; // Assurez-vous que le chemin est correct
import { FaUserEdit } from "react-icons/fa"; // Importer une icône d'édition

const UserProfile = () => {
	const { authUser, setAuthUser } = useAuthContext(); // Utilisez setAuthUser pour mettre à jour l'état
	const [isModalOpen, setModalOpen] = useState(false);

	// Fonction pour mettre à jour l'utilisateur authentifié
	const updateAuthUser = useCallback((updatedUser) => {
		setAuthUser(updatedUser);
		localStorage.setItem("chat-user", JSON.stringify(updatedUser)); // Mettre à jour le localStorage
	}, [setAuthUser]);

	// Effet pour mettre à jour le statut en ligne
	useEffect(() => {
		const checkUserStatus = () => {
			const online = navigator.onLine; // Exemple simple
			if (authUser.isOnline !== online) { // Vérifiez si le statut a changé
				updateAuthUser({ ...authUser, isOnline: online });
			}
		};

		checkUserStatus(); // Vérifiez le statut initial
		const intervalId = setInterval(checkUserStatus, 5000); // Vérifiez le statut toutes les 5 secondes

		return () => clearInterval(intervalId); // Nettoyez l'intervalle lors du démontage
	}, [authUser, updateAuthUser]); // Ajoutez updateAuthUser ici

	return (
		<div className='flex flex-col items-center p-4 border-b hover:bg-transparent-100 transition duration-200 border border-slate-500'>
			{/* Avatar et statut */}
			<div className='relative mb-2 flex justify-center'>
				<img
					src={authUser.profilePic || 'default-avatar-url'}
					alt='User Avatar'
					className='w-12 h-12 rounded-full border-2 border-green-500'
				/>
				{authUser.isOnline && (
					<span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white blink'></span>
				)}
			</div>

			{/* Informations de l'utilisateur */}
			<div className='flex flex-col items-center mb-2'>
				<p className='font-bold text-lg text-center'>{authUser.fullName}</p>
				<p className={`text-sm ${authUser.isOnline ? 'text-green-500' : 'text-red-500'}`}>
					{authUser.isOnline ? 'En ligne' : 'Hors ligne'}
				</p>
			</div>
			
			{/* Bouton de modification */}
			<div className='flex justify-center'>
				<button
					className='flex items-center text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-200'
					onClick={() => setModalOpen(true)}
				>
					<FaUserEdit className='mr-2' />
					Modifier le Profil
				</button>
			</div>

			{/* Modal de modification */}
			<EditProfileModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				user={authUser}
			/>
		</div>
	);
};

export default UserProfile;