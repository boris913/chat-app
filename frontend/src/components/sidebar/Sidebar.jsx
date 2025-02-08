import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col h-full'>
			{/* Titre ou Logo */}
			<div className='text-2xl font-bold mb-4 text-center text-blue-600'>
				ChatApp
			</div>

			{/* Champ de recherche */}
			<SearchInput />
			<div className='divider my-4 px-3 border-b border-slate-300'></div> {/* Amélioration de la division */}

			{/* Conversations */}
			<Conversations />
			

			{/* Bouton de déconnexion */}
			<LogoutButton />
		</div>
	);
};

export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
