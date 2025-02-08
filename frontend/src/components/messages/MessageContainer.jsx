import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Importer Toastify
import "react-toastify/dist/ReactToastify.css"; // Importer le style de Toastify
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { FaLock } from "react-icons/fa"; // Utiliser une icône de cadenas
import { useSocketContext } from "../../context/SocketContext"; // Importer le contexte Socket

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext(); // Récupérer les utilisateurs en ligne

	useEffect(() => {
		// Fonction de nettoyage pour réinitialiser la conversation sélectionnée lors du démontage
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* En-tête avec carte de sécurité */}
					<div className='bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between rounded-lg shadow-md'>
						<div className='flex items-center'>
						<div className={`relative avatar ${onlineUsers.includes(selectedConversation._id) ? "online" : ""}`}>
						<div className={`w-10 h-10 rounded-full overflow-hidden ${onlineUsers.includes(selectedConversation._id) ? 'border-2 border-green-500' : 'border-2 border-white'} shadow-md`}>
								<img 
									src={selectedConversation.profilePic} 
									alt='User Avatar' 
									className='w-full h-full object-cover ' 
								/>
								
							</div>
							</div>
							<div className='ml-3'>
								{/* <span className='label-text text-sm text-gray-300'>À :</span> */}
								{/* Nom de l'utilisateur */}
								<span className='text-gray-100 font-bold text-lg block'>
									{selectedConversation.fullName}
								</span>
								{/* Indicateur en ligne ou hors ligne */}
								{onlineUsers.includes(selectedConversation._id) ? (
									<span className="text-xs text-green-500">En ligne</span>
								) : (
									<span className="text-xs text-red-500">Hors ligne</span>
								)}
							</div>
						</div>
						<SecurityCard />
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
			{/* Conteneur Toastify */}
			<ToastContainer />
		</div>
	);
};

// Carte de sécurité pour le chiffrement
const SecurityCard = () => {
	const showToast = () => {
		toast.success("🔒 Chiffrement RSA Activé", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false, // Afficher la barre d'écoulement
			closeOnClick: true,
			draggable: true,
			progress: undefined, // Utiliser la barre d'écoulement par défaut
		});
	};

	return (
		<div className='relative flex items-center'>
			{/* Icône de cadenas qui est cliquable */}
			<FaLock 
				className='text-green-400 text-lg cursor-pointer' 
				onClick={showToast} 
			/>
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Bienvenue 👋 {authUser.fullName} ❄</p>
				<p>Sélectionnez une conversation<br /> pour commencer à discuter</p>
				<TiMessages className='text-3xl md:text-6xl' />
			</div>
		</div>
	);
};

export default MessageContainer;