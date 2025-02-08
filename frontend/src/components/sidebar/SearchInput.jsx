import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Le terme de recherche doit comporter au moins 3 caractères");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("Aucun utilisateur trouvé !");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 p-1 bg-slate-500 rounded-full shadow-sm transition duration-200'>
			<input
				type='text'
				placeholder='Recherche…'
				className='border border-gray-300 w-48 rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-slate-200 transition duration-150'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='bg-sky-500 text-white rounded-full p-1 transition duration-150 hover:bg-sky-600'>
				<IoSearchSharp className='w-5 h-5' />
			</button>
		</form>
	);
};

export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
