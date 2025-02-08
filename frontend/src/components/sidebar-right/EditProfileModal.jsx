import{ useState } from "react";

const EditProfileModal = ({ isOpen, onClose, user }) => {
	const [fullName, setFullName] = useState(user.fullName);
	const [profilePic, setProfilePic] = useState(user.profilePic);

	if (!isOpen) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logique pour mettre à jour le profil (appel API, etc.)
		console.log("Profil mis à jour:", { fullName, profilePic });
		onClose(); // Ferme le modal après la soumission
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