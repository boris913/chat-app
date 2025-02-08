import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		const user = JSON.parse(localStorage.getItem("chat-user")) || null;
		// Assurez-vous que l'utilisateur est marqué comme en ligne s'il est connecté
		if (user) {
			return { ...user, isOnline: true }; // Ajoutez isOnline ici
		}
		return null;
	});

	// Optionnel : Mettez à jour l'état de l'utilisateur en fonction de la connexion/déconnexion
	useEffect(() => {
		const handleOnline = () => {
			if (authUser) {
				setAuthUser((prev) => ({ ...prev, isOnline: true }));
			}
		};

		const handleOffline = () => {
			if (authUser) {
				setAuthUser((prev) => ({ ...prev, isOnline: false }));
			}
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, [authUser]);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};