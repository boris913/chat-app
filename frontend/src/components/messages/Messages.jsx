import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const EncryptionInfoCard = () => {
	return (
		<div className="bg-slate-700 text-white p-4 rounded-lg shadow-md mb-4 max-w-[300px] mx-auto"> {/* Ajout de max-w et mx-auto */}
			<p className="text-xs text-center">
				⚠️ Vos messages sont chiffrés de bout en bout. Personne ne peut les lire, sauf vous et le destinataire.
			</p>
		</div>
	);
};

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	// Fonction pour formater la date
	const formatDate = (date) => {
		const today = new Date();
		const messageDate = new Date(date);
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		if (messageDate.toDateString() === today.toDateString()) {
			return "Aujourd'hui";
		} else if (messageDate.toDateString() === yesterday.toDateString()) {
			return "Hier";
		} else {
			return messageDate.toLocaleDateString('fr-FR', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		}
	};

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{/* Carte d'information sur le chiffrement */}
			<EncryptionInfoCard />

			{!loading && messages.length > 0 && messages.map((message, index) => {
				const messageDate = new Date(message.createdAt).toDateString();
				const showDate = index === 0 || messageDate !== new Date(messages[index - 1].createdAt).toDateString();

				return (
					<div key={message._id} ref={lastMessageRef}>
						{showDate && (
							<div className="text-center text-gray-300 mb-2 text-sm">
								{formatDate(message.createdAt)}
							</div>
						)}
						<Message message={message} />
					</div>
				);
			})}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Envoyez un message pour commencer la conversation</p>
			)}
		</div>
	);
};

export default Messages;
// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
