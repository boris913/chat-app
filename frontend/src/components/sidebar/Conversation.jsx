import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-slate-700 rounded-lg p-2 transition duration-200 cursor-pointer
				${isSelected ? "bg-slate-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`relative avatar ${isOnline ? "online" : ""}`}>
				<div className={`w-12 h-12 rounded-full overflow-hidden ${isOnline ? 'border-2 border-green-500' : 'border-2 border-white'} shadow-md`}>
						<img src={conversation.profilePic} alt='user avatar' className='w-full h-full object-cover' />
					</div>
					{/* {isOnline && (
						<span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white' />
					)} */}
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between items-center rounded-lg p-2 transition duration-200'>
						<p className='font-bold text-white'>{conversation.fullName}</p> {/* Nom en blanc */}
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-1' />}
		</>
	);
};

export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
