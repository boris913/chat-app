import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import UserProfile from "../../components/sidebar-right/UserProfile";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{/* Barre latérale principale */}
			<Sidebar />

			{/* Conteneur des messages */}
			<MessageContainer />

			{/* Barre latérale droite contenant le profil utilisateur */}
			<div className='border-l border-slate-500 p-4 flex flex-col'>
				<UserProfile />
				{/* Vous pouvez ajouter d'autres composants ici, comme un chat ou des notifications */}
			</div>
		</div>
	);
};

export default Home;